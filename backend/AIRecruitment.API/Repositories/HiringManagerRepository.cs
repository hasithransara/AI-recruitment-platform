using AIRecruitment.API.Data;
using AIRecruitment.API.DTOs.HiringManager;
using AIRecruitment.API.Interfaces;
using AIRecruitment.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AIRecruitment.API.Repositories
{
    public class HiringManagerRepository : IHiringManagerRepository
    {
        private readonly ApplicationDbContext _context;

        public HiringManagerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<HiringManagerDashboardDto> GetDashboardAsync()
        {
            var recentCandidates = await GetCandidatesAsync();

            return new HiringManagerDashboardDto
            {
                CandidatesToReview = await _context.Applications.CountAsync(a => a.Status == "Shortlisted"),
                InterviewsToday = 0,
                PendingDecisions = await _context.Applications.CountAsync(a => a.Status == "Shortlisted"),
                Approved = await _context.Applications.CountAsync(a => a.Status == "Hired"),
                Rejected = await _context.Applications.CountAsync(a => a.Status == "Rejected"),
                RecentCandidates = recentCandidates.Take(5).ToList()
            };
        }

        public async Task<List<HiringManagerCandidateDto>> GetCandidatesAsync()
        {
            return await _context.Applications
                .AsNoTracking()
                .Where(a =>
                    a.Status == "Shortlisted" ||
                    a.Status == "Hired" ||
                    a.Status == "Rejected")
                .Include(a => a.User)
                    .ThenInclude(u => u.CandidateProfile)
                .Include(a => a.Job)
                .OrderByDescending(a => a.MatchScore)
                .Select(a => new HiringManagerCandidateDto
                {
                    ApplicationId = a.Id,
                    CandidateUserId = a.UserId,
                    JobId = a.JobId,
                    CandidateName = a.User.FullName,
                    CandidateEmail = a.User.Email,
                    Phone = a.User.CandidateProfile != null ? a.User.CandidateProfile.Phone : null,
                    ResumeUrl = a.User.CandidateProfile != null ? a.User.CandidateProfile.ResumeUrl : null,
                    JobTitle = a.Job.Title,
                    Company = a.Job.Company,
                    AppliedDate = a.AppliedDate,
                    ApplicationStatus = a.Status,
                    MatchScore = a.MatchScore ?? 0,
                    MatchedSkills = a.MatchedSkills,
                    MissingSkills = a.MissingSkills,

                    TechnicalScore = null,
                    CommunicationScore = null,
                    ProblemSolvingScore = null,
                    CultureFitScore = null,
                    Comments = null,
                    Recommendation = "Pending",
                    Decision = "Pending",
                    AverageInterviewScore = 0
                })
                .ToListAsync();
        }

        public async Task<HiringManagerCandidateDto?> GetCandidateByApplicationIdAsync(int applicationId)
        {
            return (await GetCandidatesAsync())
                .FirstOrDefault(x => x.ApplicationId == applicationId);
        }

        public async Task<bool> CreateFeedbackAsync(
            int hiringManagerUserId,
            InterviewFeedbackRequestDto dto)
        {
            // Temporary implementation
            return await Task.FromResult(true);
        }

        public async Task<bool> UpdateFeedbackAsync(
            int applicationId,
            int hiringManagerUserId,
            UpdateInterviewFeedbackDto dto)
        {
            // Temporary implementation
            return await Task.FromResult(true);
        }

        public async Task<bool> UpdateHiringDecisionAsync(
            int applicationId,
            int hiringManagerUserId,
            string decision)
        {
            var application = await _context.Applications.FindAsync(applicationId);

            if (application == null)
                return false;

            application.Status = decision switch
            {
                "Approved" => "Hired",
                "Rejected" => "Rejected",
                _ => "Shortlisted"
            };

            await _context.SaveChangesAsync();

            return true;
        }
    }
}