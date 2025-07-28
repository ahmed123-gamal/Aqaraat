using Microsoft.EntityFrameworkCore;
using AqaraatAPI.Data;
using AqaraatAPI.Models;
using AqaraatAPI.DTOs;
using AutoMapper;

namespace AqaraatAPI.Services
{
    public class PropertyService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PropertyService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PropertyResponseDTO?> CreatePropertyAsync(CreatePropertyDTO createDto, int userId)
        {
            var property = new Property
            {
                Title = createDto.Title,
                Description = createDto.Description,
                Price = createDto.Price,
                Type = createDto.Type,
                Category = createDto.Category,
                Area = createDto.Area,
                SubArea = createDto.SubArea,
                
                // تفاصيل الشقة
                NumberOfRooms = createDto.NumberOfRooms,
                NumberOfBathrooms = createDto.NumberOfBathrooms,
                NumberOfLivingRooms = createDto.NumberOfLivingRooms,
                NumberOfKitchens = createDto.NumberOfKitchens,
                AreaSize = createDto.AreaSize,
                LivingRoomSize = createDto.LivingRoomSize,
                KitchenSize = createDto.KitchenSize,
                
                // تفاصيل المبنى
                FloorNumber = createDto.FloorNumber,
                TotalFloors = createDto.TotalFloors,
                HasElevator = createDto.HasElevator,
                HasParking = createDto.HasParking,
                HasBalcony = createDto.HasBalcony,
                HasGarden = createDto.HasGarden,
                HasTerrace = createDto.HasTerrace,
                
                // الخدمات
                HasAirConditioning = createDto.HasAirConditioning,
                HasHeating = createDto.HasHeating,
                HasInternet = createDto.HasInternet,
                HasSatellite = createDto.HasSatellite,
                HasFurniture = createDto.HasFurniture,
                HasAppliances = createDto.HasAppliances,
                
                // الأمان
                HasSecurity = createDto.HasSecurity,
                HasCCTV = createDto.HasCCTV,
                HasGuard = createDto.HasGuard,
                
                // الموقع
                Address = createDto.Address,
                Landmark = createDto.Landmark,
                DistanceFromUniversity = createDto.DistanceFromUniversity,
                DistanceFromCityCenter = createDto.DistanceFromCityCenter,
                
                // للطلاب فقط
                RequiredStudentsCount = createDto.RequiredStudentsCount,
                AllowedColleges = createDto.AllowedColleges,
                IsFemaleOnly = createDto.IsFemaleOnly,
                IsMaleOnly = createDto.IsMaleOnly,
                IsMixed = createDto.IsMixed,
                
                UserId = userId
            };

            _context.Properties.Add(property);
            await _context.SaveChangesAsync();

            // إضافة الصور
            foreach (var imageDto in createDto.Images)
            {
                var image = new PropertyImage
                {
                    ImageUrl = imageDto.ImageUrl,
                    Caption = imageDto.Caption,
                    Type = imageDto.Type,
                    IsMain = imageDto.IsMain,
                    OrderIndex = imageDto.OrderIndex,
                    AltText = imageDto.AltText,
                    PropertyId = property.Id
                };
                _context.PropertyImages.Add(image);
            }

            // إضافة الفيديوهات
            foreach (var videoDto in createDto.Videos)
            {
                var video = new PropertyVideo
                {
                    VideoUrl = videoDto.VideoUrl,
                    Caption = videoDto.Caption,
                    Type = videoDto.Type,
                    IsMain = videoDto.IsMain,
                    OrderIndex = videoDto.OrderIndex,
                    ThumbnailUrl = videoDto.ThumbnailUrl,
                    Duration = videoDto.Duration,
                    AltText = videoDto.AltText,
                    PropertyId = property.Id
                };
                _context.PropertyVideos.Add(video);
            }

            await _context.SaveChangesAsync();

            return await GetPropertyByIdAsync(property.Id);
        }

