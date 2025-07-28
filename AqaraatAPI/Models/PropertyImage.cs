using System.ComponentModel.DataAnnotations;

namespace AqaraatAPI.Models
{
    public enum ImageType
    {
        Main,           // صورة رئيسية
        Exterior,       // خارجية
        Interior,       // داخلية
        Kitchen,        // مطبخ
        Bathroom,       // حمام
        Bedroom,        // غرفة نوم
        LivingRoom,     // صالة
        Balcony,        // بلكونة
        Parking,        // موقف سيارات
        Garden,         // حديقة
        Terrace,        // تراس
        View,           // إطلالة
        Other           // أخرى
    }

    public class PropertyImage
    {
        public int Id { get; set; }
        
        [Required]
        public string ImageUrl { get; set; } = string.Empty;
        
        public string? Caption { get; set; }
        
        public ImageType Type { get; set; } = ImageType.Other;
        
        public bool IsMain { get; set; } = false;
        
        public int? OrderIndex { get; set; } // ترتيب الصورة
        
        public string? AltText { get; set; } // نص بديل للصورة
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation Properties
        public int PropertyId { get; set; }
        public virtual Property Property { get; set; } = null!;
    }
} 