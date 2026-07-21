using AIRecruitment.API.Data;
using AIRecruitment.API.DTOs.Admin;
using AIRecruitment.API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AIRecruitment.API.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly ApplicationDbContext _context;

        public AdminRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<AdminDashboardDto> GetDashboardAsync()
        {
            var totalUsers = await _context.Users.CountAsync();

            var totalCandidates = await _context.Users.CountAsync(user =>
                user.Role.ToLower() == "candidate");

            var totalRecruiters = await _context.Users.CountAsync(user =>
                user.Role.ToLower() == "recruiter");

            var totalHiringManagers = await _context.Users.CountAsync(user =>
                user.Role.ToLower() == "hiringmanager" ||
                user.Role.ToLower() == "hiring manager" ||
                user.Role.ToLower() == "hiring_manager");

            var totalJobs = await _context.Jobs.CountAsync();

            var activeJobs = await _context.Jobs.CountAsync(job =>
                job.IsActive);

            var totalApplications =
                await _context.Applications.CountAsync();

            var totalInterviews =
                await _context.Applications.CountAsync(application =>
                    application.Status.ToLower() == "interview");

            return new AdminDashboardDto
            {
                TotalUsers = totalUsers,
                TotalCandidates = totalCandidates,
                TotalRecruiters = totalRecruiters,
                TotalHiringManagers = totalHiringManagers,
                TotalJobs = totalJobs,
                ActiveJobs = activeJobs,
                TotalApplications = totalApplications,
                TotalInterviews = totalInterviews
            };
        }

        public async Task<List<AdminUserDto>> GetUsersAsync()
        {
            return await _context.Users
                .OrderByDescending(user => user.CreatedAt)
                .Select(user => new AdminUserDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    Role = user.Role,
                    IsActive = user.IsActive,
                    CreatedAt = user.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<AdminUserDto?> UpdateUserRoleAsync(
    int userId,
    string role
)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return null;
            }

            var normalizedRole = role
                .Trim()
                .ToLower()
                .Replace(" ", "")
                .Replace("_", "");

            var allowedRoles = new Dictionary<string, string>
    {
        { "candidate", "Candidate" },
        { "recruiter", "Recruiter" },
        { "hiringmanager", "HiringManager" },
        { "admin", "Admin" }
    };

            if (!allowedRoles.TryGetValue(
                    normalizedRole,
                    out var validRole))
            {
                throw new ArgumentException(
                    "Invalid role. Allowed roles are Candidate, Recruiter, HiringManager, and Admin."
                );
            }

            user.Role = validRole;

            await _context.SaveChangesAsync();

            return new AdminUserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<AdminUserDto?> UpdateUserStatusAsync(
    int userId,
    bool isActive
)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return null;
            }

            user.IsActive = isActive;

            await _context.SaveChangesAsync();

            return new AdminUserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role,
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<List<AdminJobDto>> GetJobsAsync()
        {
            return await _context.Jobs
                .OrderByDescending(job => job.PostedDate)
                .Select(job => new AdminJobDto
                {
                    Id = job.Id,
                    Title = job.Title,
                    Company = job.Company,
                    Location = job.Location,
                    JobType = job.JobType,
                    ExperienceLevel = job.ExperienceLevel,
                    Salary = job.Salary,
                    PostedDate = job.PostedDate,
                    IsActive = job.IsActive,

                    ApplicationCount = _context.Applications
                        .Count(application =>
                            application.JobId == job.Id)
                })
                .ToListAsync();
        }

        public async Task<AdminJobDto?> UpdateJobStatusAsync(
    int jobId,
    bool isActive
)
        {
            var job = await _context.Jobs.FindAsync(jobId);

            if (job == null)
            {
                return null;
            }

            job.IsActive = isActive;

            await _context.SaveChangesAsync();

            var applicationCount =
                await _context.Applications.CountAsync(application =>
                    application.JobId == job.Id);

            return new AdminJobDto
            {
                Id = job.Id,
                Title = job.Title,
                Company = job.Company,
                Location = job.Location,
                JobType = job.JobType,
                ExperienceLevel = job.ExperienceLevel,
                Salary = job.Salary,
                PostedDate = job.PostedDate,
                IsActive = job.IsActive,
                ApplicationCount = applicationCount
            };
        }


        public async Task<bool> DeleteJobAsync(int jobId)
        {
            var job = await _context.Jobs.FindAsync(jobId);

            if (job == null)
            {
                return false;
            }

            var hasApplications =
                await _context.Applications.AnyAsync(application =>
                    application.JobId == jobId);

            if (hasApplications)
            {
                throw new InvalidOperationException(
                    "This job cannot be deleted because it has existing applications. Deactivate the job instead."
                );
            }

            _context.Jobs.Remove(job);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<AdminReportsDto> GetReportsAsync()
        {
            var totalUsers = await _context.Users.CountAsync();

            var totalCandidates = await _context.Users.CountAsync(user =>
                user.Role == "Candidate");

            var totalRecruiters = await _context.Users.CountAsync(user =>
                user.Role == "Recruiter");

            var totalHiringManagers = await _context.Users.CountAsync(user =>
                user.Role == "HiringManager");

            var totalJobs = await _context.Jobs.CountAsync();

            var activeJobs = await _context.Jobs.CountAsync(job =>
                job.IsActive);

            var totalApplications = await _context.Applications.CountAsync();

            var interviewCount = await _context.Applications.CountAsync(application =>
                application.Status == "Interview");

            var hiredCount = await _context.Applications.CountAsync(application =>
                application.Status == "Hired");

            double averageMatchScore = 0;

            if (await _context.Applications.AnyAsync(application => application.MatchScore.HasValue))
            {
                averageMatchScore = await _context.Applications
                    .Where(application => application.MatchScore.HasValue)
                    .AverageAsync(application => application.MatchScore!.Value);
            }

            return new AdminReportsDto
            {
                TotalUsers = totalUsers,
                TotalCandidates = totalCandidates,
                TotalRecruiters = totalRecruiters,
                TotalHiringManagers = totalHiringManagers,
                TotalJobs = totalJobs,
                ActiveJobs = activeJobs,
                TotalApplications = totalApplications,
                InterviewCount = interviewCount,
                HiredCount = hiredCount,
                AverageMatchScore = Math.Round(averageMatchScore, 2)
            };
        }
    }


    
}