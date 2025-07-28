# Aqaraat - عقارات أسيوط

تطبيق عقارات متكامل لطلاب جامعة أسيوط، مبني بـ React و .NET Core.

## 🚀 التشغيل السريع

### الطريقة الأولى: استخدام ملفات Batch
```bash
# لتشغيل الباك إند فقط
run-backend.bat

# لتشغيل الفرونت إند فقط  
run-frontend.bat

# لتشغيل كلا الخادمين معاً
run-both.bat
```

### الطريقة الثانية: التشغيل اليدوي

#### 1. تشغيل الباك إند
```bash
cd AqaraatAPI
dotnet run --urls "http://localhost:5257"
```

#### 2. تشغيل الفرونت إند
```bash
cd AqaraatFront
npm run dev
```

## 📍 الروابط المهمة

- **الفرونت إند**: http://localhost:8080
- **الباك إند API**: http://localhost:5257
- **Swagger UI**: http://localhost:5257/swagger

## 🛠️ المتطلبات

- .NET 8.0 SDK
- Node.js 18+ 
- SQL Server Express

## 📋 الميزات

### للملاك:
- إضافة عقارات جديدة
- رفع صور وفيديوهات للعقار
- تحديد السعر والمواصفات
- إدارة العقارات المضافة

### للطلاب:
- البحث عن عقارات
- تصفية حسب المنطقة والسعر
- إرسال طلبات استئجار
- متابعة حالة الطلبات

### APIs المتاحة:
- **Auth**: تسجيل دخول وتسجيل جديد
- **Property**: إدارة العقارات والبحث
- **StudentRequest**: طلبات الطلاب

## 🔧 إعداد قاعدة البيانات

```bash
cd AqaraatAPI
dotnet ef database update
```

## 📁 هيكل المشروع

```
Aqaraat/
├── AqaraatAPI/          # الباك إند (.NET Core)
│   ├── Controllers/     # API Controllers
│   ├── Models/         # Entity Models
│   ├── Services/       # Business Logic
│   └── Data/          # Database Context
├── AqaraatFront/       # الفرونت إند (React + Vite)
│   ├── src/
│   │   ├── pages/     # React Pages
│   │   ├── components/ # React Components
│   │   └── lib/       # API Client
└── run-*.bat          # ملفات التشغيل السريع
```

## 🐛 استكشاف الأخطاء

### إذا لم يعمل الباك إند:
1. تأكد من تشغيل SQL Server
2. تحقق من connection string في `appsettings.json`
3. قم بتشغيل `dotnet ef database update`

### إذا لم يعمل الفرونت إند:
1. تأكد من تثبيت Node.js
2. قم بتشغيل `npm install` في مجلد `AqaraatFront`
3. تحقق من أن البورت 8080 غير مستخدم

## 📞 الدعم

للمساعدة أو الإبلاغ عن مشاكل، يرجى التواصل مع فريق التطوير. 