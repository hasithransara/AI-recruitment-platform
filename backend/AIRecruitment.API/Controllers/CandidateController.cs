using System.Security.Claims;
using AIRecruitment.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AIRecruitment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Candidate")]
    public class CandidateController : ControllerBase
    {
        private readonly ICandidateRepository _candidateRepository;

        public CandidateController(
            ICandidateRepository candidateRepository)
        {
            _candidateRepository = candidateRepository;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            var userIdClaim = User.FindFirst(
                ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized(new
                {
                    message = "User ID was not found in the token."
                });
            }

            if (!int.TryParse(
                    userIdClaim.Value,
                    out var userId))
            {
                return Unauthorized(new
                {
                    message = "Invalid user ID in the token."
                });
            }

            var dashboard =
                await _candidateRepository
                    .GetDashboardAsync(userId);

            return Ok(dashboard);
        }
    }
}