import './index.css';
import {datasetSchema, originalDatasets, migrateSampleGuide, type Dataset, type ViewMode, type Density} from './datasets';
import {icon, type IconName} from './icons';
import {escapeHTML as esc, formatValue} from './format';
import {mountGrid} from './basis';
import {englishGridLabels} from './grid-labels';
import type {GridState, Options, Row} from './types';
import {version} from '../../../package.json';

// Keep the Core candidate and archived tutorial data untouched when editing this edition.
const storageKey = 'basiscore-grid-template4-guide-datasets-v1';
const previousStorageKey = 'material-list-studio-datasets';
function loadDatasets(): Dataset[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? localStorage.getItem(previousStorageKey) ?? '[]');
    const custom = Array.isArray(saved) ? saved.flatMap(item => {
      const parsed = datasetSchema.safeParse(item);
      return parsed.success ? [migrateSampleGuide(parsed.data)] : [];
    }) : [];
    return [...originalDatasets.map(base => custom.find(item => item.id === base.id) ?? structuredClone(base)), ...custom.filter(item => !originalDatasets.some(base => base.id === item.id))];
  } catch { return structuredClone(originalDatasets); }
}
const state = {
  datasets: loadDatasets(), activeId:'flight-routes', view:'table' as ViewMode, density:'comfortable' as Density,
  theme:'light', search:true, pagination:true, selection:true, selectionMode:'multi' as 'single'|'multi', rowActions:true, pageSize:8,
  workspace:'preview', comparison:false, showDatasets:false, showColumns:false, editor:'',
  editorMessage:null as {type:'success'|'error'; text:string} | null,
};
const root = document.getElementById('root')!;
let mounts: Awaited<ReturnType<typeof mountGrid>>[] = [];
let revision = 0;
let pending = Promise.resolve();
let snapshot: {id:string; state:GridState} | undefined;
let storageFailed = false;
const active = () => state.datasets.find(dataset => dataset.id === state.activeId) ?? state.datasets[0];
const action = (name: string, text: string, glyph?: IconName, variant = 'outlined') => `<button type="button" class="button button-${variant}" data-action="${name}">${glyph ? icon(glyph,17) : ''}${text}</button>`;
const tool = (name: string, label: string, glyph: IconName) => `<button type="button" class="icon-button" data-action="${name}" aria-label="${label}" title="${label}">${icon(glyph)}</button>`;

function persist() {
  try { localStorage.setItem(storageKey, JSON.stringify(state.datasets)); storageFailed = false; }
  catch { storageFailed = true; }
}
function activate(id: string) {
  state.activeId = id;
  const dataset = active();
  state.view = dataset.view?.default ?? 'table';
  state.density = dataset.view?.density ?? 'comfortable';
  state.pageSize = dataset.view?.pageSize ?? 8;
  state.search = dataset.features?.search !== false;
  state.pagination = dataset.features?.pagination !== false;
  state.selection = dataset.features?.selection !== false;
  state.selectionMode = 'multi';
  state.editor = JSON.stringify(dataset,null,2);
  state.editorMessage = null;
  state.showDatasets = false;
  snapshot = undefined;
}
activate(state.activeId);

