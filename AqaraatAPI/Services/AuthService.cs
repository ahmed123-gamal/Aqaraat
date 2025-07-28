using Microsoft.EntityFrameworkCore;
using AqaraatAPI.Data;
using AqaraatAPI.Models;
using AqaraatAPI.DTOs;
using System.Security.Cryptography;
using System.Text;

namespace AqaraatAPI.Services
{
    public class AuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtService _jwtService;

        public AuthService(ApplicationDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        public async Task<AuthResponseDTO?> RegisterAsync(RegisterDTO registerDto)
        {
            // التحقق من عدم وجود المستخدم مسبقاً
            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                return null;
            }

            if (await _context.Users.AnyAsync(u => u.PhoneNumber == registerDto.PhoneNumber))
            {
                return null;
            }

            // إنشاء المستخدم الجديد
            var user = new User
            {
                Name = registerDto.Name,
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                PasswordHash = HashPassword(registerDto.Password),
                AdminPhoneNumber = registerDto.AdminPhoneNumber
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // إنشاء التوكن
            var token = _jwtService.GenerateToken(user);

            return new AuthResponseDTO
            {
                Token = token,
                UserName = user.Name,
                UserEmail = user.Email,
                UserPhone = user.PhoneNumber,
                ExpiresAt = DateTime.UtcNow.AddMinutes(60)
            };
        }

        public async Task<AuthResponseDTO?> LoginAsync(LoginDTO loginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == loginDto.Email && u.IsActive);

            if (user == null || !VerifyPassword(loginDto.Password, user.PasswordHash))
            {
                return null;
            }

            var token = _jwtService.GenerateToken(user);

            return new AuthResponseDTO
            {
                Token = token,
                UserName = user.Name,
                UserEmail = user.Email,
                UserPhone = user.PhoneNumber,
                ExpiresAt = DateTime.UtcNow.AddMinutes(60)
            };
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

        private bool VerifyPassword(string password, string hash)
        {
            var hashedPassword = HashPassword(password);
            return hashedPassword == hash;
        }
    }
} 