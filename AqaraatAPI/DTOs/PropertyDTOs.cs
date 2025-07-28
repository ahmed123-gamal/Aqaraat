using System.ComponentModel.DataAnnotations;
using AqaraatAPI.Models;

namespace AqaraatAPI.DTOs
{
    public class CreatePropertyDTO
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }
        
        [Required]
        public PropertyType Type { get; set; }
        
        [Required]
        public PropertyCategory Category { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Area { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string SubArea { get; set; } = string.Empty;
        
        // تفاصيل الشقة
        public int? NumberOfRooms { get; set; }
        public int? NumberOfBathrooms { get; set; }
        public int? NumberOfLivingRooms { get; set; }
        public int? NumberOfKitchens { get; set; }
        
        public decimal? AreaSize { get; set; }
        public decimal? LivingRoomSize { get; set; }
        public decimal? KitchenSize { get; set; }
        
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
        public bool HasAppliances { get; set; }
        
        // الأمان
        public bool HasSecurity { get; set; }
        public bool HasCCTV { get; set; }
        public bool HasGuard { get; set; }
        
        // الموقع
        public string? Address { get; set; }
        public string? Landmark { get; set; }
        public decimal? DistanceFromUniversity { get; set; }
        public decimal? DistanceFromCityCenter { get; set; }
        
        // للطلاب فقط
        public int? RequiredStudentsCount { get; set; }
        public string? AllowedColleges { get; set; }
        public bool IsFemaleOnly { get; set; }
        public bool IsMaleOnly { get; set; }
        public bool IsMixed { get; set; }
        
        // الصور والفيديوهات
        public List<PropertyImageDTO> Images { get; set; } = new List<PropertyImageDTO>();
        public List<PropertyVideoDTO> Videos { get; set; } = new List<PropertyVideoDTO>();
    }

    public class PropertyImageDTO
    {
        public string ImageUrl { get; set; } = string.Empty;
        public string? Caption { get; set; }
        public ImageType Type { get; set; } = ImageType.Other;
        public bool IsMain { get; set; } = false;
        public int? OrderIndex { get; set; }
        public string? AltText { get; set; }
    }

    public class PropertyVideoDTO
    {
        public string VideoUrl { get; set; } = string.Empty;
        public string? Caption { get; set; }
        public VideoType Type { get; set; } = VideoType.Other;
        public bool IsMain { get; set; } = false;
        public int? OrderIndex { get; set; }
        public string? ThumbnailUrl { get; set; }
        public int? Duration { get; set; }
        public string? AltText { get; set; }
    }

    public class PropertyResponseDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public PropertyType Type { get; set; }
        public PropertyCategory Category { get; set; }
        public PropertyStatus Status { get; set; }
        public string Area { get; set; } = string.Empty;
        public string SubArea { get; set; } = string.Empty;
        
        // تفاصيل الشقة
        public int? NumberOfRooms { get; set; }
        public int? NumberOfBathrooms { get; set; }
        public int? NumberOfLivingRooms { get; set; }
        public int? NumberOfKitchens { get; set; }
        public decimal? AreaSize { get; set; }
        public decimal? LivingRoomSize { get; set; }
        public decimal? KitchenSize { get; set; }
        
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
        public bool HasAppliances { get; set; }
        
        // الأمان
        public bool HasSecurity { get; set; }
        public bool HasCCTV { get; set; }
        public bool HasGuard { get; set; }
        
        // الموقع
        public string? Address { get; set; }
        public string? Landmark { get; set; }
        public decimal? DistanceFromUniversity { get; set; }
        public decimal? DistanceFromCityCenter { get; set; }
        
        // للطلاب فقط
        public int? RequiredStudentsCount { get; set; }
        public string? AllowedColleges { get; set; }
        public bool IsFemaleOnly { get; set; }
        public bool IsMaleOnly { get; set; }
        public bool IsMixed { get; set; }
        
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string OwnerPhone { get; set; } = string.Empty;
        public string OwnerName { get; set; } = string.Empty;
        
        public List<PropertyImageResponseDTO> Images { get; set; } = new List<PropertyImageResponseDTO>();
        public List<PropertyVideoResponseDTO> Videos { get; set; } = new List<PropertyVideoResponseDTO>();
    }

    public class PropertyImageResponseDTO
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string? Caption { get; set; }
        public ImageType Type { get; set; }
        public bool IsMain { get; set; }
        public int? OrderIndex { get; set; }
        public string? AltText { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class PropertyVideoResponseDTO
    {
        public int Id { get; set; }
        public string VideoUrl { get; set; } = string.Empty;
        public string? Caption { get; set; }
        public VideoType Type { get; set; }
        public bool IsMain { get; set; }
        public int? OrderIndex { get; set; }
        public string? ThumbnailUrl { get; set; }
        public int? Duration { get; set; }
        public string? AltText { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class PropertySearchDTO
    {
        public PropertyType? Type { get; set; }
        public PropertyCategory? Category { get; set; }
        public PropertyStatus? Status { get; set; }
        public string? Area { get; set; }
        public string? SubArea { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public int? MinRooms { get; set; }
        public int? MaxRooms { get; set; }
        public int? MinBathrooms { get; set; }
        public int? MaxBathrooms { get; set; }
        public decimal? MinAreaSize { get; set; }
        public decimal? MaxAreaSize { get; set; }
        public int? FloorNumber { get; set; }
        public bool? HasElevator { get; set; }
        public bool? HasParking { get; set; }
        public bool? HasBalcony { get; set; }
        public bool? HasAirConditioning { get; set; }
        public bool? HasFurniture { get; set; }
        public bool? HasInternet { get; set; }
        public bool? HasSecurity { get; set; }
        public decimal? MaxDistanceFromUniversity { get; set; }
        public int? RequiredStudentsCount { get; set; }
        public string? College { get; set; }
        public bool? IsFemaleOnly { get; set; }
        public bool? IsMaleOnly { get; set; }
        public bool? IsMixed { get; set; }
    }
} 