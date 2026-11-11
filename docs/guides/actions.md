# راهنمای عملیات HTML گرید

این قرارداد مخصوص Template 4 است؛ نیازی به جایگزین کردن `cellMaker`، سه‌نقطه، آیکون‌ها یا handlerهای ویجت نیست. گرید فقط نشانه‌های HTML را می‌خواند. عملیات واقعی همچنان مسئولیت کد ویجت است.

## شروع سریع

در لایهٔ اول کانفیگ، `guide: true` یا یک object مثل `guide: {}` قرار دهید؛ حذف `guide` یا مقدار `false` دکمه را پنهان می‌کند، حتی اگر ستون عملیات مرحله‌های فعال داشته باشد. object می‌تواند همان فراداده و مراحل سراسری قبلی را نگه دارد. بدون هیچ مرحلهٔ تعریف‌شده، دکمه نمایش داده نمی‌شود.

۱. نام ستون عملیات را `operation` نگه دارید.
۲. HTML منوی ردیف در `operation.cellMaker` و HTML عملیات گروهی در `operation.title` قرار می‌گیرد.
۳. چهار نشانهٔ جدول زیر را به HTML فعلی اضافه کنید.
۴. متن آموزش را در `columns.operation.guide.steps` با هدف منطقی متناظر بنویسید؛ `options.guide.steps` هم برای اجزای عمومی لیست/صفحه و کانفیگ‌های قبلی پشتیبانی می‌شود.

## راهنمای چندمرحله‌ای ستون عملیات

HTML و handlerهای قبلی را نگه دارید؛ فقط `guide` زیر را به تعریف همان ستون اضافه کنید:

```js
const options = {
  culture: {template: "template4", /* سایر تنظیمات فعلی */},
  guide: {
    schemaVersion: 2, id: 1001, lid: 1, revision: 7,
    title: "راهنمای مسیرهای پروازی",
    steps: [{
      id: "routes-search", target: "list.search", priority: 10,
      title: "جستجوی مسیر", description: "مسیر موردنظر را در همین لیست پیدا کنید."
    }]
  },
  columns: {
    info: {
      title: "مسیر", source: "route",
      guide: {status: "active", id: "route-row", priority: 20,
        description: "مبدأ و مقصد مسیر را بررسی کنید."}
    },
    operation: {
      title: bulkMenuHtml, filter: false, sort: false,
      cellMaker: makeRowMenu, // همان سازندهٔ HTML قبلی؛ تغییرش ندهید.
      guide: {
        status: "active", id: "route-operations", priority: 30, optional: true,
        steps: [
          {id: "route-edit", target: "list.row.action.edit", title: "ویرایش مسیر",
            description: "فرم مشخصات همین مسیر را باز می‌کند."},
          {id: "route-disable", target: "list.row.action.disable", title: "غیرفعال کردن مسیر",
            description: "تغییر وضعیت این مسیر است؛ با حذف تفاوت دارد."},
          {id: "route-delete", target: "list.row.action.delete", title: "حذف مسیر",
            description: "پیش از تأیید حذف، مسیر و کدش را بررسی کنید.", priority: 40},
          {id: "routes-delete", target: "list.bulk.action.delete", title: "حذف گروهی",
            description: "روی ردیف‌های انتخاب‌شده اجرا می‌شود.", priority: 50}
        ]
      }
    }
  }
};
```

`bulkMenuHtml` و `makeRowMenu` در این مثال همان HTML گروهی و سازندهٔ منوی ردیف در بخش‌های بعد هستند؛ توابع داخلی گرید نیستند.

در مثال بالا ترتیب آموزش این است: جستجو ← مسیر ← ویرایش ← غیرفعال‌سازی ← حذف ← حذف گروهی. هر اکشن هنوز از `data-grid-action` در HTML پیدا می‌شود، نه از متن عنوان. این تنظیم فقط محتوای آموزش را تغییر می‌دهد؛ handler یا منوی واقعی جایگزین نمی‌شود.

### قواعد ترتیب و ارث‌بری

