using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AIRecruitment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [Authorize]
        [HttpGet]
        public IActionResult GetSecret()
        {
            return Ok(new
            {
                Message = "Congratulations! JWT Authentication is working.",
                User = User.Identity?.Name
            });
        }
    }
}