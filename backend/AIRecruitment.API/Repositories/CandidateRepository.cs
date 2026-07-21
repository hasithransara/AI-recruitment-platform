using AIRecruitment.API.Data;
using AIRecruitment.API.DTOs.Candidate;
using AIRecruitment.API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AIRecruitment.API.Repositories
{
    public class CandidateRepository : ICandidateRepository
    {
        private readonly ApplicationDbContext _context;

        public CandidateRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CandidateDashboardDto> GetDashboardAsync(int userId)
        {
            var applications = await _context.Applications
                .Include(a => a.Job)
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.AppliedDate)
                .ToListAsync();

            var activeJobs = await _context.Jobs
                .Where(j => j.IsActive)
                .OrderByDescending(j => j.PostedDate)
                .Take(5)
                .ToListAsync();

            var dto = new CandidateDashboardDto
            {
                TotalApplications = applications.Count,

                TotalInterviews = applications.Count(a =>
                    a.Status == "Interview"),

                AverageMatchScore = applications.Any(a => a.MatchScore.HasValue)
                    ? Math.Round(
                        applications
                            .Where(a => a.MatchScore.HasValue)
                            .Average(a => a.MatchScore!.Value),
                        2)
                    : 0,

                SavedJobs = 0
            };

            dto.RecommendedJobs = activeJobs.Select(job =>
                new CandidateDashboardJobDto
                {
                    Id = job.Id,
                    Title = job.Title,
                    Company = job.Company,
                    Location = job.Location,
                    JobType = job.JobType,

                    // Temporary until AI recommendation is connected
                    MatchScore = 90
                }).ToList();

            dto.RecentApplications = applications
                .Take(5)
                .Select(app => new CandidateDashboardApplicationDto
                {
                    Id = app.Id,
                    JobId = app.JobId,
                    JobTitle = app.Job.Title,
                    Company = app.Job.Company,
                    Status = app.Status,
                    MatchScore = app.MatchScore,
                    AppliedDate = app.AppliedDate
                })
                .ToList();

            return dto;
        }
    }
}