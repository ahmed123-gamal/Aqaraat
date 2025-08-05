using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.IO;
using System.Threading.Tasks;
using AqaraatAPI.Data;
using AqaraatAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AqaraatAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VideoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public VideoController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpPost("upload")]
        [Authorize]
        public async Task<IActionResult> UploadVideo([FromBody] VideoUploadRequest request)
        {
            if (string.IsNullOrEmpty(request.Base64Data))
            {
                return BadRequest(new { message = "بيانات الفيديو مطلوبة" });
            }

            try
            {
                // التحقق من صحة البيانات
                if (request.Base64Data.Contains(','))
                {
                    request.Base64Data = request.Base64Data.Split(',')[1];
                }

                // تحويل البيانات إلى مصفوفة بايت
                byte[] videoBytes = Convert.FromBase64String(request.Base64Data);

                // إنشاء اسم فريد للملف
                string fileName = $"{Guid.NewGuid()}{Path.GetExtension(request.FileName ?? ".mp4")}";

                // إنشاء مجلد للفيديوهات إذا لم يكن موجودًا
                string uploadsFolder = Path.Combine(_environment.ContentRootPath, "wwwroot", "uploads", "videos");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // حفظ الملف
                string filePath = Path.Combine(uploadsFolder, fileName);
                await System.IO.File.WriteAllBytesAsync(filePath, videoBytes);

                // إنشاء URL للفيديو
                string videoUrl = $"{Request.Scheme}://{Request.Host}/uploads/videos/{fileName}";

                // إنشاء صورة مصغرة افتراضية للفيديو
                string thumbnailUrl = $"{Request.Scheme}://{Request.Host}/uploads/images/default-video-thumbnail.jpg";

                return Ok(new { videoUrl, thumbnailUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"حدث خطأ أثناء رفع الفيديو: {ex.Message}" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVideo(int id)
        {
            var video = await _context.PropertyVideos.FindAsync(id);
            if (video == null)
            {
                return NotFound(new { message = "الفيديو غير موجود" });
            }

            return Ok(video);
        }
    }

    public class VideoUploadRequest
    {
        public string Base64Data { get; set; } = string.Empty;
        public string? FileName { get; set; }
    }
}