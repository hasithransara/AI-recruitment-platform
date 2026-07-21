using AIRecruitment.API.Data;
using AIRecruitment.API.DTOs;
using AIRecruitment.API.Interfaces;
using AIRecruitment.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AIRecruitment.API.Repositories
{
    public class ApplicationRepository
        : IApplicationRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IResumeMatchingService
            _matchingService;

        public ApplicationRepository(
            ApplicationDbContext context,
            IResumeMatchingService matchingService)
        {
            _context = context;
            _matchingService = matchingService;
        }

        public async Task<bool> ApplyForJobAsync(
            int userId,
            int jobId)
        {
            var job = await _context.Jobs
                .FirstOrDefaultAsync(job =>
                    job.Id == jobId &&
                    job.IsActive
                );

            if (job == null)
            {
                return false;
            }

            var alreadyApplied =
                await _context.Applications
                    .AnyAsync(application =>
                        application.UserId == userId &&
                        application.JobId == jobId
                    );

            if (alreadyApplied)
            {
                return false;
            }

            var profile =
                await _context.CandidateProfiles
                    .AsNoTracking()
                    .FirstOrDefaultAsync(profile =>
                        profile.UserId == userId
                    );

            var matchResult =
                _matchingService.CalculateMatch(
                    profile?.ResumeText,
                    job.Description
                );

            var application = new Application
            {
                UserId = userId,
                JobId = jobId,
                AppliedDate = DateTime.UtcNow,
                Status = "Pending",

                MatchScore =
                    matchResult.MatchScore,

                MatchedSkills = string.Join(
                    ", ",
                    matchResult.MatchedSkills
                ),

                MissingSkills = string.Join(
                    ", ",
                    matchResult.MissingSkills
                )
            };

            _context.Applications.Add(application);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<ApplicationDto>>
            GetMyApplicationsAsync(int userId)
        {
            return await _context.Applications
                .AsNoTracking()
                .Where(application =>
                    application.UserId == userId
                )
                .Include(application =>
                    application.Job
                )
                .OrderByDescending(application =>
                    application.AppliedDate
                )
                .Select(application =>
                    new ApplicationDto
                    {
                        Id = application.Id,

                        JobTitle =
                            application.Job.Title,

                        Company =
                            application.Job.Company,

                        AppliedDate =
                            application.AppliedDate,

                        Status =
                            application.Status,

                        MatchScore =
                            application.MatchScore,

                        MatchedSkills =
                            application.MatchedSkills,

                        MissingSkills =
                            application.MissingSkills
                    }
                )
                .ToListAsync();
        }

        public async Task<List<JobApplicantDto>>
            GetApplicantsByJobAsync(int jobId)
        {
            return await _context.Applications
                .AsNoTracking()
                .Where(application =>
                    application.JobId == jobId
                )
                .Include(application =>
                    application.User
                )
                .ThenInclude(user =>
                    user.CandidateProfile
                )
                .OrderByDescending(application =>
                    application.MatchScore
                )
                .ThenByDescending(application =>
                    application.AppliedDate
                )
                .Select(application =>
                    new JobApplicantDto
                    {
                        ApplicationId =
                            application.Id,

                        UserId =
                            application.UserId,

                        JobId =
                            application.JobId,

                        CandidateName =
                            application.User.FullName,

                        CandidateEmail =
                            application.User.Email,

                        Phone =
                            application.User
                                .CandidateProfile != null
                                ? application.User
                                    .CandidateProfile.Phone
                                : null,

                        ResumeUrl =
                            application.User
                                .CandidateProfile != null
                                ? application.User
                                    .CandidateProfile.ResumeUrl
                                : null,

                        AppliedDate =
                            application.AppliedDate,

                        Status =
                            application.Status,

                        MatchScore =
                            application.MatchScore,

                        MatchedSkills =
                            application.MatchedSkills,

                        MissingSkills =
                            application.MissingSkills
                    }
                )
                .ToListAsync();
        }

        public async Task<RecruiterDashboardDto> GetRecruiterDashboardAsync()
        {
            return new RecruiterDashboardDto
            {
                ActiveJobs = await _context.Jobs.CountAsync(j => j.IsActive),

                TotalApplications = await _context.Applications.CountAsync(),

                Shortlisted = await _context.Applications.CountAsync(a =>
                    a.Status == "Shortlisted"),

                Hired = await _context.Applications.CountAsync(a =>
                    a.Status == "Hired")
            };
        }

        public async Task<bool>
            UpdateApplicationStatusAsync(
                int applicationId,
                string status)
        {
            var application =
                await _context.Applications
                    .FindAsync(applicationId);

            if (application == null)
            {
                return false;
            }

            application.Status = status;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<RecruiterAnalyticsDto> GetRecruiterAnalyticsAsync()
        {
            // Applications per Job
            var applicationsPerJob = await _context.Applications
                .Include(a => a.Job)
                .GroupBy(a => a.Job.Title)
                .Select(g => new JobApplicationsDto
                {
                    JobTitle = g.Key,
                    Count = g.Count()
                })
                .OrderByDescending(x => x.Count)
                .ToListAsync();

            // Application Status
            var applicationStatus = await _context.Applications
                .GroupBy(a => a.Status)
                .Select(g => new StatusCountDto
                {
                    Status = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            // AI Match Distribution
            var applications = await _context.Applications
                .AsNoTracking()
                .ToListAsync();

            var matchDistribution = new List<MatchRangeDto>
    {
        new MatchRangeDto
        {
            Range = "90-100%",
            Count = applications.Count(a => (a.MatchScore ?? 0) >= 90)
        },
        new MatchRangeDto
        {
            Range = "80-89%",
            Count = applications.Count(a => (a.MatchScore ?? 0) >= 80 && (a.MatchScore ?? 0) < 90)
        },
        new MatchRangeDto
        {
            Range = "70-79%",
            Count = applications.Count(a => (a.MatchScore ?? 0) >= 70 && (a.MatchScore ?? 0) < 80)
        },
        new MatchRangeDto
        {
            Range = "60-69%",
            Count = applications.Count(a => (a.MatchScore ?? 0) >= 60 && (a.MatchScore ?? 0) < 70)
        },
        new MatchRangeDto
        {
            Range = "Below 60%",
            Count = applications.Count(a => (a.MatchScore ?? 0) < 60)
        }
    };

            // Recent Applications
            var recentApplications = await _context.Applications
                .Include(a => a.Job)
                .Include(a => a.User)
                .OrderByDescending(a => a.AppliedDate)
                .Take(5)
                .Select(a => new RecentApplicationDto
                {
                    ApplicationId = a.Id,
                    CandidateName = a.User.FullName,
                    JobTitle = a.Job.Title,
                    Status = a.Status,
                    MatchScore = a.MatchScore ?? 0,
                    AppliedDate = a.AppliedDate
                })
                .ToListAsync();

            return new RecruiterAnalyticsDto
            {
                ApplicationsPerJob = applicationsPerJob,
                ApplicationStatus = applicationStatus,
                MatchDistribution = matchDistribution,
                RecentApplications = recentApplications
            };
        }
    }
}