        public async Task<PropertyResponseDTO?> GetPropertyByIdAsync(int id)
        {
            var property = await _context.Properties
                .Include(p => p.User)
                .Include(p => p.Images.OrderBy(i => i.OrderIndex))
                .Include(p => p.Videos.OrderBy(v => v.OrderIndex))
                .FirstOrDefaultAsync(p => p.Id == id && p.IsActive);

            if (property == null) return null;

            return new PropertyResponseDTO
            {
                Id = property.Id,
                Title = property.Title,
                Description = property.Description,
                Price = property.Price,
                Type = property.Type,
                Category = property.Category,
                Status = property.Status,
                Area = property.Area,
                SubArea = property.SubArea,
                
                // تفاصيل الشقة
                NumberOfRooms = property.NumberOfRooms,
                NumberOfBathrooms = property.NumberOfBathrooms,
                NumberOfLivingRooms = property.NumberOfLivingRooms,
                NumberOfKitchens = property.NumberOfKitchens,
                AreaSize = property.AreaSize,
                LivingRoomSize = property.LivingRoomSize,
                KitchenSize = property.KitchenSize,
                
                // تفاصيل المبنى
                FloorNumber = property.FloorNumber,
                TotalFloors = property.TotalFloors,
                HasElevator = property.HasElevator,
                HasParking = property.HasParking,
                HasBalcony = property.HasBalcony,
                HasGarden = property.HasGarden,
                HasTerrace = property.HasTerrace,
                
                // الخدمات
                HasAirConditioning = property.HasAirConditioning,
                HasHeating = property.HasHeating,
                HasInternet = property.HasInternet,
                HasSatellite = property.HasSatellite,
                HasFurniture = property.HasFurniture,
                HasAppliances = property.HasAppliances,
                
                // الأمان
                HasSecurity = property.HasSecurity,
                HasCCTV = property.HasCCTV,
                HasGuard = property.HasGuard,
                
                // الموقع
                Address = property.Address,
                Landmark = property.Landmark,
                DistanceFromUniversity = property.DistanceFromUniversity,
                DistanceFromCityCenter = property.DistanceFromCityCenter,
                
                // للطلاب فقط
                RequiredStudentsCount = property.RequiredStudentsCount,
                AllowedColleges = property.AllowedColleges,
                IsFemaleOnly = property.IsFemaleOnly,
                IsMaleOnly = property.IsMaleOnly,
                IsMixed = property.IsMixed,
                
                CreatedAt = property.CreatedAt,
                UpdatedAt = property.UpdatedAt,
                OwnerPhone = property.User.PhoneNumber,
                OwnerName = property.User.Name,
                
                Images = property.Images.Select(i => new PropertyImageResponseDTO
                {
                    Id = i.Id,
                    ImageUrl = i.ImageUrl,
                    Caption = i.Caption,
                    Type = i.Type,
                    IsMain = i.IsMain,
                    OrderIndex = i.OrderIndex,
                    AltText = i.AltText,
                    CreatedAt = i.CreatedAt
                }).ToList(),
                
                Videos = property.Videos.Select(v => new PropertyVideoResponseDTO
                {
                    Id = v.Id,
                    VideoUrl = v.VideoUrl,
                    Caption = v.Caption,
                    Type = v.Type,
                    IsMain = v.IsMain,
                    OrderIndex = v.OrderIndex,
                    ThumbnailUrl = v.ThumbnailUrl,
                    Duration = v.Duration,
                    AltText = v.AltText,
                    CreatedAt = v.CreatedAt
                }).ToList()
            };
        }