- `priority` یک عدد صحیح امنِ نامنفی است؛ **عدد کوچک‌تر زودتر** اجرا می‌شود. این ترتیب بین همهٔ مراحل سراسری و ستون‌ها مشترک است، نه فقط داخل یک ستون.
- اولویت هر مرحلهٔ داخلی از `step.priority`، سپس `column.guide.priority` و در نهایت `1000` گرفته می‌شود. مرحلهٔ سراسری بدون اولویت هم `1000` است.
- اولویت برابر: ترتیب ستون‌ها حفظ می‌شود؛ داخل هر ستون توضیح کلی و سپس ترتیب `steps`؛ پس از آن ترتیب `options.guide.steps`. پس کانفیگ‌های قبلیِ بدون اولویت ترتیب نسبی خود را حفظ می‌کنند.
- `optional` هم از مرحله، سپس از راهنمای ستون گرفته می‌شود؛ `optional: false` روی مرحله، `true` والد را لغو می‌کند.
- اگر راهنمای ستون فقط `steps` داشته باشد، خود گروه مرحلهٔ اضافه نمی‌سازد. اگر `description` هم داشته باشد، ابتدا یک مرحلهٔ معرفی ستون با `id` والد ساخته می‌شود؛ اولویت‌های صریح می‌توانند آن را جابه‌جا کنند.
- `status: "inactive"` تمام مراحل همان ستون را کنار می‌گذارد.
- مرحلهٔ داخلیِ بدون `target`، عنوان و محتوای همان ستون در ردیف اول را برجسته می‌کند؛ عنوان از ستون می‌آید مگر `title` مرحله مشخص شده باشد. برای گزینهٔ منو حتماً هدف `list.row.action.<key>` یا `list.bulk.action.<key>` را بنویسید.
- شناسهٔ تمام **مراحل نهایی**، بین همهٔ ستون‌ها و مراحل سراسری، باید یکتا باشد. حداکثر ۵۰ مرحله پس از ترکیب مجاز است؛ شناسهٔ تکراری یا عبور از سقف، راهنمای ترکیب‌شده را نامعتبر می‌کند. حذف مراحل اختیاری این محدودیت را دور نمی‌زند.
- متن توضیح حداکثر ۲۰۰۰ و عنوان حداکثر ۲۰۰ کاراکتر است؛ همه متن ساده‌اند. `target` نام منطقی است، نه selector یا کد اجرایی.

برای توضیح چندمرحله‌ای یک ستون معمولی هم می‌توانید از همین شکل استفاده کنید:

```js
guide: {
  status: "active", id: "route-info", priority: 20,
  steps: [
    {id: "route-cities", description: "مبدأ و مقصد را کنار هم بخوانید."},
    {id: "route-airports", description: "کد فرودگاه‌ها را با مسیر موردنظر تطبیق دهید."}
  ]
}
```

| نشانه | محل و معنی |
| --- | --- |
| `data-grid-actions="row"` | ریشهٔ منوی یک ردیف؛ برای گروهی مقدار `bulk`. |
| `data-grid-action-trigger="row"` | دکمهٔ بازکنندهٔ همان منو؛ برای گروهی مقدار `bulk`. |
| `data-grid-action-menu` | ظرف گزینه‌های منو؛ حتی وقتی منو بسته است در DOM باشد. |
| `data-grid-action="edit"` | روی خود گزینه؛ شناسهٔ پایدار ویرایش. برای نمونه `disable` و `delete` هم مجازند. |

کلید اکشن ۱ تا ۸۰ کاراکتر از حروف لاتین، عدد، `_` یا `-` است. در هر منو یکتا باشد، ولی بین ردیف‌ها تکرار می‌شود. ترجمهٔ عنوان نباید کلید را تغییر دهد. `edit` فقط نام است، دستور اجرای ویرایش نیست؛ دسترسی و مجوز همچنان باید در برنامه و سرور کنترل شوند.

## HTML ردیف

در HTML موجود فقط `data-*`ها را اضافه کنید؛ کلاس و `onclick`های برنامه را حفظ کنید. مثال زیر از ساختار `Flight-RouteList.html` پیروی می‌کند:

```js
operation: {
  title: bulkMenuHtml, // نمونهٔ گروهی در بخش بعد
  sort: false,
  filter: false,
  cellMaker: (row, data, td) => `
    <div class="iconContainer iconsOperations" data-grid-actions="row">
      <button type="button" class="icon"
        data-grid-action-trigger="row" aria-label="عملیات مسیر"
        onclick="onClickShowMoreActions(this)">...</button>
      <div class="iconsDetail" data-grid-action-menu>
        <button type="button" class="iconItem edit" data-grid-action="edit"
          onclick="editObject(this,event,'${row.id}',43)">ویرایش</button>
        <button type="button" class="iconItem remove" data-grid-action="disable"
          onclick="desableObject(this,event,'${row.id}','${row.enable}')">غیرفعال</button>
        <button type="button" class="iconItem remove" data-grid-action="delete"
          onclick="removeObject(this,event,'${row.id}')">حذف</button>
      </div>
    </div>`
}
```

