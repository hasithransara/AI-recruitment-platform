using AIRecruitment.API.DTOs;

namespace AIRecruitment.API.Interfaces
{
    public interface IApplicationRepository
    {
        Task<bool> ApplyForJobAsync(int userId, int jobId);

        Task<List<ApplicationDto>> GetMyApplicationsAsync(int userId);

        Task<List<JobApplicantDto>> GetApplicantsByJobAsync(int jobId);

        Task<bool> UpdateApplicationStatusAsync(
            int applicationId,
            string status
        );
        Task<RecruiterDashboardDto> GetRecruiterDashboardAsync();

        Task<RecruiterAnalyticsDto> GetRecruiterAnalyticsAsync();
      
    }
}