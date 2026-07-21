using AIRecruitment.API.DTOs;
using AIRecruitment.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AIRecruitment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly IJobRepository _repository;

        public JobsController(IJobRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllJobs()
        {
            var jobs = await _repository.GetAllJobsAsync();

            return Ok(jobs);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetJobById(int id)
        {
            var job = await _repository.GetJobByIdAsync(id);

            if (job == null)
            {
                return NotFound(new
                {
                    message = "Job not found."
                });
            }

            return Ok(job);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateJob(CreateJobDto dto)
        {
            var job = await _repository.CreateJobAsync(dto);

            return CreatedAtAction(
                nameof(GetJobById),
                new { id = job.Id },
                job
            );
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateJob(
            int id,
            UpdateJobDto dto
        )
        {
            var updatedJob = await _repository.UpdateJobAsync(id, dto);

            if (updatedJob == null)
            {
                return NotFound(new
                {
                    message = "Job not found."
                });
            }

            return Ok(new
            {
                message = "Job updated successfully.",
                job = updatedJob
            });
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteJob(int id)
        {
            var deleted = await _repository.DeleteJobAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "Job not found."
                });
            }

            return Ok(new
            {
                message = "Job deleted successfully."
            });
        }
    }
}