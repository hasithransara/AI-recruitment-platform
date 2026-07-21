using AIRecruitment.API.DTOs;

namespace AIRecruitment.API.Interfaces
{
    public interface IProfileRepository
    {
        Task<ProfileDto?> GetProfileAsync(int userId);

        Task<bool> UpdateProfileAsync(int userId, UpdateProfileDto dto);

        Task<string?> UploadResumeAsync(int userId, IFormFile file);
    }
}