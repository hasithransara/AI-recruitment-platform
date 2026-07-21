using System.Security.Claims;
using AIRecruitment.API.DTOs;
using AIRecruitment.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace AIRecruitment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileRepository _repository;

        public ProfileController(IProfileRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMyProfile()
        {
            var userId = int.Parse(
                User.FindFirstValue(ClaimTypes.NameIdentifier)!
            );

            var profile = await _repository.GetProfileAsync(userId);

            if (profile == null)
                return NotFound("Profile not found.");

            return Ok(profile);
        }

        [HttpPut("me")]
        public async Task<IActionResult> UpdateProfile(
            UpdateProfileDto dto)
        {
            var userId = int.Parse(
                User.FindFirstValue(ClaimTypes.NameIdentifier)!
            );

            var success = await _repository.UpdateProfileAsync(
                userId,
                dto);

            if (!success)
                return NotFound();

            return Ok(new
            {
                Message = "Profile updated successfully."
            });
        }

        [HttpPost("upload-resume")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadResume(
    [FromForm] ResumeUploadDto dto)
        {
            try
            {
                var userId = int.Parse(
                    User.FindFirstValue(
                        ClaimTypes.NameIdentifier
                    )!
                );

                if (dto.Resume == null || dto.Resume.Length == 0)
                {
                    return BadRequest(new
                    {
                        Message = "Please select a resume file."
                    });
                }

                var result = await _repository.UploadResumeAsync(
                    userId,
                    dto.Resume
                );

                if (result == null)
                {
                    return BadRequest(new
                    {
                        Message = "Resume upload failed."
                    });
                }

                return Ok(new
                {
                    Message = "Resume uploaded and analyzed successfully.",
                    ResumeUrl = result
                });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new
                {
                    Message = ex.Message
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

                return StatusCode(500, new
                {
                    Message = "An error occurred while processing the resume."
                });
            }
        }
    }
    
}