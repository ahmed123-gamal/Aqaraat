# ملخص مشروع عقارات أسيوط - Backend API

## 🎯 نظرة عامة
تم تطوير الباك إند لبرنامج عقارات أسيوط بنجاح باستخدام .NET 9.0 و Entity Framework Core. المشروع جاهز للاستخدام ويمكن ربطه بالفرونت إند مباشرة.

## ✅ ما تم إنجازه

### 1. هيكل المشروع
- ✅ إنشاء مشروع .NET Web API
- ✅ إعداد قاعدة البيانات SQL Server
- ✅ تكوين Entity Framework Core
- ✅ إعداد JWT Authentication
- ✅ إعداد AutoMapper
- ✅ إعداد Swagger/OpenAPI

### 2. النماذج (Models)
- ✅ User (المستخدم)
- ✅ Property (العقار)
- ✅ PropertyImage (صور العقار)
- ✅ PropertyVideo (فيديوهات العقار)
- ✅ StudentRequest (طلب الطالب)

### 3. الخدمات (Services)
- ✅ JwtService (خدمة JWT)
- ✅ AuthService (خدمة المصادقة)
- ✅ PropertyService (خدمة العقارات)
- ✅ StudentRequestService (خدمة طلبات الطلاب)

### 4. Controllers
- ✅ AuthController (المصادقة)
- ✅ PropertyController (العقارات)
- ✅ StudentRequestController (طلبات الطلاب)

### 5. DTOs
- ✅ AuthDTOs (مصادقة)
- ✅ PropertyDTOs (عقارات)
- ✅ StudentRequestDTOs (طلبات الطلاب)

### 6. قاعدة البيانات
- ✅ إنشاء قاعدة البيانات AsuitAqaarDB
- ✅ إنشاء جميع الجداول
- ✅ إعداد العلاقات بين الجداول
- ✅ إنشاء الفهارس

## 🚀 كيفية تشغيل المشروع

### المتطلبات
- .NET 9.0 SDK
- SQL Server
- Visual Studio 2022 أو VS Code

### خطوات التشغيل
```bash
# 1. الانتقال إلى مجلد المشروع
cd AqaraatAPI

# 2. تثبيت الحزم
dotnet restore

# 3. إنشاء قاعدة البيانات
dotnet ef database update

# 4. تشغيل المشروع
dotnet run
```

### الوصول إلى API
- Swagger UI: http://localhost:5257/swagger
- API Base URL: http://localhost:5257/api

## 📋 API Endpoints المتاحة

### المصادقة
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `POST /api/auth/login` - تسجيل الدخول

### العقارات
- `POST /api/property` - إنشاء عقار جديد
- `GET /api/property/{id}` - الحصول على عقار محدد
- `GET /api/property/search` - البحث في العقارات
- `GET /api/property/areas` - الحصول على المناطق
- `GET /api/property/areas/{area}/subareas` - الحصول على المناطق الفرعية
- `GET /api/property/types` - الحصول على أنواع العقارات
- `GET /api/property/categories` - الحصول على فئات العقارات

### طلبات الطلاب
- `POST /api/studentrequest` - إنشاء طلب طالب جديد
- `GET /api/studentrequest/{id}` - الحصول على طلب طالب محدد
- `GET /api/studentrequest/search` - البحث في طلبات الطلاب
- `PUT /api/studentrequest/{id}/status` - تحديث حالة طلب الطالب
- `GET /api/studentrequest/colleges` - الحصول على الكليات
- `GET /api/studentrequest/areas` - الحصول على المناطق
- `GET /api/studentrequest/statuses` - الحصول على حالات الطلبات

## 🗺️ المناطق المدعومة

### مناطق أسيوط
- الايمان، الزهراء، الخميس، الهلالى، فريال
- صلاح سالم، الوديه، المعلمين، الاربعين
- المحكمه، الناصرية، الحمراء، شارع سيد
- موقف الازهر، نزله عبدالله، منقباد

### مراكز أسيوط
- ديروط، اسيوط الجديده، البدارى، ساحل سليم
- الغنائم، ابو تيج، صدفا، الفتح
- منفلوط، ابنوب، القوصيه

## 💰 نظام الرسوم
- تأجير العقار: 15% من قيمة الإيجار الشهري
- البيع أو الشراء: 0.25% من قيمة البيع
- تأجير مكاتب إدارية: 15% من قيمة الإيجار
- للطلاب: 100 جنيه فقط عند استلام الشقة

## 🔒 الميزات الأمنية
- ✅ JWT Authentication
- ✅ تشفير كلمات المرور
- ✅ حماية البيانات
- ✅ CORS Configuration
- ✅ Input Validation

## 📁 الملفات المهمة

### ملفات التكوين
- `appsettings.json` - إعدادات التطبيق
- `Program.cs` - إعداد الخدمات
- `ApplicationDbContext.cs` - إعداد قاعدة البيانات

### ملفات النماذج
- `Models/User.cs` - نموذج المستخدم
- `Models/Property.cs` - نموذج العقار
- `Models/StudentRequest.cs` - نموذج طلب الطالب

### ملفات الخدمات
- `Services/JwtService.cs` - خدمة JWT
- `Services/AuthService.cs` - خدمة المصادقة
- `Services/PropertyService.cs` - خدمة العقارات
- `Services/StudentRequestService.cs` - خدمة طلبات الطلاب

### ملفات Controllers
- `Controllers/AuthController.cs` - controller المصادقة
- `Controllers/PropertyController.cs` - controller العقارات
- `Controllers/StudentRequestController.cs` - controller طلبات الطلاب

## 🐳 Docker Support
- ✅ Dockerfile جاهز
- ✅ docker-compose.yml جاهز
- ✅ يمكن النشر باستخدام Docker

## 📚 التوثيق
- ✅ README.md شامل
- ✅ DEPLOYMENT.md دليل النشر
- ✅ Postman Collection جاهز
- ✅ Swagger UI متاح

## 🔄 الخطوات التالية

### للربط مع الفرونت إند
1. تأكد من أن الفرونت إند يستخدم نفس API endpoints
2. قم بتحديث base URL في الفرونت إند إلى `http://localhost:5257/api`
3. استخدم JWT token للمصادقة في الطلبات المحمية

### للنشر على الخادم
1. اتبع دليل النشر في `DEPLOYMENT.md`
2. قم بتحديث connection string لقاعدة البيانات
3. قم بتحديث JWT secret key
4. قم بتكوين CORS للفرونت إند

## 📞 الدعم
- البريد الإلكتروني: support@aqaraat-asuit.com
- رقم الهاتف: 01153490204

---

**تم تطوير هذا المشروع بواسطة فريق عقارات أسيوط** 🏠✨

**الحالة: ✅ مكتمل وجاهز للاستخدام** 