const templates: {title:string; text:string; view:ViewMode; icon:IconName; count:string; density?:Density; selection?:'single'|'multi'}[] = [
  {title:'جدول استاندارد',text:'برای داده‌های عملیاتی با جزئیات کامل',view:'table',icon:'Table2',count:'۷ ویژگی',selection:'multi'},
  {title:'جدول انتخاب تکی',text:'انتخاب یک ردیف با رادیوباتن',view:'table',icon:'CircleDot',count:'انتخاب رادیویی',density:'comfortable',selection:'single'},
  {title:'نسخه موبایل',text:'همان جدول با چیدمان مناسب موبایل',view:'mobile',icon:'Smartphone',count:'نمای موبایل'},
  {title:'شبکه کارت‌ها',text:'نمایش بصری و منعطف داده‌ها',view:'grid',icon:'Grid2X2',count:'واکنش‌گرا'},
  {title:'فهرست ساختاریافته',text:'برای مرور سریع آیتم‌ها',view:'list',icon:'LayoutList',count:'ساده و سریع'},
  {title:'جدول انتخابی',text:'مدیریت چندتایی و عملیات گروهی',view:'table',icon:'CheckCircle2',count:'انتخاب چندتایی',selection:'multi'},
];
const templateSelected = (item: typeof templates[number]) => state.view === item.view && (!item.selection || state.selection && state.selectionMode === item.selection);
function gallery() {
  return `<section class="gallery-section"><div class="section-heading"><div><span class="eyebrow">کتابخانه الگوها</span><h2>از یک الگو شروع کنید</h2></div><span class="muted-label">۶ الگوی قابل استفاده مجدد</span></div><div class="gallery-grid">${templates.map((item,index) => `<button type="button" class="template-card ${templateSelected(item) ? 'template-active' : ''}" aria-pressed="${templateSelected(item)}" data-action="template" data-index="${index}"><div class="template-preview"><div class="mini-header">${icon(item.icon)}<span>${index === 0 || index === 1 ? 'مسیرهای پروازی' : index === 3 ? 'محصولات منتخب' : 'اعضای تیم'}</span>${icon('MoreVertical',15)}</div>${item.view === 'mobile' ? '<div class="mini-mobile"><i></i><i></i><i></i></div>' : item.view === 'grid' ? '<div class="mini-cards"><i></i><i></i><i></i></div>' : '<div class="mini-lines"><i></i><i></i><i></i><i></i></div>'}</div><div class="template-copy"><div><strong>${item.title}</strong><span>${item.text}</span></div><span class="template-count">${item.count}</span></div><span class="open-template">باز کردن پیش‌نمایش ${icon('ChevronLeft',15)}</span></button>`).join('')}</div></section>`;
}
function datasetBar() {
  const dataset = active();
  return `<div class="dataset-bar"><div class="dataset-select"><span class="field-label">داده فعال</span><button type="button" class="dataset-trigger" data-action="datasets" aria-expanded="${state.showDatasets}"><span class="dataset-avatar">${esc(dataset.title.slice(0,1))}</span><span><strong>${esc(dataset.title)}</strong><small>${dataset.rows.length} ردیف داده</small></span>${icon('ChevronDown')}</button>${state.showDatasets ? `<div class="dataset-menu">${state.datasets.map(item => `<button type="button" data-action="activate" data-id="${esc(item.id)}" class="${item.id === dataset.id ? 'current' : ''}"><span class="dataset-avatar">${esc(item.title.slice(0,1))}</span><span>${esc(item.title)}<small>${item.rows.length} ردیف</small></span>${item.id === dataset.id ? icon('Check',17) : ''}</button>`).join('')}<div class="menu-divider"></div><button type="button" data-action="new">${icon('Plus',17)}ساخت داده جدید</button></div>` : ''}</div><div class="dataset-actions">${action('new','داده جدید','Plus','tonal')}${tool('duplicate','کپی داده','Copy')}${tool('delete','حذف داده','Trash2')}</div><div class="dataset-actions dataset-actions-end">${action('restore','بازیابی نمونه','RefreshCw')}${action('export','خروجی JSON','Download')}<label class="button button-outlined file-button">${icon('Upload',16)}ورود JSON<input type="file" data-import accept="application/json,.json"></label></div></div>`;
}
function controls() {
  const filterModes = state.view === 'mobile'
    ? [['simple','جستجوی ساده'],['row','فیلتر ستون‌ها'],['none','بدون فیلتر']]
    : [['simple','جستجوی ساده'],['header','داخل سرستون'],['columns','زیر عنوان ستون'],['advanced','فیلتر پیشرفته'],['none','بدون فیلتر']];
  const type = filterType();
  const selectedMode = type === 'row' && state.view !== 'mobile' ? active().features?.filterMode === 'header' ? 'header' : 'columns' : type;
  return `<div class="control-strip"><div class="segmented-control">${(['table','list','grid','mobile'] as const).map((view,index) => `<button type="button" data-action="view" data-value="${view}" aria-pressed="${state.view === view}" class="${state.view === view ? 'selected' : ''}">${icon((['Table2','LayoutList','Grid2X2','Smartphone'] as const)[index],16)}${['جدول','فهرست','شبکه','موبایل'][index]}</button>`).join('')}</div><div class="strip-divider"></div><div class="density-control"><span>تراکم</span>${(['comfortable','compact'] as const).map((density,index) => `<button type="button" data-action="density" data-value="${density}" class="${state.density === density ? 'active' : ''}">${['راحت','فشرده'][index]}</button>`).join('')}</div><div class="strip-divider"></div><div class="feature-toggles">${(['search','pagination','selection','rowActions'] as const).map((feature,index) => `<button type="button" data-action="feature" data-value="${feature}" aria-pressed="${state[feature]}" class="${state[feature] ? 'active' : ''}">${icon((['Search','ListFilter','CheckCircle2','MoreVertical'] as const)[index],15)}${['جستجو','صفحه‌بندی','انتخاب','عملیات'][index]}</button>`).join('')}</div><div class="strip-spacer"></div><label class="filter-mode-control">فیلتر <select data-filter-mode aria-label="حالت فیلتر">${filterModes.map(([value,label])=>`<option value="${value}" ${selectedMode === value ? 'selected' : ''}>${label}</option>`).join('')}</select></label><div class="columns-control"><button type="button" data-action="columns" aria-expanded="${state.showColumns}">${icon('SlidersHorizontal',16)}ستون‌ها</button>${state.showColumns ? `<div class="columns-menu">${active().columns.map(column => `<label><input type="checkbox" data-column="${esc(column.key)}" ${column.visible !== false ? 'checked' : ''}>${esc(column.label)}</label>`).join('')}</div>` : ''}</div></div>`;
}
function workspace() {
  if (state.workspace === 'config') return `<div class="config-layout"><div class="editor-panel"><div class="panel-top"><div><strong>ویرایشگر JSON</strong><span>قرارداد استاندارد داده</span></div><span class="json-badge">JSON</span></div><textarea class="json-editor" spellcheck="false" dir="ltr" aria-label="پیکربندی JSON">${esc(state.editor)}</textarea><div id="editor-message">${editorMessage()}</div><div class="editor-footer"><span>از کلیدهای استاندارد برای ساخت الگو استفاده کنید.</span>${action('apply','اعمال تغییرات','Check','filled')}</div></div><div class="config-preview"><div class="mini-preview-heading"><span>پیش‌نمایش زنده</span><span class="live-indicator">LIVE</span></div><div class="${state.view === 'mobile' ? 'mobile-preview' : ''}" data-grid-slot="material"></div></div></div>`;
  const languages = ['flight-routes','flight-routes-en'].includes(active().id)
    ? `<div class="sample-language" role="group" aria-label="زبان نمونهٔ گرید"><span>زبان گرید</span><div class="segmented-control">${[['fa','فارسی'],['en','English']].map(([value,label]) => `<button type="button" lang="${value}" data-action="sample-language" data-value="${value}" aria-pressed="${(active().direction === 'ltr') === (value === 'en')}" class="${(active().direction === 'ltr') === (value === 'en') ? 'selected' : ''}">${label}</button>`).join('')}</div></div>` : '';
  return `<div class="preview-panel"><div class="preview-panel-head">${languages}<div class="compare-control"><button type="button" data-action="compare" class="${state.comparison ? 'compare-active' : ''}" role="switch" aria-checked="${state.comparison}"><span class="compare-switch"><span></span></span>مقایسه Classic / Material 3</button></div></div>${controls()}${state.comparison ? `<div class="comparison-grid"><div><div class="comparison-label"><span class="classic-dot"></span>Classic</div><div data-grid-slot="classic"></div></div><div><div class="comparison-label"><span class="material-dot"></span>Material 3</div><div data-grid-slot="material"></div></div></div>` : '<div data-grid-slot="material"></div>'}</div>`;
}
function editorMessage() {
  return state.editorMessage ? `<div class="editor-message ${state.editorMessage.type}" role="status">${icon(state.editorMessage.type === 'success' ? 'CheckCircle2' : 'AlertCircle',17)}${esc(state.editorMessage.text)}</div>` : '';
}
function filterType(): NonNullable<Options['filter']> {
  const dataset = active();
  const filter = dataset.features?.filtering === false ? 'none' : dataset.filter ??
    (['header','columns'].includes(dataset.features?.filterMode ?? '') ? 'row' : 'advanced');
  return state.view === 'mobile' && filter === 'advanced' ? 'row' : filter;
}
function optionsFor(classic: boolean): Options {
  const dataset = active();
  const english = dataset.direction === 'ltr';
  const text = (fa:string,en:string) => english ? en : fa;
  const filter = filterType();
  const typedFilters = filter === 'advanced' || (filter === 'row' && (state.view === 'mobile' || dataset.features?.filterMode !== 'header'));
  const columns = Object.fromEntries(dataset.columns.filter(column => column.visible !== false).map(column => [column.key, {
    title:esc(column.label), source:column.key, sort:column.sortable ?? false, filter:column.filterable ?? false,
    ...(!classic && column.guide ? {guide:column.guide} : {}),
    ...(column.width ? {width:column.width} : {}),
    compare:(left:unknown,right:unknown) => String(left ?? '').localeCompare(String(right ?? ''),english ? 'en' : 'fa',{numeric:true}),
    cellMaker:(_row:Row,value:unknown) => formatValue(value,column,dataset),
    ...(column.filterable ? {filterData:{
      type:typedFilters && column.type !== 'status' ? 'text' as const : 'select' as const,
      inputType:column.type === 'date' ? 'date' as const : column.type === 'number' ? 'number' as const : 'search' as const,
      fixValues:[...new Set(dataset.rows.map(row => String(row[column.key] ?? '')))].filter(Boolean).map(value => ({id:value,value:dataset.statusMap?.[value]?.label ?? value})),
    }} : {}),
  }]));
  if (classic) Object.values(columns).forEach(column => {column.filter = true; delete column.filterData;});
  if (!classic && state.rowActions && (dataset.id.startsWith('flight-routes') || dataset.operationGuide)) columns.operation = {
    title:text('عملیات','Actions'),source:'id',sort:false,filter:false,compare:()=>0,guide:dataset.operationGuide,
    cellMaker:row => `<div class="iconsOperations studio-route-actions" data-grid-actions="row">
      <button type="button" class="icon icon-button" data-grid-action-trigger="row" aria-label="${text('عملیات مسیر','Route actions')}">${icon('MoreVertical')}</button>
      <div class="iconsDetail" data-grid-action-menu>
        <button type="button" class="iconItem" data-grid-action="edit" data-route-operation="edit" data-route-id="${esc(row.id)}">${icon('Settings2',16)}${text('ویرایش','Edit')}</button>
        <button type="button" class="iconItem" data-grid-action="disable" data-route-operation="disable" data-route-id="${esc(row.id)}">${icon('CheckCircle2',16)}${row.status === 'inactive' ? text('فعال کردن','Enable') : text('غیرفعال کردن','Disable')}</button>
        <button type="button" class="iconItem" data-grid-action="delete" data-route-operation="delete" data-route-id="${esc(row.id)}">${icon('Trash2',16)}${text('حذف','Delete')}</button>
      </div></div>`
  };
  if (classic && state.rowActions) columns.operation = {title:text('عملیات','Actions'),source:'id',sort:false,filter:false,compare:()=>0,cellMaker:row => `<button type="button" class="classic-row-action" data-row-id="${esc(row.id)}" aria-label="${text('ویرایش ردیف','Edit row')}">${icon('MoreVertical')}</button>`};
  const sizes = [...new Set([6,8,10,12,state.pageSize])].sort((a,b) => a-b);
  return {
    guide: classic ? undefined : dataset.guide,
    guideTargets: classic ? undefined : {'page.create': () => root.querySelector<HTMLElement>('.dataset-actions [data-action=new]')},
    headerMaker: classic ? undefined : () => `<h3>${esc(dataset.title)}</h3>${dataset.description ? `<p>${esc(dataset.description)}</p>` : ''}`,
    columns, process:'client',filter:classic && filter === 'advanced' ? 'row' : filter,direction:dataset.direction ?? 'rtl',
    paging:!classic && state.pagination ? sizes : false,defaultPagingIndex:sizes.indexOf(state.pageSize),
    information:!classic,
    rowNumber:classic ? text('ردیف','#') : '',selectable:state.selection ? state.selectionMode : false,selectAll:state.selectionMode === 'multi',
    selectedSourceId:'studio.selected',refreshSourceId:'studio.refresh',loader:false,
    culture:{deviceId:1,template:classic ? 'template1' : 'template4',labels:english ? englishGridLabels : {
      pageSize:'نمایش در صفحه',search:'جستجو',searchPlaceholder:'جستجو در داده‌ها',chooseItem:'همه موارد',goto:'صفحه',
      information:'نمایش ${from} تا ${to} از مجموع ${total}',noData:'نتیجه‌ای پیدا نشد',
    }},
    presentation:classic ? undefined : {
      view:state.view,density:state.density,search:state.search,rowActions:state.rowActions && !columns.operation,filterMode:dataset.features?.filterMode,
      quickFilter:dataset.view?.card?.badgeKey ?? dataset.columns.find(column => column.type === 'status')?.key,
      titleKey:dataset.view?.card?.titleKey,subtitleKey:dataset.view?.card?.subtitleKey,
      imageKey:dataset.columns.find(column => column.type === 'image')?.key,badgeKey:dataset.view?.card?.badgeKey,
      onRowAction:openRow,onPageSizeChange:size => {state.pageSize=size;},
      onSettings:() => {state.showColumns=!state.showColumns;void render();},
    },
  };
}
async function render() {
  const mine = ++revision;
  pending = pending.catch(()=>{}).then(async () => {
    if (mine !== revision) return;
    const material = mounts.find(mount => mount.grid.materialTemplate);
    if (material) snapshot = {id:root.dataset.datasetId || '',state:material.grid.materialTemplate.captureState()};
    await Promise.all(mounts.map(mount => mount.dispose()));
    mounts = [];
    if (mine !== revision) return;
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.dataset.gridVersion = version;
    document.documentElement.dataset.gridEdition = 'template4-guide';
    root.dataset.datasetId = active().id;
    root.innerHTML = `<div class="app-shell" dir="rtl"><main class="studio-main"><div class="topbar"><div class="brand"><div class="brand-mark"><img src="/basisicon.ico" width="32" height="32" alt="BasisPanel"></div><div><strong>BasisPanel List Studio</strong><span class="release-version" lang="en" dir="ltr">Template 4 · ${version}</span></div></div><div class="topbar-actions"><span class="saved-label"><span class="saved-dot"></span>${storageFailed ? 'ذخیره‌سازی مرورگر در دسترس نیست' : 'ذخیره خودکار فعال است'}</span>${tool('theme','تغییر حالت روشن و تاریک',state.theme === 'light' ? 'Moon' : 'Sun')}${tool('settings','تنظیمات','Settings2')}</div></div>${gallery()}<section class="workspace-section"><div class="section-heading workspace-heading"><div><span class="eyebrow">فضای کار زنده</span><h2>داده را تغییر دهید، نتیجه را ببینید</h2></div><div class="workspace-tabs"><button type="button" data-action="workspace" data-value="preview" class="${state.workspace === 'preview' ? 'tab-active' : ''}">${icon('Sparkles',16)}پیش‌نمایش</button><button type="button" data-action="workspace" data-value="config" class="${state.workspace === 'config' ? 'tab-active' : ''}">${icon('FileJson',16)}پیکربندی JSON</button></div></div>${datasetBar()}${workspace()}</section><footer class="studio-footer"><span>${icon('Sparkles',16)}ساخته شده برای تجربه بهتر داده‌ها</span><span>BasisPanel List Studio <b>·</b> Material 3</span></footer></main></div>`;
    const dataset = active();
    for (const container of root.querySelectorAll<HTMLElement>('[data-grid-slot]')) {
      container.classList.toggle('mobile-preview', state.view === 'mobile' && container.dataset.gridSlot !== 'classic');
      container.lang = dataset.direction === 'ltr' ? 'en' : 'fa';
      container.dir = dataset.direction ?? 'rtl';
      const mount = await mountGrid(container,optionsFor(container.dataset.gridSlot === 'classic'),dataset.rows);
      mounts.push(mount);
      if (container.dataset.gridSlot === 'classic') styleClassic(container);
      else if (snapshot?.id === dataset.id) {
        const saved = snapshot.state;
        mount.grid.materialTemplate.restoreState({...saved,selected:mount.rows.filter(row => saved.selected.some(selected => String(selected.id) === String(row.id)))});
      }
    }
  });
  return pending.catch(error => {
    console.error(error);
    const slot = root.querySelector('[data-grid-slot]');
    if (slot) slot.innerHTML = `<div class="editor-message error" role="alert">خطا در بارگذاری گرید: ${esc(error.message)}</div>`;
  });
}

