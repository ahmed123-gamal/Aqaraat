using Microsoft.EntityFrameworkCore;
using AqaraatAPI.Models;

namespace AqaraatAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<PropertyImage> PropertyImages { get; set; }
        public DbSet<PropertyVideo> PropertyVideos { get; set; }
        public DbSet<StudentRequest> StudentRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User Configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.Property(e => e.PhoneNumber).IsRequired().HasMaxLength(20);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.HasIndex(e => e.PhoneNumber).IsUnique();
            });

            // Property Configuration
            modelBuilder.Entity<Property>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
                entity.Property(e => e.AreaSize).HasColumnType("decimal(10,2)");
                
                entity.HasOne(e => e.User)
                    .WithMany(e => e.Properties)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // PropertyImage Configuration
            modelBuilder.Entity<PropertyImage>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ImageUrl).IsRequired();
                
                entity.HasOne(e => e.Property)
                    .WithMany(e => e.Images)
                    .HasForeignKey(e => e.PropertyId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // PropertyVideo Configuration
            modelBuilder.Entity<PropertyVideo>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.VideoUrl).IsRequired();
                
                entity.HasOne(e => e.Property)
                    .WithMany(e => e.Videos)
                    .HasForeignKey(e => e.PropertyId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // StudentRequest Configuration
            modelBuilder.Entity<StudentRequest>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.StudentName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.StudentPhone).IsRequired().HasMaxLength(20);
                entity.Property(e => e.College).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Area).IsRequired().HasMaxLength(100);
                entity.Property(e => e.SubArea).IsRequired().HasMaxLength(100);
                
                entity.HasOne(e => e.User)
                    .WithMany(e => e.StudentRequests)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
} 