export const groups = [
  { title: "تمپلیت‌ها", examples: [
    ["template1", "تمپلیت ۱", "component/configuration/mobileDesign/template1.html"],
    ["template2", "تمپلیت ۲", "component/configuration/mobileDesign/template2.html"],
    ["template3", "تمپلیت ۳", "component/configuration/mobileDesign/template3.html"],
  ] },
  { title: "شروع کار", examples: [
    ["library", "کتابخانه جاوااسکریپت", "library.html"],
    ["zero-config", "بدون پیکربندی", "component/zero-config.html"],
    ["if", "شرط If", "component/if.html"],
    ["reset", "بازنشانی", "component/reset.html"],
    ["dynamic-data", "داده پویا", "component/dynamic-data.html"],
    ["with-config", "پیکربندی ساده", "component/configuration/with-config.html"],
    ["with-config-en", "پیکربندی چپ‌به‌راست", "component/configuration/with-config-en.html"],
  ] },
  { title: "افزودن ردیف", examples: [
    ["new-row", "افزودن ردیف دسکتاپ", "component/configuration/new-row.html"],
    ["new-row-mobile", "افزودن ردیف موبایل", "component/configuration/new-row-mobile.html"],
  ] },
  { title: "صفحه‌بندی", examples: [
    ["no-paging", "بدون صفحه‌بندی", "component/configuration/paging/no-paging.html"],
    ["simple-paging", "صفحه‌بندی ساده", "component/configuration/paging/simple-paging.html"],
    ["multi-paging", "صفحه‌بندی چندتایی", "component/configuration/paging/multi-paging.html"],
    ["multi-paging-default", "صفحه‌بندی با مقدار پیش‌فرض", "component/configuration/paging/multi-paging-with-default.html"],
  ] },
  { title: "چیدمان و عملیات", examples: [
    ["css-class", "کلاس CSS", "component/configuration/layout/css-class.html"],
    ["no-data", "بدون داده", "component/configuration/layout/no-data.html"],
    ["first-last-btn", "دکمه ابتدا و انتها", "component/configuration/layout/first-last-btn.html"],
    ["loader", "نشانگر بارگذاری", "component/configuration/layout/loader.html"],
    ["refresh", "بارگذاری مجدد", "component/configuration/layout/refresh.html"],
    ["selectable", "انتخاب ردیف", "component/configuration/layout/selectable.html"],
    ["width-card", "عرض کارت", "component/configuration/widthCard/sample.html"],
    ["export-excel", "خروجی اکسل", "component/configuration/withExport/exportExcel.html"],
    ["with-action", "پیکربندی عملیات", "component/configuration/with-action.html"],
  ] },
  { title: "داده و پردازش", examples: [
    ["server", "پردازش سرور", "component/process/server.html"],
    ["mix", "پردازش ترکیبی", "component/process/mix.html"],
    ["mix-config", "پردازش ترکیبی با پیکربندی", "component/process/mixWithConfig.html"],
    ["dbsource", "DbSource", "component/use-dbsource.html"],
    ["api", "API", "component/use-api.html"],
    ["websocket", "WebSocket", "component/use-websocket.html"],
  ] },
];

export const examples = groups.flatMap(group => group.examples);

export const templates = [
  ...groups[0].examples,
  ["template4", "تمپلیت ۴", "component/configuration/mobileDesign/template4.html"],
];

export function selectedExample(hash) {
  return examples.find(([id]) => hash === `#${id}`) || examples[0];
}
