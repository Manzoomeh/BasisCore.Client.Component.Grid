import { z } from 'zod';

const columnSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(['text', 'number', 'date', 'boolean', 'status', 'image', 'currency']),
  sortable: z.boolean().optional(),
  filterable: z.boolean().optional(),
  visible: z.boolean().optional(),
  width: z.string().optional(),
  valueIcons: z.record(z.string(), z.string()).optional(),
});

export const datasetSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  filter: z.enum(['simple', 'row', 'none', 'advanced']).optional(),
  direction: z.enum(['rtl', 'ltr']).optional(),
  view: z.object({
    default: z.enum(['table', 'list', 'grid', 'mobile']).optional(),
    density: z.enum(['compact', 'comfortable']).optional(),
    pageSize: z.number().int().positive().optional(),
    card: z.object({ titleKey: z.string(), subtitleKey: z.string(), badgeKey: z.string().optional() }).optional(),
  }).optional(),
  columns: z.array(columnSchema).min(1),
  statusMap: z.record(z.string(), z.object({ label: z.string(), color: z.string() })).optional(),
  rows: z.array(z.record(z.string(), z.unknown())),
  features: z.object({
    filterMode: z.enum(['panel', 'header', 'columns']).optional(),
    search: z.boolean().optional(), sorting: z.boolean().optional(), filtering: z.boolean().optional(), pagination: z.boolean().optional(), selection: z.boolean().optional(), columnVisibility: z.boolean().optional(), csvExport: z.boolean().optional(),
  }).optional(),
});

export type Column = z.infer<typeof columnSchema>;
export type Dataset = z.infer<typeof datasetSchema>;
export type ViewMode = 'table' | 'list' | 'grid' | 'mobile';
export type Density = 'compact' | 'comfortable';

const baseStatusMap = {
  active: { label: 'فعال', color: 'success' },
  inactive: { label: 'غیرفعال', color: 'neutral' },
  low: { label: 'رو به اتمام', color: 'warning' },
  admin: { label: 'مدیر', color: 'info' },
  editor: { label: 'ویرایشگر', color: 'success' },
  viewer: { label: 'مشاهده‌گر', color: 'neutral' },
};

const airlineSampleIcon = 'icon:plane';
const routes: Dataset = {
  filter: 'row',
  id: 'flight-routes', title: 'لیست مسیرهای پروازی', description: 'مدیریت مسیرهای پروازی و برنامه حرکت ناوگان', direction: 'rtl',
  view: { default: 'table', density: 'comfortable', pageSize: 8, card: { titleKey: 'route', subtitleKey: 'airline', badgeKey: 'status' } }, statusMap: baseStatusMap,
  columns: [
    { key: 'route', label: 'مسیر پرواز', type: 'text', width: '170px', sortable: true, filterable: true },
    { key: 'airline', label: 'ایرلاین', type: 'text', width: '200px', sortable: true, filterable: true,
      valueIcons: {
      'Emirates Airlines': airlineSampleIcon, 'Turkish Airlines': airlineSampleIcon, 'Iran Air': airlineSampleIcon,
      'Iraqi Airways': airlineSampleIcon, 'Air France': airlineSampleIcon, 'Qatar Airways': airlineSampleIcon,
      flydubai: airlineSampleIcon, Pegasus: airlineSampleIcon, Lufthansa: airlineSampleIcon,
    } },
    { key: 'aircraft', label: 'نوع هواپیما', type: 'text', width: '160px', filterable: true },
    { key: 'code', label: 'کد مسیر', type: 'text', width: '120px', sortable: true, filterable: true },
    { key: 'duration', label: 'مدت سفر (دقیقه)', type: 'number', width: '140px', sortable: true, filterable: true },
    { key: 'createdAt', label: 'تاریخ ایجاد', type: 'date', width: '156px', sortable: true, filterable: true },
    { key: 'status', label: 'وضعیت', type: 'status', width: '110px', filterable: true },
  ],
  rows: [
    { id: 'route-1', route: 'تهران ← دبی', airline: 'Emirates Airlines', aircraft: 'Airbus A320', code: 'EK-978', duration: 150, createdAt: '2025-06-18', status: 'active' }, { id: 'route-2', route: 'تهران ← استانبول', airline: 'Turkish Airlines', aircraft: 'Boeing 737', code: 'TK-879', duration: 180, createdAt: '2025-06-12', status: 'active' }, { id: 'route-3', route: 'تهران ← آنتالیا', airline: 'Turkish Airlines', aircraft: 'Airbus A321', code: 'TK-884', duration: 240, createdAt: '2025-05-24', status: 'inactive' }, { id: 'route-4', route: 'تهران ← مشهد', airline: 'Iran Air', aircraft: 'ATR 72', code: 'IR-214', duration: 90, createdAt: '2025-05-11', status: 'active' }, { id: 'route-5', route: 'رشت ← بغداد', airline: 'Iraqi Airways', aircraft: 'Boeing 737-300', code: 'IA-442', duration: 120, createdAt: '2025-04-29', status: 'active' }, { id: 'route-6', route: 'تهران ← پاریس', airline: 'Air France', aircraft: 'Boeing 777', code: 'AF-739', duration: 420, createdAt: '2025-04-17', status: 'inactive' }, { id: 'route-7', route: 'شیراز ← دوحه', airline: 'Qatar Airways', aircraft: 'Airbus A350', code: 'QR-477', duration: 110, createdAt: '2025-04-10', status: 'active' }, { id: 'route-8', route: 'اصفهان ← دبی', airline: 'flydubai', aircraft: 'Boeing 737', code: 'FZ-123', duration: 120, createdAt: '2025-03-28', status: 'active' }, { id: 'route-9', route: 'تبریز ← استانبول', airline: 'Pegasus', aircraft: 'Airbus A320', code: 'PC-511', duration: 165, createdAt: '2025-03-19', status: 'active' }, { id: 'route-10', route: 'تهران ← فرانکفورت', airline: 'Lufthansa', aircraft: 'Airbus A340', code: 'LH-601', duration: 390, createdAt: '2025-03-05', status: 'inactive' }, { id: 'route-11', route: 'مشهد ← بغداد', airline: 'Iraqi Airways', aircraft: 'Airbus A320', code: 'IA-611', duration: 145, createdAt: '2025-02-28', status: 'active' }, { id: 'route-12', route: 'کیش ← دبی', airline: 'Emirates Airlines', aircraft: 'Boeing 777', code: 'EK-979', duration: 105, createdAt: '2025-02-16', status: 'active' },
  ], features: { filterMode: 'columns', search: true, sorting: true, filtering: true, pagination: true, selection: true, columnVisibility: true, csvExport: true },
};

