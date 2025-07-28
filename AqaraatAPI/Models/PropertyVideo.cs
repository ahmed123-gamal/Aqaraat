using System.ComponentModel.DataAnnotations;

namespace AqaraatAPI.Models
{
    public enum VideoType
    {
        Main,           // فيديو رئيسي
        Tour,           // جولة شاملة
        Exterior,       // خارجي
        Interior,       // داخلي
        Kitchen,        // مطبخ
        Bathroom,       // حمام
        Bedroom,        // غرفة نوم
        LivingRoom,     // صالة
        Balcony,        // بلكونة
        Parking,        // موقف سيارات
        Garden,         // حديقة
        Terrace,        // تراس
        View,           // إطلالة
        Neighborhood,   // الحي المحيط
        Other           // أخرى
    }

    public class PropertyVideo
    {
        public int Id { get; set; }
        
        [Required]
        public string VideoUrl { get; set; } = string.Empty;
        
        public string? Caption { get; set; }
        
        public VideoType Type { get; set; } = VideoType.Other;
        
        public bool IsMain { get; set; } = false;
        
        public int? OrderIndex { get; set; } // ترتيب الفيديو
        
        public string? ThumbnailUrl { get; set; } // صورة مصغرة للفيديو
        
        public int? Duration { get; set; } // مدة الفيديو بالثواني
        
        public string? AltText { get; set; } // نص بديل للفيديو
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation Properties
        public int PropertyId { get; set; }
        public virtual Property Property { get; set; } = null!;
    }
} 