این مثال handlerهای پروژه را فرض می‌کند، نه توابع داخلی گرید. برای دادهٔ غیرقابل‌اعتماد، مقادیر را متناسب با محل HTML/JavaScript escape کنید؛ راهنما HTML برنامه را امن‌سازی نمی‌کند. برای ساخت نمونهٔ مستقل از توابع نمایشی و دادهٔ ثابت استفاده کنید.

برای کد جدید، دکمهٔ `type="button"` انتخاب مناسب عملیات است. در ویجت قدیمی می‌توان `<a>` و handler موجود را نگه داشت؛ اصلاح دسترس‌پذیری آن نباید به اجرای عملیات توسط راهنما وابسته شود. از `id` تکراری برای target استفاده نکنید؛ قرارداد به `id` نیاز ندارد.

## HTML گروهی

```js
const bulkMenuHtml = `
  <div class="iconsOperations" data-grid-actions="bulk">
    <button type="button" class="icon" data-grid-action-trigger="bulk"
      aria-label="عملیات گروهی" onclick="onClickShowMoreActions(this)">...</button>
    <div class="iconsDetail" data-grid-action-menu>
      <button type="button" class="iconItem" data-grid-action="delete"
        onclick="showModal('removeTextPage')">حذف گروهی</button>
    </div>
  </div>`;
```

در دسکتاپ این HTML در سرستون است. موبایل آن را در نوار انتخاب گروهی استفاده می‌کند؛ این نوار تنها با انتخاب واقعی کاربر در دسترس است. راهنما برای ظاهرکردنش هیچ ردیفی انتخاب نمی‌کند. پس مرحلهٔ گروهی معمولاً `optional: true` است.

## JSON آموزش

```json
{
  "schemaVersion": 2,
  "id": 1001,
  "lid": 1,
  "revision": 1,
  "title": "راهنمای مسیرها",
  "steps": [
    {
      "id": "route-edit",
      "target": "list.row.action.edit",
      "title": "ویرایش مسیر",
      "description": "این گزینه فرم ویرایش همین مسیر را باز می‌کند. اینجا فقط پیش‌نمایش منو نمایش داده می‌شود.",
      "optional": true
    },
    {
      "id": "route-disable",
      "target": "list.row.action.disable",
      "title": "غیرفعال کردن مسیر",
      "description": "وضعیت مسیر را تغییر می‌دهد و با حذف تفاوت دارد.",
      "optional": true
    },
    {
      "id": "route-delete",
      "target": "list.row.action.delete",
      "title": "حذف مسیر",
      "description": "پیش از تأیید حذف، مشخصات همین مسیر را بررسی کنید.",
      "optional": true
    },
    {
      "id": "routes-delete",
      "target": "list.bulk.action.delete",
      "title": "حذف گروهی",
      "description": "این عملیات روی ردیف‌های انتخاب‌شده اعمال می‌شود، نه فقط ردیف اول.",
      "optional": true
    }
  ]
}
```

این JSON شکل سراسریِ همچنان پشتیبانی‌شده در `options.guide` است؛ همان مراحل را می‌توان در `columns.operation.guide.steps` تعریف کرد. یک مرحله را در هر دو محل تکرار نکنید. عدد ۱۰۰۱ نمونه است؛ شناسهٔ واقعی را در رجیستری آموزش‌های تیم رزرو کنید. `id` و `lid` عدد صحیح مثبت‌اند؛ `step.id` رشتهٔ یکتا در همان آموزش است. هنگام تغییر محتوای منتشرشده `revision` را افزایش دهید. متن‌ها plain text هستند و HTML یا selector داخل JSON اجرا نمی‌شود.

| هدف | رفتار |
| --- | --- |
| `list.row.action.<key>` | گزینهٔ همان کلید در منوی **اولین ردیف فعلی**؛ بعد از فیلتر/مرتب‌سازی/صفحه‌بندی. |
| `list.bulk.action.<key>` | گزینهٔ عملیات گروهی در همین گرید و نمای فعلی. |
| `list.row.actions` | هدف قدیمی برای خود سه‌نقطه؛ پیش‌نمایش گزینهٔ خاص ندارد. |
| `list.bulk.menu` | هدف قدیمی برای بازکنندهٔ منوی گروهی. |