const products: Dataset = {
  id: 'products', title: 'فهرست محصولات', description: 'کنترل موجودی و قیمت محصولات فروشگاه', direction: 'rtl', view: { default: 'grid', density: 'comfortable', pageSize: 8, card: { titleKey: 'name', subtitleKey: 'category', badgeKey: 'status' } }, statusMap: baseStatusMap,
  columns: [{ key: 'image', label: 'تصویر', type: 'image' }, { key: 'name', label: 'نام محصول', type: 'text', sortable: true, filterable: true }, { key: 'sku', label: 'شناسه کالا', type: 'text', sortable: true }, { key: 'category', label: 'دسته‌بندی', type: 'text', filterable: true }, { key: 'price', label: 'قیمت', type: 'currency', sortable: true }, { key: 'stock', label: 'موجودی', type: 'number', sortable: true }, { key: 'status', label: 'وضعیت', type: 'status', filterable: true }],
  rows: [
    { id: 'p1', image: '', name: 'هدفون بی‌سیم استودیو', sku: 'AUD-2048', category: 'صوتی', price: 4890000, stock: 28, status: 'active' }, { id: 'p2', image: '', name: 'کیبورد مکانیکی آلومینیومی', sku: 'KEY-1120', category: 'لوازم جانبی', price: 3250000, stock: 12, status: 'active' }, { id: 'p3', image: '', name: 'پایه نگهدارنده لپ‌تاپ', sku: 'ACC-7710', category: 'میز کار', price: 980000, stock: 4, status: 'low' }, { id: 'p4', image: '', name: 'چراغ رومیزی هوشمند', sku: 'HOM-4402', category: 'خانه هوشمند', price: 2150000, stock: 31, status: 'active' }, { id: 'p5', image: '', name: 'ماوس ارگونومیک حرفه‌ای', sku: 'ACC-8841', category: 'لوازم جانبی', price: 1740000, stock: 18, status: 'active' }, { id: 'p6', image: '', name: 'وب‌کم 4K با میکروفون', sku: 'VID-1902', category: 'تصویر', price: 6120000, stock: 6, status: 'low' }, { id: 'p7', image: '', name: 'اسپیکر قابل حمل', sku: 'AUD-3301', category: 'صوتی', price: 2860000, stock: 22, status: 'active' }, { id: 'p8', image: '', name: 'هاب USB-C چندکاره', sku: 'ACC-9911', category: 'لوازم جانبی', price: 1290000, stock: 0, status: 'inactive' }, { id: 'p9', image: '', name: 'دفتر یادداشت چرمی', sku: 'STA-1010', category: 'نوشت‌افزار', price: 540000, stock: 45, status: 'active' }, { id: 'p10', image: '', name: 'شارژر سریع رومیزی', sku: 'POW-2322', category: 'برق و انرژی', price: 1890000, stock: 9, status: 'active' }, { id: 'p11', image: '', name: 'میکروفون USB پادکست', sku: 'AUD-5100', category: 'صوتی', price: 4350000, stock: 14, status: 'active' }, { id: 'p12', image: '', name: 'کاور لپ‌تاپ نمدی', sku: 'ACC-7144', category: 'لوازم جانبی', price: 760000, stock: 3, status: 'low' },
  ], features: { search: true, sorting: true, filtering: true, pagination: true, selection: true, columnVisibility: true, csvExport: true },
};

