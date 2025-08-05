using AqaraatAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AqaraatAPI.Data
{
    public static class SeedData
    {
        public static async Task SeedPropertiesAsync(ApplicationDbContext context)
        {
            if (await context.Properties.AnyAsync())
                return;

            // إنشاء مستخدم افتراضي إذا لم يكن موجود
            var defaultUser = await context.Users.FirstOrDefaultAsync();
            if (defaultUser == null)
            {
                defaultUser = new User
                {
                    Name = "مستخدم افتراضي",
                    Email = "default@aqaraat.com",
                    PhoneNumber = "01000000000",
                    PasswordHash = "default_hash",
                    CreatedAt = DateTime.UtcNow
                };
                context.Users.Add(defaultUser);
                await context.SaveChangesAsync();
            }

            var properties = new List<Property>
            {
                new Property
                {
                    Title = "شقة مميزة للطلاب في القيسارية",
                    Description = "شقة حديثة ومفروشة بالكامل، مناسبة للطلاب، قريبة من الجامعة، تحتوي على جميع الخدمات الأساسية",
                    Price = 2500,
                    Type = PropertyType.StudentRent,
                    Category = PropertyCategory.Apartment,
                    Area = "القيسارية",
                    SubArea = "شارع الجامعة",
                    NumberOfRooms = 3,
                    NumberOfBathrooms = 2,
                    NumberOfLivingRooms = 1,
                    NumberOfKitchens = 1,
                    AreaSize = 120,
                    FloorNumber = 2,
                    TotalFloors = 5,
                    HasElevator = true,
                    HasParking = true,
                    HasBalcony = true,
                    HasAirConditioning = true,
                    HasInternet = true,
                    HasFurniture = true,
                    HasSecurity = true,
                    DistanceFromUniversity = 0.5m,
                    RequiredStudentsCount = 3,
                    IsMixed = true,
                    UserId = defaultUser.Id,
                    Status = PropertyStatus.Available,
                    CreatedAt = DateTime.UtcNow.AddDays(-10),
                    UpdatedAt = DateTime.UtcNow.AddDays(-5)
                },
                new Property
                {
                    Title = "فيلا فاخرة للعائلات في الجمهورية",
                    Description = "فيلا حديثة ومتطورة، مناسبة للعائلات الكبيرة، تحتوي على حديقة خاصة وموقف سيارات",
                    Price = 8000,
                    Type = PropertyType.FamilyRent,
                    Category = PropertyCategory.Villa,
                    Area = "الجمهورية",
                    SubArea = "شارع النيل",
                    NumberOfRooms = 5,
                    NumberOfBathrooms = 4,
                    NumberOfLivingRooms = 2,
                    NumberOfKitchens = 2,
                    AreaSize = 300,
                    FloorNumber = 1,
                    TotalFloors = 2,
                    HasElevator = false,
                    HasParking = true,
                    HasBalcony = true,
                    HasGarden = true,
                    HasTerrace = true,
                    HasAirConditioning = true,
                    HasHeating = true,
                    HasInternet = true,
                    HasSatellite = true,
                    HasFurniture = true,
                    HasAppliances = true,
                    HasSecurity = true,
                    HasCCTV = true,
                    HasGuard = true,
                    DistanceFromCityCenter = 2.0m,
                    UserId = defaultUser.Id,
                    Status = PropertyStatus.Available,
                    CreatedAt = DateTime.UtcNow.AddDays(-15),
                    UpdatedAt = DateTime.UtcNow.AddDays(-8)
                },
                new Property
                {
                    Title = "شقة للبيع في الهلالي",
                    Description = "شقة مميزة للبيع في منطقة الهلالي، مناسبة للعائلات الصغيرة، قريبة من جميع الخدمات",
                    Price = 450000,
                    Type = PropertyType.Sale,
                    Category = PropertyCategory.Apartment,
                    Area = "الهلالي",
                    SubArea = "شارع السوق",
                    NumberOfRooms = 4,
                    NumberOfBathrooms = 3,
                    NumberOfLivingRooms = 1,
                    NumberOfKitchens = 1,
                    AreaSize = 150,
                    FloorNumber = 3,
                    TotalFloors = 6,
                    HasElevator = true,
                    HasParking = true,
                    HasBalcony = true,
                    HasAirConditioning = true,
                    HasInternet = true,
                    HasFurniture = false,
                    HasSecurity = true,
                    DistanceFromCityCenter = 1.5m,
                    UserId = defaultUser.Id,
                    Status = PropertyStatus.Available,
                    CreatedAt = DateTime.UtcNow.AddDays(-20),
                    UpdatedAt = DateTime.UtcNow.AddDays(-12)
                },
                new Property
                {
                    Title = "استوديو للطلاب في مساكن الأزهر",
                    Description = "استوديو صغير ومناسب للطلاب، مفروش بالكامل، قريب من الجامعة",
                    Price = 1800,
                    Type = PropertyType.StudentRent,
                    Category = PropertyCategory.Studio,
                    Area = "مساكن الأزهر",
                    SubArea = "شارع الكلية",
                    NumberOfRooms = 1,
                    NumberOfBathrooms = 1,
                    NumberOfLivingRooms = 1,
                    NumberOfKitchens = 1,
                    AreaSize = 45,
                    FloorNumber = 1,
                    TotalFloors = 4,
                    HasElevator = false,
                    HasParking = false,
                    HasBalcony = false,
                    HasAirConditioning = true,
                    HasInternet = true,
                    HasFurniture = true,
                    DistanceFromUniversity = 0.8m,
                    RequiredStudentsCount = 1,
                    IsMixed = true,
                    UserId = defaultUser.Id,
                    Status = PropertyStatus.Available,
                    CreatedAt = DateTime.UtcNow.AddDays(-7),
                    UpdatedAt = DateTime.UtcNow.AddDays(-3)
                },
                new Property
                {
                    Title = "مكتب تجاري للبيع في ميدان البنوك",
                    Description = "مكتب تجاري مميز في منطقة ميدان البنوك، مناسب للمحلات والمكاتب، موقع استراتيجي",
                    Price = 350000,
                    Type = PropertyType.Sale,
                    Category = PropertyCategory.Office,
                    Area = "ميدان البنوك",
                    SubArea = "شارع التجارة",
                    NumberOfRooms = 2,
                    NumberOfBathrooms = 1,
                    NumberOfLivingRooms = 1,
                    NumberOfKitchens = 0,
                    AreaSize = 80,
                    FloorNumber = 1,
                    TotalFloors = 3,
                    HasElevator = true,
                    HasParking = true,
                    HasBalcony = false,
                    HasAirConditioning = true,
                    HasInternet = true,
                    HasFurniture = false,
                    HasSecurity = true,
                    DistanceFromCityCenter = 1.0m,
                    UserId = defaultUser.Id,
                    Status = PropertyStatus.Available,
                    CreatedAt = DateTime.UtcNow.AddDays(-25),
                    UpdatedAt = DateTime.UtcNow.AddDays(-18)
                },
                new Property
                {
                    Title = "شقة عائلية في المعلمين",
                    Description = "شقة واسعة ومناسبة للعائلات، في منطقة هادئة ومميزة",
                    Price = 4000,
                    Type = PropertyType.FamilyRent,
                    Category = PropertyCategory.Apartment,
                    Area = "المعلمين",
                    SubArea = "شارع السلام",
                    NumberOfRooms = 4,
                    NumberOfBathrooms = 3,
                    NumberOfLivingRooms = 1,
                    NumberOfKitchens = 1,
                    AreaSize = 140,
                    FloorNumber = 2,
                    TotalFloors = 4,
                    HasElevator = true,
                    HasParking = true,
                    HasBalcony = true,
                    HasAirConditioning = true,
                    HasInternet = true,
                    HasFurniture = true,
                    HasSecurity = true,
                    DistanceFromCityCenter = 1.8m,
                    UserId = defaultUser.Id,
                    Status = PropertyStatus.Available,
                    CreatedAt = DateTime.UtcNow.AddDays(-12),
                    UpdatedAt = DateTime.UtcNow.AddDays(-6)
                },
                new Property
                {
                    Title = "فيلا للبيع في شارع سيد",
                    Description = "فيلا فاخرة للبيع في شارع سيد، موقع مميز وإطلالة رائعة",
                    Price = 1200000,
                    Type = PropertyType.Sale,
                    Category = PropertyCategory.Villa,
                    Area = "شارع سيد",
                    SubArea = "شارع النيل",
                    NumberOfRooms = 6,
                    NumberOfBathrooms = 5,
                    NumberOfLivingRooms = 2,
                    NumberOfKitchens = 2,
                    AreaSize = 400,
                    FloorNumber = 1,
                    TotalFloors = 3,
                    HasElevator = true,
                    HasParking = true,
                    HasBalcony = true,
                    HasGarden = true,
                    HasTerrace = true,
                    HasAirConditioning = true,
                    HasHeating = true,
                    HasInternet = true,
                    HasSatellite = true,
                    HasFurniture = true,
                    HasAppliances = true,
                    HasSecurity = true,
                    HasCCTV = true,
                    HasGuard = true,
                    DistanceFromCityCenter = 0.5m,
                    UserId = defaultUser.Id,
                    Status = PropertyStatus.Available,
                    CreatedAt = DateTime.UtcNow.AddDays(-18),
                    UpdatedAt = DateTime.UtcNow.AddDays(-10)
                }
            };

            context.Properties.AddRange(properties);
            await context.SaveChangesAsync();

            // إضافة صور افتراضية للعقارات
            var propertyImages = new List<PropertyImage>();
            var imageUrls = new List<string>
            {
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
            };

            var imageTypes = new List<ImageType>
            {
                ImageType.Main,
                ImageType.Exterior,
                ImageType.Interior,
                ImageType.LivingRoom,
                ImageType.Bedroom,
                ImageType.Kitchen,
                ImageType.Bathroom,
                ImageType.Balcony
            };

            foreach (var property in properties)
            {
                for (int i = 0; i < 4; i++) // 4 صور لكل عقار
                {
                    propertyImages.Add(new PropertyImage
                    {
                        ImageUrl = imageUrls[i % imageUrls.Count],
                        Caption = $"صورة {i + 1} - {property.Title}",
                        Type = imageTypes[i % imageTypes.Count],
                        IsMain = i == 0,
                        OrderIndex = i,
                        AltText = $"صورة {i + 1} للعقار {property.Title}",
                        PropertyId = property.Id,
                        CreatedAt = DateTime.UtcNow
                    });
                }
            }

            context.PropertyImages.AddRange(propertyImages);
            await context.SaveChangesAsync();
        }
    }
} 