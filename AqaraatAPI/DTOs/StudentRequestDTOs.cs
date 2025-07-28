using System.ComponentModel.DataAnnotations;
using AqaraatAPI.Models;

namespace AqaraatAPI.DTOs
{
    public class CreateStudentRequestDTO
    {
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
        
        [Range(1, 10)]
        public int RequiredStudentsCount { get; set; } = 1;
        
        public string? AdditionalRequirements { get; set; }
    }

    public class StudentRequestResponseDTO
    {
        public int Id { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string StudentPhone { get; set; } = string.Empty;
        public string College { get; set; } = string.Empty;
        public string Area { get; set; } = string.Empty;
        public string SubArea { get; set; } = string.Empty;
        public int RequiredStudentsCount { get; set; }
        public string? AdditionalRequirements { get; set; }
        public RequestStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class StudentRequestSearchDTO
    {
        public string? College { get; set; }
        public string? Area { get; set; }
        public string? SubArea { get; set; }
        public RequestStatus? Status { get; set; }
        public int? MinStudentsCount { get; set; }
        public int? MaxStudentsCount { get; set; }
    }
} 