using System.ComponentModel.DataAnnotations;

namespace AqaraatAPI.Models
{
    public enum PropertyType
    {
        Sale,           // بيع
        FamilyRent,     // إيجار سكن عائلي
        StudentRent     // إيجار سكن طلاب
    }

    public enum PropertyCategory
    {
        Apartment,      // شقة
        Office,         // مكتب
        Villa,          // فيلا
        Studio          // استوديو
    }

    public enum PropertyStatus
    {
        Available,      // متاح
        Rented,         // مؤجر
        Sold,           // مباع
        UnderMaintenance // تحت الصيانة
    }

    public class Property
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        public decimal Price { get; set; }
        
        [Required]
        public PropertyType Type { get; set; }
        
        [Required]
        public PropertyCategory Category { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Area { get; set; } = string.Empty; // المنطقة
        
        [Required]
        [StringLength(100)]
        public string SubArea { get; set; } = string.Empty; // المنطقة الفرعية
        
        // تفاصيل الشقة
        public int? NumberOfRooms { get; set; }
        public int? NumberOfBathrooms { get; set; }
        public int? NumberOfLivingRooms { get; set; }
        public int? NumberOfKitchens { get; set; }
        
        public decimal? AreaSize { get; set; } // المساحة بالمتر المربع
        public decimal? LivingRoomSize { get; set; } // مساحة الصالة
        public decimal? KitchenSize { get; set; } // مساحة المطبخ
        
        // تفاصيل المبنى
        public int? FloorNumber { get; set; }
        public int? TotalFloors { get; set; }
        public bool HasElevator { get; set; }
        public bool HasParking { get; set; }
        public bool HasBalcony { get; set; }
        public bool HasGarden { get; set; }
        public bool HasTerrace { get; set; }
        
        // الخدمات
        public bool HasAirConditioning { get; set; }
        public bool HasHeating { get; set; }
        public bool HasInternet { get; set; }
        public bool HasSatellite { get; set; }
        public bool HasFurniture { get; set; }
        public bool HasAppliances { get; set; } // أجهزة كهربائية
        
        // الأمان
        public bool HasSecurity { get; set; }
        public bool HasCCTV { get; set; }
        public bool HasGuard { get; set; }
        
        // الموقع
        public string? Address { get; set; }
        public string? Landmark { get; set; } // معلم قريب
        public decimal? DistanceFromUniversity { get; set; } // المسافة من الجامعة بالكيلومتر
        public decimal? DistanceFromCityCenter { get; set; } // المسافة من وسط المدينة
        
        // للطلاب فقط
        public int? RequiredStudentsCount { get; set; }
        public string? AllowedColleges { get; set; } // الكليات المسموح بها
        public bool IsFemaleOnly { get; set; } // للبنات فقط
        public bool IsMaleOnly { get; set; } // للشباب فقط
        public bool IsMixed { get; set; } // مختلط
        
        // حالة العقار
        public PropertyStatus Status { get; set; } = PropertyStatus.Available;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;
        
        // Navigation Properties
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
        
        public virtual ICollection<PropertyImage> Images { get; set; } = new List<PropertyImage>();
        public virtual ICollection<PropertyVideo> Videos { get; set; } = new List<PropertyVideo>();
    }
} 