        public async Task<List<PropertyResponseDTO>> SearchPropertiesAsync(PropertySearchDTO searchDto)
        {
            var query = _context.Properties
                .Include(p => p.User)
                .Include(p => p.Images.OrderBy(i => i.OrderIndex))
                .Include(p => p.Videos.OrderBy(v => v.OrderIndex))
                .Where(p => p.IsActive && p.Status == PropertyStatus.Available);

            if (searchDto.Type.HasValue)
                query = query.Where(p => p.Type == searchDto.Type.Value);

            if (searchDto.Category.HasValue)
                query = query.Where(p => p.Category == searchDto.Category.Value);

            if (searchDto.Status.HasValue)
                query = query.Where(p => p.Status == searchDto.Status.Value);

            if (!string.IsNullOrEmpty(searchDto.Area))
                query = query.Where(p => p.Area == searchDto.Area);

            if (!string.IsNullOrEmpty(searchDto.SubArea))
                query = query.Where(p => p.SubArea == searchDto.SubArea);

            if (searchDto.MinPrice.HasValue)
                query = query.Where(p => p.Price >= searchDto.MinPrice.Value);

            if (searchDto.MaxPrice.HasValue)
                query = query.Where(p => p.Price <= searchDto.MaxPrice.Value);

            if (searchDto.MinRooms.HasValue)
                query = query.Where(p => p.NumberOfRooms >= searchDto.MinRooms.Value);

            if (searchDto.MaxRooms.HasValue)
                query = query.Where(p => p.NumberOfRooms <= searchDto.MaxRooms.Value);

            if (searchDto.MinBathrooms.HasValue)
                query = query.Where(p => p.NumberOfBathrooms >= searchDto.MinBathrooms.Value);

            if (searchDto.MaxBathrooms.HasValue)
                query = query.Where(p => p.NumberOfBathrooms <= searchDto.MaxBathrooms.Value);

            if (searchDto.MinAreaSize.HasValue)
                query = query.Where(p => p.AreaSize >= searchDto.MinAreaSize.Value);

            if (searchDto.MaxAreaSize.HasValue)
                query = query.Where(p => p.AreaSize <= searchDto.MaxAreaSize.Value);

            if (searchDto.FloorNumber.HasValue)
                query = query.Where(p => p.FloorNumber == searchDto.FloorNumber.Value);

            if (searchDto.HasElevator.HasValue)
                query = query.Where(p => p.HasElevator == searchDto.HasElevator.Value);

            if (searchDto.HasParking.HasValue)
                query = query.Where(p => p.HasParking == searchDto.HasParking.Value);

            if (searchDto.HasBalcony.HasValue)
                query = query.Where(p => p.HasBalcony == searchDto.HasBalcony.Value);

            if (searchDto.HasAirConditioning.HasValue)
                query = query.Where(p => p.HasAirConditioning == searchDto.HasAirConditioning.Value);

            if (searchDto.HasFurniture.HasValue)
                query = query.Where(p => p.HasFurniture == searchDto.HasFurniture.Value);

            if (searchDto.HasInternet.HasValue)
                query = query.Where(p => p.HasInternet == searchDto.HasInternet.Value);

            if (searchDto.HasSecurity.HasValue)
                query = query.Where(p => p.HasSecurity == searchDto.HasSecurity.Value);

            if (searchDto.MaxDistanceFromUniversity.HasValue)
                query = query.Where(p => p.DistanceFromUniversity <= searchDto.MaxDistanceFromUniversity.Value);

            if (searchDto.RequiredStudentsCount.HasValue)
                query = query.Where(p => p.RequiredStudentsCount >= searchDto.RequiredStudentsCount.Value);

            if (!string.IsNullOrEmpty(searchDto.College))
                query = query.Where(p => p.AllowedColleges != null && p.AllowedColleges.Contains(searchDto.College));

            if (searchDto.IsFemaleOnly.HasValue)
                query = query.Where(p => p.IsFemaleOnly == searchDto.IsFemaleOnly.Value);

            if (searchDto.IsMaleOnly.HasValue)
                query = query.Where(p => p.IsMaleOnly == searchDto.IsMaleOnly.Value);

            if (searchDto.IsMixed.HasValue)
                query = query.Where(p => p.IsMixed == searchDto.IsMixed.Value);

            var properties = await query.OrderByDescending(p => p.CreatedAt).ToListAsync();

            return properties.Select(p => new PropertyResponseDTO
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                Price = p.Price,
                Type = p.Type,
                Category = p.Category,
                Status = p.Status,
                Area = p.Area,
                SubArea = p.SubArea,
                
                // تفاصيل الشقة
                NumberOfRooms = p.NumberOfRooms,
                NumberOfBathrooms = p.NumberOfBathrooms,
                NumberOfLivingRooms = p.NumberOfLivingRooms,
                NumberOfKitchens = p.NumberOfKitchens,
                AreaSize = p.AreaSize,
                LivingRoomSize = p.LivingRoomSize,
                KitchenSize = p.KitchenSize,
                
                // تفاصيل المبنى
                FloorNumber = p.FloorNumber,
                TotalFloors = p.TotalFloors,
                HasElevator = p.HasElevator,
                HasParking = p.HasParking,
                HasBalcony = p.HasBalcony,
                HasGarden = p.HasGarden,
                HasTerrace = p.HasTerrace,
                
                // الخدمات
                HasAirConditioning = p.HasAirConditioning,
                HasHeating = p.HasHeating,
                HasInternet = p.HasInternet,
                HasSatellite = p.HasSatellite,
                HasFurniture = p.HasFurniture,
                HasAppliances = p.HasAppliances,
                
                // الأمان
                HasSecurity = p.HasSecurity,
                HasCCTV = p.HasCCTV,
                HasGuard = p.HasGuard,
                
                // الموقع
                Address = p.Address,
                Landmark = p.Landmark,
                DistanceFromUniversity = p.DistanceFromUniversity,
                DistanceFromCityCenter = p.DistanceFromCityCenter,
                
                // للطلاب فقط
                RequiredStudentsCount = p.RequiredStudentsCount,
                AllowedColleges = p.AllowedColleges,
                IsFemaleOnly = p.IsFemaleOnly,
                IsMaleOnly = p.IsMaleOnly,
                IsMixed = p.IsMixed,
                
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt,
                OwnerPhone = p.User.PhoneNumber,
                OwnerName = p.User.Name,
                
                Images = p.Images.Select(i => new PropertyImageResponseDTO
                {
                    Id = i.Id,
                    ImageUrl = i.ImageUrl,
                    Caption = i.Caption,
                    Type = i.Type,
                    IsMain = i.IsMain,
                    OrderIndex = i.OrderIndex,
                    AltText = i.AltText,
                    CreatedAt = i.CreatedAt
                }).ToList(),
                
                Videos = p.Videos.Select(v => new PropertyVideoResponseDTO
                {
                    Id = v.Id,
                    VideoUrl = v.VideoUrl,
                    Caption = v.Caption,
                    Type = v.Type,
                    IsMain = v.IsMain,
                    OrderIndex = v.OrderIndex,
                    ThumbnailUrl = v.ThumbnailUrl,
                    Duration = v.Duration,
                    AltText = v.AltText,
                    CreatedAt = v.CreatedAt
                }).ToList()
            }).ToList();
        }

        public async Task<List<string>> GetAreasAsync()
        {
            return await _context.Properties
                .Where(p => p.IsActive)
                .Select(p => p.Area)
                .Distinct()
                .OrderBy(a => a)
                .ToListAsync();
        }

        public async Task<List<string>> GetSubAreasAsync(string area)
        {
            return await _context.Properties
                .Where(p => p.IsActive && p.Area == area)
                .Select(p => p.SubArea)
                .Distinct()
                .OrderBy(a => a)
                .ToListAsync();
        }

        public async Task<List<string>> GetPropertyTypesAsync()
        {
            return Enum.GetValues<PropertyType>()
                .Select(t => t.ToString())
                .ToList();
        }

        public async Task<List<string>> GetPropertyCategoriesAsync()
        {
            return Enum.GetValues<PropertyCategory>()
                .Select(c => c.ToString())
                .ToList();
        }
    }
} 