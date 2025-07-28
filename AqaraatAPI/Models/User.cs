using System.ComponentModel.DataAnnotations;

namespace AqaraatAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;
        
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public bool IsActive { get; set; } = true;
        
        public string? AdminPhoneNumber { get; set; } // رقم الهاتف للمالك (يظهر للإدمن فقط)
        
        // Navigation Properties
        public virtual ICollection<Property> Properties { get; set; } = new List<Property>();
        public virtual ICollection<StudentRequest> StudentRequests { get; set; } = new List<StudentRequest>();
    }
} 