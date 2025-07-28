# دليل نشر عقارات أسيوط API

## 🚀 طرق النشر

### 1. النشر المحلي (Local Deployment)

#### المتطلبات
- .NET 9.0 SDK
- SQL Server
- Visual Studio 2022 أو VS Code

#### خطوات النشر
```bash
# 1. استنسخ المشروع
git clone <repository-url>
cd AqaraatAPI

# 2. تثبيت الحزم
dotnet restore

# 3. إنشاء قاعدة البيانات
dotnet ef database update

# 4. تشغيل المشروع
dotnet run
```

### 2. النشر باستخدام Docker

#### المتطلبات
- Docker Desktop
- Docker Compose

#### خطوات النشر
```bash
# 1. استنسخ المشروع
git clone <repository-url>
cd AqaraatAPI

# 2. تشغيل المشروع باستخدام Docker Compose
docker-compose up -d

# 3. إنشاء قاعدة البيانات (في المرة الأولى فقط)
docker-compose exec api dotnet ef database update
```

### 3. النشر على Azure

#### المتطلبات
- Azure Account
- Azure CLI
- .NET 9.0 SDK

#### خطوات النشر
```bash
# 1. تسجيل الدخول إلى Azure
az login

# 2. إنشاء مجموعة الموارد
az group create --name aqaraat-rg --location eastus

# 3. إنشاء خادم SQL
az sql server create \
  --name aqaraat-sql-server \
  --resource-group aqaraat-rg \
  --location eastus \
  --admin-user sqladmin \
  --admin-password YourStrong@Passw0rd

# 4. إنشاء قاعدة البيانات
az sql db create \
  --resource-group aqaraat-rg \
  --server aqaraat-sql-server \
  --name AsuitAqaarDB

# 5. إنشاء App Service
az appservice plan create \
  --name aqaraat-plan \
  --resource-group aqaraat-rg \
  --sku B1

az webapp create \
  --name aqaraat-api \
  --resource-group aqaraat-rg \
  --plan aqaraat-plan \
  --runtime "DOTNETCORE:9.0"

# 6. نشر التطبيق
az webapp deployment source config-zip \
  --resource-group aqaraat-rg \
  --name aqaraat-api \
  --src ./publish.zip
```

### 4. النشر على AWS

#### المتطلبات
- AWS Account
- AWS CLI
- .NET 9.0 SDK

#### خطوات النشر
```bash
# 1. تكوين AWS CLI
aws configure

# 2. إنشاء RDS Instance
aws rds create-db-instance \
  --db-instance-identifier aqaraat-db \
  --db-instance-class db.t3.micro \
  --engine sqlserver-se \
  --master-username admin \
  --master-user-password YourStrong@Passw0rd \
  --allocated-storage 20

# 3. نشر على Elastic Beanstalk
eb init aqaraat-api --platform dotnet-core --region us-east-1
eb create aqaraat-api-env
eb deploy
```

## 🔧 إعدادات البيئة

### متغيرات البيئة المطلوبة
```bash
# قاعدة البيانات
ConnectionStrings__db=Server=your-server;Database=AsuitAqaarDB;User Id=your-user;Password=your-password;TrustServerCertificate=true;

# JWT Settings
JwtSettings__SecretKey=your-super-secret-key-with-at-least-32-characters-long
JwtSettings__Issuer=AqarAPI
JwtSettings__Audience=AqarUsers
JwtSettings__ExpirationInMinutes=60

# البيئة
ASPNETCORE_ENVIRONMENT=Production
```

### إعدادات CORS
```csharp
// في Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

## 🔒 الأمان

### 1. حماية قاعدة البيانات
- استخدام كلمات مرور قوية
- تشفير الاتصالات (SSL/TLS)
- تقييد الوصول بالشبكة

### 2. حماية API
- استخدام HTTPS
- تشفير JWT Tokens
- Rate Limiting
- Input Validation

### 3. مراقبة الأمان
- تسجيل الأحداث
- مراقبة الاستخدام غير العادي
- تحديثات الأمان المنتظمة

## 📊 المراقبة والتحليلات

### 1. Application Insights
```csharp
// في Program.cs
builder.Services.AddApplicationInsightsTelemetry();
```

### 2. Logging
```csharp
// في appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

### 3. Health Checks
```csharp
// في Program.cs
builder.Services.AddHealthChecks()
    .AddSqlServer(Configuration.GetConnectionString("db"));
```

## 🔄 النسخ الاحتياطي

### 1. قاعدة البيانات
```bash
# نسخ احتياطي يومي
sqlcmd -S your-server -d AsuitAqaarDB -Q "BACKUP DATABASE AsuitAqaarDB TO DISK = 'C:\backup\aqaraat_$(Get-Date -Format 'yyyyMMdd').bak'"
```

### 2. الملفات
```bash
# نسخ احتياطي للصور والفيديوهات
robocopy C:\uploads C:\backup\uploads /MIR
```

## 🚨 استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### 1. خطأ في الاتصال بقاعدة البيانات
```bash
# التحقق من الاتصال
sqlcmd -S your-server -U your-user -P your-password -Q "SELECT 1"
```

#### 2. خطأ في JWT Token
```bash
# التحقق من إعدادات JWT
curl -H "Authorization: Bearer your-token" http://localhost:5257/api/property
```

#### 3. خطأ في CORS
```bash
# التحقق من إعدادات CORS
curl -H "Origin: http://localhost:3000" http://localhost:5257/api/property
```

## 📞 الدعم

للحصول على الدعم أو الإبلاغ عن مشاكل:
- البريد الإلكتروني: support@aqaraat-asuit.com
- رقم الهاتف: 01153490204
- GitHub Issues: [رابط المشروع]

---

**تم تطوير هذا الدليل بواسطة فريق عقارات أسيوط** 🏠✨ 