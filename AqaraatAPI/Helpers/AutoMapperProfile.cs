using AutoMapper;
using AqaraatAPI.Models;
using AqaraatAPI.DTOs;

namespace AqaraatAPI.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // User mappings
            CreateMap<RegisterDTO, User>();
            CreateMap<User, AuthResponseDTO>();

            // Property mappings
            CreateMap<CreatePropertyDTO, Property>();
            CreateMap<Property, PropertyResponseDTO>();

            // StudentRequest mappings
            CreateMap<CreateStudentRequestDTO, StudentRequest>();
            CreateMap<StudentRequest, StudentRequestResponseDTO>();
        }
    }
} 