using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using AqaraatAPI.Services;
using AqaraatAPI.DTOs;
using AqaraatAPI.Models;

namespace AqaraatAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyController : ControllerBase
    {
        private readonly PropertyService _propertyService;

        public PropertyController(PropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateProperty([FromBody] CreatePropertyDTO createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0)
            {
                return Unauthorized();
            }

            var result = await _propertyService.CreatePropertyAsync(createDto, userId);
            if (result == null)
            {
                return BadRequest(new { message = "حدث خطأ أثناء إنشاء العقار" });
            }

            return CreatedAtAction(nameof(GetProperty), new { id = result.Id }, result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(int id)
        {
            var property = await _propertyService.GetPropertyByIdAsync(id);
            if (property == null)
            {
                return NotFound(new { message = "العقار غير موجود" });
            }

            return Ok(property);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchProperties([FromQuery] PropertySearchDTO searchDto)
        {
            var properties = await _propertyService.SearchPropertiesAsync(searchDto);
            return Ok(properties);
        }

        [HttpGet("areas")]
        public IActionResult GetAreas()
        {
            var areas = _propertyService.GetAreas();
            return Ok(areas);
        }

        [HttpGet("areas/{area}/subareas")]
        public IActionResult GetSubAreas(string area)
        {
            var subAreas = _propertyService.GetSubAreas(area);
            return Ok(subAreas);
        }

        [HttpGet("types")]
        public IActionResult GetPropertyTypes()
        {
            var types = _propertyService.GetPropertyTypes();
            return Ok(types);
        }

        [HttpGet("categories")]
        public IActionResult GetPropertyCategories()
        {
            var categories = _propertyService.GetPropertyCategories();
            return Ok(categories);
        }
    }
} 