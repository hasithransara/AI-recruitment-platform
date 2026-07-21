using AIRecruitment.API.DTOs.HiringManager;

namespace AIRecruitment.API.Interfaces
{
    public interface IHiringManagerRepository
    {
        Task<HiringManagerDashboardDto>
            GetDashboardAsync();

        Task<List<HiringManagerCandidateDto>>
            GetCandidatesAsync();

        Task<HiringManagerCandidateDto?>
            GetCandidateByApplicationIdAsync(
                int applicationId
            );

        Task<bool> CreateFeedbackAsync(
            int hiringManagerUserId,
            InterviewFeedbackRequestDto dto
        );

        Task<bool> UpdateFeedbackAsync(
            int applicationId,
            int hiringManagerUserId,
            UpdateInterviewFeedbackDto dto
        );

        Task<bool> UpdateHiringDecisionAsync(
            int applicationId,
            int hiringManagerUserId,
            string decision
        );
    }
}