function styleClassic(container: HTMLElement) {
  container.classList.add('classic-preview');
  const tools = document.createElement('div');tools.className='classic-tools';
  tools.innerHTML = `${tool('classic-filters','فیلتر ستون‌ها','Filter')}${tool('classic-reset','پاک کردن فیلترها','X')}${tool('new','داده جدید','Plus')}${tool('classic-reset','بارگذاری مجدد','RefreshCw')}`;
  container.prepend(tools);
  const title = document.createElement('h3');title.className='classic-title';title.textContent=active().title;container.prepend(title);
  container.querySelectorAll<HTMLElement>('[data-sys-th-container]').forEach(heading => {
    const filter = heading.querySelector<HTMLElement>('[pop-up-search-form]');
    if (filter) {
      filter.style.display='flex';
      filter.querySelector('span')?.remove();
      heading.append(filter);
    }
  });
}
function download(content:string,name:string,type='application/json') {
  const url = URL.createObjectURL(new Blob([content],{type}));
  const link = document.createElement('a');link.href=url;link.download=name;link.click();URL.revokeObjectURL(url);
}
function openRow(row: Row) {
  const english = active().direction === 'ltr';
  const text = (fa:string,en:string) => english ? en : fa;
  const previous = document.activeElement as HTMLElement | null;
  const backdrop = document.createElement('div');backdrop.className='dialog-backdrop';
  backdrop.innerHTML = `<div class="dialog" lang="${english ? 'en' : 'fa'}" dir="${english ? 'ltr' : 'rtl'}" role="dialog" aria-modal="true" aria-labelledby="row-title"><div class="dialog-head"><div><span class="eyebrow">${text('ویرایش سریع','Quick edit')}</span><h3 id="row-title">${text('جزئیات ردیف','Route details')}</h3></div><button type="button" class="icon-button" data-close-dialog aria-label="${text('بستن','Close')}">${icon('X')}</button></div><div class="dialog-fields">${active().columns.filter(column => column.type !== 'image').slice(0,5).map(column => `<label><span>${esc(column.label)}</span><input value="${esc(row[column.key])}" readonly></label>`).join('')}</div><button type="button" class="button button-filled" data-close-dialog>${text('بستن','Close')}</button></div>`;
  const close = () => {backdrop.remove();previous?.focus();};
  backdrop.addEventListener('click',event => {if(event.target === backdrop || (event.target as Element).closest('[data-close-dialog]')) close();});
  backdrop.addEventListener('keydown',event => {
    if(event.key === 'Escape') close();
    if(event.key === 'Tab') {
      const fields = Array.from(backdrop.querySelectorAll<HTMLElement>('button,input')); const first=fields[0],last=fields[fields.length-1];
      if(event.shiftKey && document.activeElement === first){event.preventDefault();last.focus();}
      if(!event.shiftKey && document.activeElement === last){event.preventDefault();first.focus();}
    }
  });
  document.body.append(backdrop);backdrop.querySelector<HTMLButtonElement>('button')?.focus();
}
root.addEventListener('input',event => {
  if((event.target as Element).matches('.json-editor')) {state.editor=(event.target as HTMLTextAreaElement).value;state.editorMessage=null;document.getElementById('editor-message')?.replaceChildren();}
});
root.addEventListener('change',event => {
  const input=event.target as HTMLInputElement;
  if(input.matches('[data-filter-mode]')) {
    const dataset=active();
    dataset.filter = input.value === 'header' || input.value === 'columns' ? 'row' : input.value as Dataset['filter'];
    dataset.features={...dataset.features,filtering:input.value !== 'none',
      ...(state.view === 'mobile' ? {} : {filterMode:input.value === 'columns' ? 'columns' : input.value === 'header' ? 'header' : 'panel'})};
    persist();state.editor=JSON.stringify(dataset,null,2);void render();
  }
  if(input.dataset.column) {
    const column=active().columns.find(column=>column.key===input.dataset.column);if(column) column.visible=input.checked;
    persist();state.editor=JSON.stringify(active(),null,2);void render();
  }
  if(input.matches('[data-import]') && input.files?.[0]) {
    void input.files[0].text().then(text => {state.editor=text;state.workspace='config';state.editorMessage={type:'success',text:'فایل آماده بررسی و اعمال است.'};void render();});input.value='';
  }
});
root.addEventListener('click',event => {
  const trigger=(event.target as Element).closest<HTMLElement>('.studio-route-actions [data-grid-action-trigger]');
  if(trigger){trigger.closest('.iconsOperations')?.classList.toggle('show');return;}
  const operation=(event.target as Element).closest<HTMLElement>('[data-route-operation]');
  if(operation) {
    const dataset=active();
    const row=dataset.rows.find(item=>String(item.id)===operation.dataset.routeId);
    if(!row)return;
    if(operation.dataset.routeOperation==='edit'){openRow(row);return;}
    if(operation.dataset.routeOperation==='delete') {
      if(!confirm(dataset.direction === 'ltr' ? 'Delete this route from the sample data?' : 'این مسیر از داده‌های نمونه حذف شود؟'))return;
      dataset.rows=dataset.rows.filter(item=>item!==row);
    } else row.status=row.status==='active'?'inactive':'active';
    snapshot=undefined;persist();state.editor=JSON.stringify(dataset,null,2);void render();return;
  }
  const target=(event.target as Element).closest<HTMLElement>('[data-action]');
  if(!target) {
    const row=(event.target as Element).closest<HTMLElement>('[data-row-id]');if(row){const data=active().rows.find(item=>String(item.id)===row.dataset.rowId);if(data)openRow(data);}return;
  }
  const dataset=active();
  switch(target.dataset.action) {
    case 'theme':state.theme=state.theme==='light'?'dark':'light';document.documentElement.dataset.theme=state.theme;target.innerHTML=icon(state.theme==='light'?'Moon':'Sun');return;
    case 'settings':case 'columns':state.showColumns=!state.showColumns;break;
    case 'classic-filters':root.querySelector('.classic-preview')?.classList.toggle('filters-hidden');return;
    case 'classic-reset':break;
    case 'datasets':state.showDatasets=!state.showDatasets;break;
    case 'activate':activate(target.dataset.id!);break;
    case 'sample-language':{
      const presentation = {view:state.view,density:state.density,pageSize:state.pageSize,selectionMode:state.selectionMode,
        search:state.search,pagination:state.pagination,selection:state.selection,rowActions:state.rowActions};
      activate(target.dataset.value === 'en' ? 'flight-routes-en' : 'flight-routes');
      Object.assign(state,presentation);break;
    }
    case 'view':state.view=target.dataset.value as ViewMode;break;
    case 'density':state.density=target.dataset.value as Density;break;
    case 'feature':{const key=target.dataset.value as 'search'|'pagination'|'selection'|'rowActions';state[key]=!state[key];break;}
    case 'workspace':state.workspace=target.dataset.value!;break;
    case 'compare':state.comparison=!state.comparison;break;
    case 'template':{const template=templates[Number(target.dataset.index)];state.view=template.view;if(template.density)state.density=template.density;if(template.selection){state.selection=true;state.selectionMode=template.selection;}state.workspace='preview';break;}
    case 'new':{const next:Dataset={...structuredClone(originalDatasets[1]),id:`dataset-${Date.now()}`,title:'داده جدید',description:'یک پیکربندی جدید برای شروع',rows:[]};state.datasets.push(next);activate(next.id);state.workspace='config';persist();break;}
    case 'duplicate':{const next={...structuredClone(dataset),id:`${dataset.id}-copy-${Date.now()}`,title:`${dataset.title} — کپی`};state.datasets.push(next);activate(next.id);persist();break;}
    case 'delete':if(state.datasets.length<=1||!confirm('این داده حذف شود؟'))return;state.datasets=state.datasets.filter(item=>item.id!==dataset.id);activate(state.datasets[0].id);persist();break;
    case 'restore':{const original=originalDatasets.find(item=>item.id===dataset.id);if(original){state.datasets=state.datasets.map(item=>item.id===original.id?structuredClone(original):item);activate(original.id);persist();}break;}
    case 'export':download(JSON.stringify(dataset,null,2),`${dataset.id}.json`);return;
    case 'apply':try {
      const next=datasetSchema.parse(JSON.parse(state.editor));
      if(next.id!==dataset.id && state.datasets.some(item=>item.id===next.id))throw new Error('شناسه داده تکراری است.');
      state.datasets=state.datasets.map(item=>item.id===dataset.id?next:item);activate(next.id);state.editorMessage={type:'success',text:'تغییرات با موفقیت اعمال شد.'};persist();
    } catch(error) {state.editorMessage={type:'error',text:`ساختار JSON معتبر نیست: ${error instanceof Error ? error.message : ''}`};const message=document.getElementById('editor-message');if(message)message.innerHTML=editorMessage();return;}break;
  }
  void render();
});
document.addEventListener('keydown',event=>{
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();root.querySelector<HTMLInputElement>('.search-field input')?.focus();}
  if(event.key==='Escape'&&(state.showColumns||state.showDatasets)){state.showColumns=false;state.showDatasets=false;void render();}
});
void render();
