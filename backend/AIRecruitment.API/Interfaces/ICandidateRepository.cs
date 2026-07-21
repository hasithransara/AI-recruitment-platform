using AIRecruitment.API.DTOs.Candidate;

namespace AIRecruitment.API.Interfaces
{
    public interface ICandidateRepository
    {
        Task<CandidateDashboardDto> GetDashboardAsync(int userId);
    }
}