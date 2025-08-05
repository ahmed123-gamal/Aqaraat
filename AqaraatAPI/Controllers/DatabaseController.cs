using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AqaraatAPI.Data;
using AqaraatAPI.Models;

namespace AqaraatAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatabaseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DatabaseController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetDatabaseStatus()
        {
            try
            {
                var propertyCount = await _context.Properties.CountAsync();
                var imageCount = await _context.PropertyImages.CountAsync();
                var userCount = await _context.Users.CountAsync();
                var videoCount = await _context.PropertyVideos.CountAsync();

                return Ok(new
                {
                    status = "Database is connected and working",
                    properties = propertyCount,
                    images = imageCount,
                    users = userCount,
                    videos = videoCount,
                    timestamp = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = "Database connection failed",
                    error = ex.Message,
                    timestamp = DateTime.UtcNow
                });
            }
        }

        [HttpGet("properties")]
        public async Task<IActionResult> GetAllProperties()
        {
            try
            {
                var properties = await _context.Properties
                    .Include(p => p.Images)
                    .Include(p => p.Videos)
                    .Include(p => p.User)
                    .Select(p => new
                    {
                        id = p.Id,
                        title = p.Title,
                        area = p.Area,
                        subArea = p.SubArea,
                        type = p.Type.ToString(),
                        category = p.Category.ToString(),
                        price = p.Price,
                        status = p.Status.ToString(),
                        imageCount = p.Images.Count,
                        videoCount = p.Videos.Count,
                        ownerName = p.User.Name,
                        createdAt = p.CreatedAt
                    })
                    .ToListAsync();

                return Ok(new
                {
                    count = properties.Count,
                    properties = properties
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("properties/{id}")]
        public async Task<IActionResult> GetPropertyDetails(int id)
        {
            try
            {
                var property = await _context.Properties
                    .Include(p => p.Images)
                    .Include(p => p.Videos)
                    .Include(p => p.User)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (property == null)
                {
                    return NotFound(new { message = "العقار غير موجود" });
                }

                return Ok(new
                {
                    id = property.Id,
                    title = property.Title,
                    description = property.Description,
                    area = property.Area,
                    subArea = property.SubArea,
                    type = property.Type.ToString(),
                    category = property.Category.ToString(),
                    price = property.Price,
                    status = property.Status.ToString(),
                    numberOfRooms = property.NumberOfRooms,
                    numberOfBathrooms = property.NumberOfBathrooms,
                    areaSize = property.AreaSize,
                    floorNumber = property.FloorNumber,
                    hasElevator = property.HasElevator,
                    hasParking = property.HasParking,
                    hasBalcony = property.HasBalcony,
                    hasAirConditioning = property.HasAirConditioning,
                    hasInternet = property.HasInternet,
                    hasFurniture = property.HasFurniture,
                    hasSecurity = property.HasSecurity,
                    distanceFromUniversity = property.DistanceFromUniversity,
                    distanceFromCityCenter = property.DistanceFromCityCenter,
                    requiredStudentsCount = property.RequiredStudentsCount,
                    isFemaleOnly = property.IsFemaleOnly,
                    isMaleOnly = property.IsMaleOnly,
                    isMixed = property.IsMixed,
                    ownerName = property.User.Name,
                    ownerPhone = property.User.PhoneNumber,
                    createdAt = property.CreatedAt,
                    updatedAt = property.UpdatedAt,
                    images = property.Images.Select(i => new
                    {
                        id = i.Id,
                        imageUrl = i.ImageUrl,
                        caption = i.Caption,
                        type = i.Type.ToString(),
                        isMain = i.IsMain,
                        orderIndex = i.OrderIndex
                    }).ToList(),
                    videos = property.Videos.Select(v => new
                    {
                        id = v.Id,
                        videoUrl = v.VideoUrl,
                        caption = v.Caption,
                        type = v.Type.ToString(),
                        isMain = v.IsMain,
                        orderIndex = v.OrderIndex,
                        thumbnailUrl = v.ThumbnailUrl,
                        duration = v.Duration
                    }).ToList()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("areas")]
        public async Task<IActionResult> GetAreasWithCount()
        {
            try
            {
                var areas = await _context.Properties
                    .GroupBy(p => p.Area)
                    .Select(g => new
                    {
                        area = g.Key,
                        count = g.Count(),
                        types = g.Select(p => p.Type.ToString()).Distinct().ToList()
                    })
                    .OrderBy(a => a.area)
                    .ToListAsync();

                return Ok(new
                    {
                        totalAreas = areas.Count,
                        areas = areas
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("seed-data")]
        public async Task<IActionResult> SeedDataEndpoint()
        {
            try
            {
                await SeedData.SeedPropertiesAsync(_context);
                return Ok(new { message = "تم إضافة البيانات التجريبية بنجاح" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
} 