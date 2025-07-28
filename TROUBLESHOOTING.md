# 🔧 دليل استكشاف الأخطاء - عقارات أسيوط

## 🚨 المشاكل الشائعة وحلولها

### **1. خطأ "خطأ في الاتصال بالإنترنت"**

#### **المشكلة:**
```
خطأ في الاتصال بالإنترنت يرجى المحاولة لاحقا
```

#### **الأسباب المحتملة:**
1. الباك إند لا يعمل
2. مشكلة في إعدادات CORS
3. مشكلة في شهادة SSL
4. البورت مشغول

#### **الحلول:**

##### **الحل الأول: التحقق من تشغيل الباك إند**
```bash
# تحقق من البورت 5257
netstat -ano | findstr :5257

# تحقق من البورت 7211
netstat -ano | findstr :7211
```

##### **الحل الثاني: إعادة تشغيل الباك إند**
```bash
cd AqaraatAPI
dotnet run --launch-profile http
```

##### **الحل الثالث: اختبار الاتصال**
1. افتح المتصفح: `http://localhost:8081/test-connection`
2. اضغط على "بدء اختبار الاتصال"
3. راجع النتائج

### **2. مشكلة CORS**

#### **المشكلة:**
```
Access to fetch at 'http://localhost:5257/api/Property' from origin 'http://localhost:8081' has been blocked by CORS policy
```

#### **الحل:**
تحديث إعدادات CORS في `AqaraatAPI/Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://localhost:8081", "http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:8081")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});
```

### **3. مشكلة شهادة SSL**

#### **المشكلة:**
```
Failed to fetch: net::ERR_CERT_AUTHORITY_INVALID
```

#### **الحل:**
استخدام HTTP بدلاً من HTTPS:
```typescript
// في AqaraatFront/src/lib/api.ts
const API_BASE_URL = 'http://localhost:5257/api';
```

### **4. البورت مشغول**

#### **المشكلة:**
```
Failed to bind to address https://127.0.0.1:7211: address already in use
```

#### **الحل:**
```bash
# إيقاف العملية المشغلة للبورت
netstat -ano | findstr :7211
taskkill /PID [PID_NUMBER] /F

# أو استخدام بورت مختلف
dotnet run --launch-profile http
```

## 🔍 خطوات التشخيص

### **الخطوة 1: التحقق من حالة الخدمات**
```bash
# الباك إند
netstat -ano | findstr :5257
netstat -ano | findstr :7211

# الفرونت إند
netstat -ano | findstr :8081
```

### **الخطوة 2: اختبار الاتصال**
1. افتح: `http://localhost:8081/test-connection`
2. اضغط على "بدء اختبار الاتصال"
3. راجع النتائج

### **الخطوة 3: اختبار Swagger**
1. افتح: `https://localhost:7211/swagger`
2. جرب API endpoints

### **الخطوة 4: فحص Console**
1. افتح Developer Tools (F12)
2. انتقل إلى Console
3. ابحث عن أخطاء CORS أو Network

## 🛠 إصلاحات سريعة

### **إعادة تشغيل كامل:**
```bash
# 1. إيقاف جميع الخدمات
taskkill /F /IM dotnet.exe
taskkill /F /IM node.exe

# 2. تشغيل الباك إند
cd AqaraatAPI
dotnet run --launch-profile http

# 3. تشغيل الفرونت إند
cd AqaraatFront
npm run dev
```

### **مسح Cache:**
```bash
# مسح cache الفرونت إند
cd AqaraatFront
rm -rf node_modules package-lock.json
npm install
npm run dev

# مسح cache الباك إند
cd AqaraatAPI
dotnet clean
dotnet build
dotnet run
```

## 📱 اختبار الميزات

### **اختبار إضافة عقار:**
1. افتح: `http://localhost:8081`
2. سجل دخول
3. اذهب إلى "إضافة عقار"
4. املأ النموذج
5. ارفع صور وفيديوهات
6. اضغط "إضافة العقار"

### **اختبار عرض العقارات:**
1. اذهب إلى "البحث عن عقار"
2. اختر نوع العقار
3. اختر المنطقة
4. راجع العقارات المعروضة

## 🔧 إعدادات التطوير

### **الباك إند:**
- **HTTP:** `http://localhost:5257`
- **HTTPS:** `https://localhost:7211`
- **Swagger:** `https://localhost:7211/swagger`

### **الفرونت إند:**
- **التطبيق:** `http://localhost:8081`
- **API Base:** `http://localhost:5257/api`

### **قاعدة البيانات:**
- **SQL Server:** `DESKTOP-HSN9573\SQLEXPRESS`
- **Database:** `AsuitAqaarDB`

## 📞 الدعم

إذا لم تحل المشكلة:

1. **تحقق من Console** في المتصفح
2. **راجع Logs** في الباك إند
3. **اختبر الاتصال** عبر صفحة الاختبار
4. **تواصل مع الدعم** مع تفاصيل الخطأ

### **معلومات مفيدة:**
- **نظام التشغيل:** Windows 10
- **Node.js:** 18+
- **.NET:** 8.0
- **المتصفح:** Chrome/Firefox/Edge

---

**تم إنشاء هذا الدليل لمساعدتك في حل المشاكل بسرعة! 🚀** 