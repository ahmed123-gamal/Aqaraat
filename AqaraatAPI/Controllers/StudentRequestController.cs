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
    public class StudentRequestController : ControllerBase
    {
        private readonly StudentRequestService _studentRequestService;

        public StudentRequestController(StudentRequestService studentRequestService)
        {
            _studentRequestService = studentRequestService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateStudentRequest([FromBody] CreateStudentRequestDTO createDto)
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

            var result = await _studentRequestService.CreateStudentRequestAsync(createDto, userId);
            if (result == null)
            {
                return BadRequest(new { message = "حدث خطأ أثناء إنشاء الطلب" });
            }

            return CreatedAtAction(nameof(GetStudentRequest), new { id = result.Id }, result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudentRequest(int id)
        {
            var request = await _studentRequestService.GetStudentRequestByIdAsync(id);
            if (request == null)
            {
                return NotFound(new { message = "الطلب غير موجود" });
            }

            return Ok(request);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchStudentRequests([FromQuery] StudentRequestSearchDTO searchDto)
        {
            var requests = await _studentRequestService.SearchStudentRequestsAsync(searchDto);
            return Ok(requests);
        }

        [HttpPut("{id}/status")]
        [Authorize]
        public async Task<IActionResult> UpdateStudentRequestStatus(int id, [FromBody] RequestStatus status)
        {
            var success = await _studentRequestService.UpdateStudentRequestStatusAsync(id, status);
            if (!success)
            {
                return NotFound(new { message = "الطلب غير موجود" });
            }

            return Ok(new { message = "تم تحديث حالة الطلب بنجاح" });
        }

        [HttpGet("colleges")]
        public async Task<IActionResult> GetColleges()
        {
            var colleges = await _studentRequestService.GetCollegesAsync();
            return Ok(colleges);
        }

        [HttpGet("areas")]
        public async Task<IActionResult> GetStudentRequestAreas()
        {
            var areas = await _studentRequestService.GetStudentRequestAreasAsync();
            return Ok(areas);
        }

        [HttpGet("areas/{area}/subareas")]
        public async Task<IActionResult> GetStudentRequestSubAreas(string area)
        {
            var subAreas = await _studentRequestService.GetStudentRequestSubAreasAsync(area);
            return Ok(subAreas);
        }

        [HttpGet("statuses")]
        public IActionResult GetRequestStatuses()
        {
            var statuses = Enum.GetValues(typeof(RequestStatus))
                .Cast<RequestStatus>()
                .Select(s => new { Value = (int)s, Name = s.ToString() })
                .ToList();

            return Ok(statuses);
        }
    }
} 