مراحل همهٔ ستون‌های فعال و **تمام** مراحل `options.guide.steps` با هم ترکیب و طبق قواعد `priority` مرتب می‌شوند. برخلاف رفتار قبلی، وجود راهنمای ستون دیگر مرحله‌های سراسری غیرِاکشن مثل جستجو یا `page.create` را حذف نمی‌کند. این تغییر عمدی است تا آموزش اجزای لیست و آموزش ستون‌ها کنار هم قابل‌تعریف باشند.

## ایمنی و چرخهٔ نمایش

- راهنما منوی واقعی را کلیک یا جابه‌جا نمی‌کند؛ یک کپیِ نمایشی و غیرتعاملی از HTML منو در لایهٔ راهنما می‌سازد.
- handlerها، لینک‌های قابل‌اجرا، شناسه‌ها و عناصر اجرایی از کپی برداشته می‌شوند؛ listenerهای ثبت‌شده با JavaScript نیز clone نمی‌شوند.
- کپی `inert` و از مسیر Tab خارج است؛ شرح گزینه در پنجرهٔ دسترس‌پذیر راهنما خوانده می‌شود.
- انتخاب، داده، فیلتر و درخواست API تغییر نمی‌کنند. بازشدن dialog یا اسکرول ممکن است منوی از قبل باز را طبق رفتار عادی popover/ویجت ببندد؛ راهنما برای بازگردانی آن handler فراخوانی نمی‌کند. «بعدی»، «قبلی»، Escape، پایان، لغو و dispose کپی را پاک می‌کنند.
- کلاس‌ها و آیکون‌های HTML حفظ می‌شوند، ولی موقعیت‌دهی منوی نمایشی توسط راهنما کنترل می‌شود تا در صفحه بماند. CSS وابسته به ancestorهای خاص صفحه ممکن است روی کپی اعمال نشود؛ به کلاس‌های خود منو و گزینه تکیه کنید.
- گزینهٔ بدون مجوز را اصلاً رندر نکنید یا روی خود گزینه/والد داخلی آن `hidden` بگذارید. بسته‌بودن ظرف اصلی منو با مخفی‌بودن گزینه متفاوت است.
- `optional: true` گزینهٔ غایب را حذف می‌کند؛ بدون آن مرحله با پیام در دسترس نبودن ادامه می‌یابد. در اولین ردیفِ بدون این اکشن، سراغ ردیف دیگری نمی‌رود.
- این قرارداد منوی هم‌زمانِ موجود در DOM می‌خواهد؛ منوهای lazy/portal بیرون گرید و منوهای تو‌در‌تو بخشی از قرارداد نیستند.

## نمونه و چک‌لیست تیم

[نمونهٔ مستقل](../../wwwroot/component/configuration/mobileDesign/action-guides.html) روی سرور توسعه:
`http://localhost:18477/component/configuration/mobileDesign/action-guides.html`.
با دکمهٔ «موبایل» همان داده و HTML در نمای موبایل اجرا می‌شود. برای مرحلهٔ گروهی ابتدا چند ردیف را واقعاً انتخاب کنید، سپس «راهنما» را بزنید.

قبل از تحویل ویجت بررسی کنید:

- بازکردن سه‌نقطه و عملیات واقعی خارج از آموزش همان رفتار قبل را دارند.
- در آموزش، شبکه و handler عملیات اجرا نمی‌شوند و انتخاب‌ها ثابت‌اند.
- فیلتر، صفحهٔ خالی، تغییر صفحه و ردیف بدون مجوز درست رفتار می‌کنند.
- کلیدهای HTML با JSON یکی‌اند؛ عنوان ترجمه شده ولی کلید ثابت است.
- دسکتاپ، موبایل، Escape، قبلی/بعدی و reset بررسی شده‌اند.

ویجت مرجع پنل: `panelserviceup/frontend/Flight-RouteList.html`. فعال‌سازی این رفتار نیازمند build جدید همین کامپوننت و `culture.template: "template4"` است؛ صرف افزودن attribute به یک bundle قدیمی کافی نیست. تنظیم template ویجت مرجع را صرفاً برای این مستندات عوض نکرده‌ایم.
