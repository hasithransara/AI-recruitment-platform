using AIRecruitment.API.Data;
using AIRecruitment.API.DTOs;
using AIRecruitment.API.Interfaces;
using AIRecruitment.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AIRecruitment.API.Repositories
{
    public class JobRepository : IJobRepository
    {
        private readonly ApplicationDbContext _context;

        public JobRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<JobDto> CreateJobAsync(CreateJobDto dto)
        {
            var job = new Job
            {
                Title = dto.Title,
                Company = dto.Company,
                Location = dto.Location,
                JobType = dto.JobType,
                ExperienceLevel = dto.ExperienceLevel,
                Salary = dto.Salary,
                Description = dto.Description,
                PostedDate = DateTime.UtcNow,
                IsActive = true
            };

            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();

            return ConvertToDto(job);
        }

        public async Task<List<JobDto>> GetAllJobsAsync()
        {
            return await _context.Jobs
                .AsNoTracking()
                .OrderByDescending(job => job.PostedDate)
                .Select(job => new JobDto
                {
                    Id = job.Id,
                    Title = job.Title,
                    Company = job.Company,
                    Location = job.Location,
                    JobType = job.JobType,
                    ExperienceLevel = job.ExperienceLevel,
                    Salary = job.Salary,
                    Description = job.Description,
                    PostedDate = job.PostedDate,
                    IsActive = job.IsActive
                })
                .ToListAsync();
        }

        public async Task<JobDto?> GetJobByIdAsync(int id)
        {
            var job = await _context.Jobs
                .AsNoTracking()
                .FirstOrDefaultAsync(job => job.Id == id);

            return job == null ? null : ConvertToDto(job);
        }

        public async Task<JobDto?> UpdateJobAsync(
            int id,
            UpdateJobDto dto
        )
        {
            var job = await _context.Jobs.FindAsync(id);

            if (job == null)
            {
                return null;
            }

            job.Title = dto.Title;
            job.Company = dto.Company;
            job.Location = dto.Location;
            job.JobType = dto.JobType;
            job.ExperienceLevel = dto.ExperienceLevel;
            job.Salary = dto.Salary;
            job.Description = dto.Description;
            job.IsActive = dto.IsActive;

            await _context.SaveChangesAsync();

            return ConvertToDto(job);
        }

        public async Task<bool> DeleteJobAsync(int id)
        {
            var job = await _context.Jobs.FindAsync(id);

            if (job == null)
            {
                return false;
            }

            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();

            return true;
        }

        private static JobDto ConvertToDto(Job job)
        {
            return new JobDto
            {
                Id = job.Id,
                Title = job.Title,
                Company = job.Company,
                Location = job.Location,
                JobType = job.JobType,
                ExperienceLevel = job.ExperienceLevel,
                Salary = job.Salary,
                Description = job.Description,
                PostedDate = job.PostedDate,
                IsActive = job.IsActive
            };
        }
    }
}