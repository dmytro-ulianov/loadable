import {lazy, ComponentType, LazyExoticComponent} from 'react'

/***
 * Invokes load function to preload the component
 */
type Preload = {preload: () => void}
type Component = ComponentType<any>
type DefaultExport<T> = {default: T}
type LoadFunction<P> = () => Promise<P>
type ResolveFunction<P, T> = (value: P) => T
type Loadable<T extends Component> = LazyExoticComponent<T> & Preload

export function loadable<T extends Component, P extends DefaultExport<T>>(
  load: LoadFunction<P>,
): Loadable<T>

export function loadable<T extends Component, P>(
  load: LoadFunction<P>,
  resolve?: ResolveFunction<P, T>,
): LazyExoticComponent<T> & Preload

export function loadable<T extends Component, P extends DefaultExport<T>>(
  load: LoadFunction<P>,
  resolve?: ResolveFunction<P, T>,
) {
  const finalLoad = resolve
    ? () => load().then(x => ({default: resolve(x)})) as Promise<P>
    : load
  const Component = lazy(finalLoad)
  return Object.assign(Component, {preload: load})
}
