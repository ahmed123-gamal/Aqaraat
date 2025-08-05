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
    public class ImageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public  ImageController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpPost("upload")]
        [Authorize]
        public async Task<IActionResult> UploadImage([FromBody] ImageUploadRequest request)
        {
            if (string.IsNullOrEmpty(request.Base64Data))
            {
                return BadRequest(new { message = "بيانات الصورة مطلوبة" });
            }

            try
            {
                // التحقق من صحة البيانات
                if (request.Base64Data.Contains(','))
                {
                    request.Base64Data = request.Base64Data.Split(',')[1];
                }

                // تحويل البيانات إلى مصفوفة بايت
                byte[] imageBytes = Convert.FromBase64String(request.Base64Data);

                // إنشاء اسم فريد للملف
                string fileName = $"{Guid.NewGuid()}{Path.GetExtension(request.FileName ?? ".jpg")}";

                // إنشاء مجلد للصور إذا لم يكن موجودًا
                string uploadsFolder = Path.Combine(_environment.ContentRootPath, "wwwroot", "uploads", "images");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // حفظ الملف
                string filePath = Path.Combine(uploadsFolder, fileName);
                await System.IO.File.WriteAllBytesAsync(filePath, imageBytes);

                // إنشاء URL للصورة
                string imageUrl = $"{Request.Scheme}://{Request.Host}/uploads/images/{fileName}";

                return Ok(new { imageUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"حدث خطأ أثناء رفع الصورة: {ex.Message}" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            var image = await _context.PropertyImages.FindAsync(id);
            if (image == null)
            {
                return NotFound(new { message = "الصورة غير موجودة" });
            }

            return Ok(image);
        }
    }

    public class ImageUploadRequest
    {
        public string Base64Data { get; set; } = string.Empty;
        public string? FileName { get; set; }
    }
}