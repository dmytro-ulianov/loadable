import {ComponentType, lazy, LazyExoticComponent} from 'react'

type Component = ComponentType<any>
type DefaultExport<T> = {default: T}
type Load<P> = () => Promise<P>
type Loadable<T extends Component> = LazyExoticComponent<T> & Preload
type Preload = {preload: () => void}
type Resolve<P, T> = (value: P) => T

export function loadable<T extends Component, P extends DefaultExport<T>>(
  load: Load<P>,
): Loadable<T>

export function loadable<T extends Component, P>(
  load: Load<P>,
  resolve?: Resolve<P, T>,
): LazyExoticComponent<T> & Preload

export function loadable<T extends Component, P extends DefaultExport<T>>(
  load: Load<P>,
  resolve?: Resolve<P, T>,
) {
  const loadComponent = () => {
    return load().then(x => ({default: resolve ? resolve(x) : x.default}))
  }
  const Component = lazy(loadComponent)
  return Object.assign(Component, {preload: load})
}

/*
 * ___ package.json ___
 * - Define react version the right way
 * - Husky & Lint Staged
 * - NPM
 * */
