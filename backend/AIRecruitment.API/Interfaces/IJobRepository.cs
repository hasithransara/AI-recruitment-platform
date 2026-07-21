using AIRecruitment.API.DTOs;

namespace AIRecruitment.API.Interfaces
{
    public interface IJobRepository
    {
        Task<JobDto> CreateJobAsync(CreateJobDto dto);

        Task<List<JobDto>> GetAllJobsAsync();

        Task<JobDto?> GetJobByIdAsync(int id);

        Task<JobDto?> UpdateJobAsync(int id, UpdateJobDto dto);

        Task<bool> DeleteJobAsync(int id);
    }
}