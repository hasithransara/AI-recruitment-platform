using AIRecruitment.API.DTOs.Admin;

namespace AIRecruitment.API.Interfaces
{
    public interface IAdminRepository
    {
        Task<AdminDashboardDto> GetDashboardAsync();

        Task<List<AdminUserDto>> GetUsersAsync();

        Task<AdminUserDto?> UpdateUserRoleAsync(
            int userId,
            string role
        );

        Task<AdminUserDto?> UpdateUserStatusAsync(
            int userId,
            bool isActive
        );
        Task<List<AdminJobDto>> GetJobsAsync();

        Task<AdminJobDto?> UpdateJobStatusAsync(
            int jobId,
            bool isActive
        );

        Task<bool> DeleteJobAsync(int jobId);

        Task<AdminReportsDto> GetReportsAsync();
    }
}