import type {Grid, Options, Row} from './types';

type Command = {onInitialized: Promise<void>; manager: {gridInstance: Grid}; tryToGetSource(name: string): {rows: Row[]}};
type Wrapper = {
  addFragment(element: HTMLElement): Wrapper;
  setOptions(options: unknown): Wrapper;
  run(): Wrapper;
  setSource(name: string, rows: Row[]): void;
  GetComponentList(): Command[];
  basiscore: {content: {initializeTask: Promise<void>; disposeAsync(): Promise<void>}};
};
declare global {
  interface Window {
    $bc: {new: () => Wrapper; all: Wrapper[]};
    [key: `studioOptions${number}`]: Options | undefined;
    [key: `studioRendered${number}`]: (() => void) | undefined;
  }
}
let sequence = 0;

export async function mountGrid(container: HTMLElement, options: Options, rows: Row[]) {
  const name = `studioOptions${++sequence}` as const;
  const renderedName = `studioRendered${sequence}` as const;
  const rendered = new Promise<void>(resolve => {window[renderedName] = resolve;});
  window[name] = options;
  const command = document.createElement('basis');
  command.setAttribute('core', 'component.grid.grid');
  command.setAttribute('run', 'atclient');
  command.setAttribute('datamembername', 'studio.rows');
  command.setAttribute('options', name);
  command.setAttribute('onrendered', renderedName);
  container.replaceChildren(command);
  const wrapper = window.$bc.new().addFragment(container).setOptions({
    repositories: {'grid.grid': '/basiscore-grid/basiscore.grid.js'},
    sources: {'studio.rows': rows},
  }).run();
  await wrapper.basiscore.content.initializeTask;
  const components = wrapper.GetComponentList();
  await Promise.all(components.map(component => component.onInitialized));
  await rendered;
  const component = components.find(component => component.manager?.gridInstance);
  if (!component) throw new Error('BasisCore grid component did not initialize');
  const grid = component.manager.gridInstance;
  if (!grid) throw new Error('BasisCore did not create a Grid instance');
  container.dataset.engine = 'basiscore-component';
  return {
    grid,
    rows: component.tryToGetSource('studio.rows').rows,
    setSource: (data: Row[]) => wrapper.setSource('studio.rows', data),
    dispose: async () => {
      await wrapper.basiscore.content.disposeAsync();
      const index = window.$bc.all.indexOf(wrapper);
      if (index >= 0) window.$bc.all.splice(index, 1);
      delete window[name];
      delete window[renderedName];
    },
  };
}
