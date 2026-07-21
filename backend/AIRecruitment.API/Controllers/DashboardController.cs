using AIRecruitment.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AIRecruitment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IApplicationRepository _repository;

        public DashboardController(
            IApplicationRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("recruiter")]
        public async Task<IActionResult> RecruiterDashboard()
        {
            var dashboard =
                await _repository.GetRecruiterDashboardAsync();

            return Ok(dashboard);
        }

        [HttpGet("recruiter/analytics")]
        public async Task<IActionResult> RecruiterAnalytics()
        {
            var analytics = await _repository.GetRecruiterAnalyticsAsync();

            return Ok(analytics);
        }
    }
}