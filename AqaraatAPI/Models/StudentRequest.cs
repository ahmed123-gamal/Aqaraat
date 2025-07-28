using System.ComponentModel.DataAnnotations;

namespace AqaraatAPI.Models
{
    public enum RequestStatus
    {
        Pending,    // قيد الانتظار
        Processing,  // قيد التنفيذ
        Completed,   // مكتمل
        Cancelled    // ملغي
    }

    public class StudentRequest
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string StudentName { get; set; } = string.Empty;
        
        [Required]
        [Phone]
        public string StudentPhone { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string College { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string Area { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string SubArea { get; set; } = string.Empty;
        
        public int RequiredStudentsCount { get; set; } = 1;
        
        public string? AdditionalRequirements { get; set; }
        
        public RequestStatus Status { get; set; } = RequestStatus.Pending;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation Properties
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
    }
} 