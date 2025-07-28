using Microsoft.EntityFrameworkCore;
using AqaraatAPI.Data;
using AqaraatAPI.Models;
using AqaraatAPI.DTOs;

namespace AqaraatAPI.Services
{
    public class StudentRequestService
    {
        private readonly ApplicationDbContext _context;

        public StudentRequestService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<StudentRequestResponseDTO?> CreateStudentRequestAsync(CreateStudentRequestDTO createDto, int userId)
        {
            var request = new StudentRequest
            {
                StudentName = createDto.StudentName,
                StudentPhone = createDto.StudentPhone,
                College = createDto.College,
                Area = createDto.Area,
                SubArea = createDto.SubArea,
                RequiredStudentsCount = createDto.RequiredStudentsCount,
                AdditionalRequirements = createDto.AdditionalRequirements,
                UserId = userId
            };

            _context.StudentRequests.Add(request);
            await _context.SaveChangesAsync();

            return await GetStudentRequestByIdAsync(request.Id);
        }

        public async Task<StudentRequestResponseDTO?> GetStudentRequestByIdAsync(int id)
        {
            var request = await _context.StudentRequests
                .FirstOrDefaultAsync(r => r.Id == id);

            if (request == null) return null;

            return new StudentRequestResponseDTO
            {
                Id = request.Id,
                StudentName = request.StudentName,
                StudentPhone = request.StudentPhone,
                College = request.College,
                Area = request.Area,
                SubArea = request.SubArea,
                RequiredStudentsCount = request.RequiredStudentsCount,
                AdditionalRequirements = request.AdditionalRequirements,
                Status = request.Status,
                CreatedAt = request.CreatedAt,
                UpdatedAt = request.UpdatedAt
            };
        }

        public async Task<List<StudentRequestResponseDTO>> SearchStudentRequestsAsync(StudentRequestSearchDTO searchDto)
        {
            var query = _context.StudentRequests.AsQueryable();

            if (!string.IsNullOrEmpty(searchDto.College))
                query = query.Where(r => r.College == searchDto.College);

            if (!string.IsNullOrEmpty(searchDto.Area))
                query = query.Where(r => r.Area == searchDto.Area);

            if (!string.IsNullOrEmpty(searchDto.SubArea))
                query = query.Where(r => r.SubArea == searchDto.SubArea);

            if (searchDto.Status.HasValue)
                query = query.Where(r => r.Status == searchDto.Status.Value);

            if (searchDto.MinStudentsCount.HasValue)
                query = query.Where(r => r.RequiredStudentsCount >= searchDto.MinStudentsCount.Value);

            if (searchDto.MaxStudentsCount.HasValue)
                query = query.Where(r => r.RequiredStudentsCount <= searchDto.MaxStudentsCount.Value);

            var requests = await query.OrderByDescending(r => r.CreatedAt).ToListAsync();

            return requests.Select(r => new StudentRequestResponseDTO
            {
                Id = r.Id,
                StudentName = r.StudentName,
                StudentPhone = r.StudentPhone,
                College = r.College,
                Area = r.Area,
                SubArea = r.SubArea,
                RequiredStudentsCount = r.RequiredStudentsCount,
                AdditionalRequirements = r.AdditionalRequirements,
                Status = r.Status,
                CreatedAt = r.CreatedAt,
                UpdatedAt = r.UpdatedAt
            }).ToList();
        }

        public async Task<bool> UpdateStudentRequestStatusAsync(int id, RequestStatus status)
        {
            var request = await _context.StudentRequests.FindAsync(id);
            if (request == null) return false;

            request.Status = status;
            request.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<string>> GetCollegesAsync()
        {
            return await _context.StudentRequests
                .Select(r => r.College)
                .Distinct()
                .OrderBy(c => c)
                .ToListAsync();
        }

        public async Task<List<string>> GetStudentRequestAreasAsync()
        {
            return await _context.StudentRequests
                .Select(r => r.Area)
                .Distinct()
                .OrderBy(a => a)
                .ToListAsync();
        }

        public async Task<List<string>> GetStudentRequestSubAreasAsync(string area)
        {
            return await _context.StudentRequests
                .Where(r => r.Area == area)
                .Select(r => r.SubArea)
                .Distinct()
                .OrderBy(a => a)
                .ToListAsync();
        }
    }
} 