using AIRecruitment.API.DTOs;
using AIRecruitment.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AIRecruitment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ApplicationsController : ControllerBase
    {
        private readonly IApplicationRepository _repository;

        private static readonly string[] AllowedStatuses =
        {
            "Pending",
            "Shortlisted",
            "Rejected",
            "Hired"
        };

        public ApplicationsController(
            IApplicationRepository repository
        )
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> Apply(
            ApplyJobDto dto
        )
        {
            var userIdValue = User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (!int.TryParse(userIdValue, out var userId))
            {
                return Unauthorized(new
                {
                    message = "Invalid user token."
                });
            }

            var success =
                await _repository.ApplyForJobAsync(
                    userId,
                    dto.JobId
                );

            if (!success)
            {
                return BadRequest(new
                {
                    message =
                        "Unable to apply. The job may be inactive, missing, or you may have already applied."
                });
            }

            return Ok(new
            {
                message =
                    "Application submitted successfully."
            });
        }

        [HttpGet("my")]
        public async Task<IActionResult>
            GetMyApplications()
        {
            var userIdValue = User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (!int.TryParse(userIdValue, out var userId))
            {
                return Unauthorized(new
                {
                    message = "Invalid user token."
                });
            }

            var applications =
                await _repository
                    .GetMyApplicationsAsync(userId);

            return Ok(applications);
        }

        [HttpGet("job/{jobId:int}")]
        public async Task<IActionResult>
            GetApplicantsByJob(int jobId)
        {
            var applicants =
                await _repository
                    .GetApplicantsByJobAsync(jobId);

            return Ok(applicants);
        }

        [HttpPut("{applicationId:int}/status")]
        public async Task<IActionResult>
            UpdateApplicationStatus(
                int applicationId,
                UpdateApplicationStatusDto dto
            )
        {
            if (string.IsNullOrWhiteSpace(dto.Status))
            {
                return BadRequest(new
                {
                    message = "Status is required."
                });
            }

            var normalizedStatus =
                AllowedStatuses.FirstOrDefault(
                    status =>
                        status.Equals(
                            dto.Status,
                            StringComparison.OrdinalIgnoreCase
                        )
                );

            if (normalizedStatus == null)
            {
                return BadRequest(new
                {
                    message =
                        "Status must be Pending, Shortlisted, Rejected, or Hired."
                });
            }

            var updated =
                await _repository
                    .UpdateApplicationStatusAsync(
                        applicationId,
                        normalizedStatus
                    );

            if (!updated)
            {
                return NotFound(new
                {
                    message =
                        "Application not found."
                });
            }

            return Ok(new
            {
                message =
                    "Application status updated successfully."
            });
        }
    }
}