# @featherweight/loadable

Loadable is a thin wrapper around `React.lazy` function, that comes with a few handy benefits such as preloading and named exports support.

## Install
`npm install --save @featherweight/loadable`

## Examples

Loadable can work with named exports using second argument, while `React.lazy` only works with default export.

```ts
// image.tsx
export const Image: React.FC<ImageProps> = props => ...
export default Image
// ---------

import {loadable} from '@featherweight/loadable'

// if you wanna default
const Image = loadable(() => import('./image'))

// if you wanna named
const Image = loadable(() => import('./image'), x => x.Image)

```

And the second handy feature is ability to preload component.

```ts
const App = () => {
  const [images, setImages] = useState(null)

  useEffect(() => {
    Image.preload()
  }, [])

  return (
    <div>
      <button onClick={fetchImages}>load images</button>
      {images && images.map((img) => (
        <Image src={img.src} ... />
      ))}
    </div>
  )
}
```
