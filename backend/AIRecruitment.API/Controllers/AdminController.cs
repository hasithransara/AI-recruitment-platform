using AIRecruitment.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AIRecruitment.API.DTOs.Admin;
using System.Security.Claims;


namespace AIRecruitment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;

        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            var dashboard =
                await _adminRepository.GetDashboardAsync();

            return Ok(dashboard);
        }


        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _adminRepository.GetUsersAsync();

            return Ok(users);
        }

        [HttpPut("users/{userId:int}/role")]
        public async Task<IActionResult> UpdateUserRole(
    int userId,
    UpdateUserRoleDto dto
)
        {
            try
            {
                var updatedUser =
                    await _adminRepository.UpdateUserRoleAsync(
                        userId,
                        dto.Role
                    );

                if (updatedUser == null)
                {
                    return NotFound(new
                    {
                        message = "User not found."
                    });
                }

                return Ok(new
                {
                    message = "User role updated successfully.",
                    user = updatedUser
                });
            }
            catch (ArgumentException error)
            {
                return BadRequest(new
                {
                    message = error.Message
                });
            }
        }

        [HttpPut("users/{userId:int}/status")]
        public async Task<IActionResult> UpdateUserStatus(
    int userId,
    UpdateUserStatusDto dto
)
        {
            var currentUserIdValue =
                User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(currentUserIdValue, out var currentUserId))
            {
                return Unauthorized(new
                {
                    message = "Invalid authentication token."
                });
            }

            if (currentUserId == userId && !dto.IsActive)
            {
                return BadRequest(new
                {
                    message = "You cannot deactivate your own account."
                });
            }

            var updatedUser =
                await _adminRepository.UpdateUserStatusAsync(
                    userId,
                    dto.IsActive
                );

            if (updatedUser == null)
            {
                return NotFound(new
                {
                    message = "User not found."
                });
            }

            return Ok(new
            {
                message = dto.IsActive
                    ? "User account activated successfully."
                    : "User account deactivated successfully.",

                user = updatedUser
            });
        }

        [HttpGet("jobs")]
        public async Task<IActionResult> GetJobs()
        {
            var jobs = await _adminRepository.GetJobsAsync();

            return Ok(jobs);
        }

        [HttpPut("jobs/{jobId:int}/status")]
        public async Task<IActionResult> UpdateJobStatus(
    int jobId,
    UpdateJobStatusDto dto
)
        {
            var updatedJob =
                await _adminRepository.UpdateJobStatusAsync(
                    jobId,
                    dto.IsActive
                );

            if (updatedJob == null)
            {
                return NotFound(new
                {
                    message = "Job not found."
                });
            }

            return Ok(new
            {
                message = dto.IsActive
                    ? "Job activated successfully."
                    : "Job deactivated successfully.",

                job = updatedJob
            });
        }

        [HttpDelete("jobs/{jobId:int}")]
        public async Task<IActionResult> DeleteJob(int jobId)
        {
            try
            {
                var deleted =
                    await _adminRepository.DeleteJobAsync(jobId);

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
            catch (InvalidOperationException error)
            {
                return Conflict(new
                {
                    message = error.Message
                });
            }
        }

        [HttpGet("reports")]
        public async Task<IActionResult> GetReports()
        {
            var reports = await _adminRepository.GetReportsAsync();

            return Ok(reports);
        }
    }
}