const users: Dataset = {
  id: 'users', title: 'اعضای تیم', description: 'مدیریت اعضا و دسترسی‌های فضای کاری', direction: 'rtl', view: { default: 'list', density: 'comfortable', pageSize: 8, card: { titleKey: 'name', subtitleKey: 'email', badgeKey: 'status' } }, statusMap: baseStatusMap,
  columns: [{ key: 'avatar', label: 'تصویر', type: 'image' }, { key: 'name', label: 'نام و نام خانوادگی', type: 'text', sortable: true, filterable: true }, { key: 'email', label: 'ایمیل', type: 'text', sortable: true }, { key: 'role', label: 'نقش', type: 'status', filterable: true }, { key: 'registeredAt', label: 'تاریخ عضویت', type: 'date', sortable: true }, { key: 'status', label: 'وضعیت', type: 'status', filterable: true }],
  rows: [
    { id: 'u1', avatar: '', name: 'سارا احمدی', email: 'sara.ahmadi@example.com', role: 'admin', registeredAt: '2025-01-12', status: 'active' }, { id: 'u2', avatar: '', name: 'پرهام کریمی', email: 'parham.karimi@example.com', role: 'editor', registeredAt: '2025-01-19', status: 'active' }, { id: 'u3', avatar: '', name: 'نگار محمدی', email: 'negar.mohammadi@example.com', role: 'viewer', registeredAt: '2025-02-03', status: 'active' }, { id: 'u4', avatar: '', name: 'امیر رضایی', email: 'amir.rezaei@example.com', role: 'editor', registeredAt: '2025-02-14', status: 'inactive' }, { id: 'u5', avatar: '', name: 'مریم موسوی', email: 'maryam.mousavi@example.com', role: 'viewer', registeredAt: '2025-02-20', status: 'active' }, { id: 'u6', avatar: '', name: 'یاسین صادقی', email: 'yasin.sadeghi@example.com', role: 'editor', registeredAt: '2025-03-01', status: 'active' }, { id: 'u7', avatar: '', name: 'الناز رحیمی', email: 'elnaz.rahimi@example.com', role: 'viewer', registeredAt: '2025-03-10', status: 'active' }, { id: 'u8', avatar: '', name: 'کیان نادری', email: 'kian.naderi@example.com', role: 'admin', registeredAt: '2025-03-18', status: 'active' }, { id: 'u9', avatar: '', name: 'بهاره یزدانی', email: 'bahareh.yazdani@example.com', role: 'viewer', registeredAt: '2025-03-25', status: 'inactive' }, { id: 'u10', avatar: '', name: 'نوید اکبری', email: 'navid.akbari@example.com', role: 'editor', registeredAt: '2025-04-02', status: 'active' }, { id: 'u11', avatar: '', name: 'آرزو حیدری', email: 'arezo.heidari@example.com', role: 'viewer', registeredAt: '2025-04-11', status: 'active' }, { id: 'u12', avatar: '', name: 'علی نیک‌نام', email: 'ali.niknam@example.com', role: 'editor', registeredAt: '2025-04-17', status: 'active' },
  ], features: { search: true, sorting: true, filtering: true, pagination: true, selection: true, columnVisibility: true, csvExport: true },
};

const englishColumns = ['Flight route','Airline','Aircraft','Route code','Duration (min)','Created on','Status'];
const englishRoutes: Dataset = {
  ...structuredClone(routes), id:'flight-routes-en', direction:'ltr',
  title:'Flight routes', description:'Manage flight routes and fleet schedules',
  columns:routes.columns.map((column,index) => ({...structuredClone(column),label:englishColumns[index]})),
  statusMap:{active:{label:'Active',color:'success'},inactive:{label:'Inactive',color:'neutral'}},
  rows:routes.rows.map((row,index) => ({...row,route:[
    'Tehran → Dubai','Tehran → Istanbul','Tehran → Antalya','Tehran → Mashhad',
    'Rasht → Baghdad','Tehran → Paris','Shiraz → Doha','Isfahan → Dubai',
    'Tabriz → Istanbul','Tehran → Frankfurt','Mashhad → Baghdad','Kish → Dubai',
  ][index]})),
};

export const originalDatasets = [routes, products, users, englishRoutes];
