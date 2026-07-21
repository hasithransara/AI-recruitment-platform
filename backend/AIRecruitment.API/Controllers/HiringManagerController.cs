using AIRecruitment.API.DTOs.HiringManager;
using AIRecruitment.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AIRecruitment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class HiringManagerController
        : ControllerBase
    {
        private readonly IHiringManagerRepository
            _repository;

        private static readonly string[]
            AllowedDecisions =
        {
            "Pending",
            "Approved",
            "Rejected"
        };

        private static readonly string[]
            AllowedRecommendations =
        {
            "Pending",
            "Recommend Hire",
            "Recommend Reject",
            "Second Interview"
        };

        public HiringManagerController(
            IHiringManagerRepository repository
        )
        {
            _repository = repository;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult>
            GetDashboard()
        {
            var dashboard =
                await _repository
                    .GetDashboardAsync();

            return Ok(dashboard);
        }

        [HttpGet("candidates")]
        public async Task<IActionResult>
            GetCandidates()
        {
            var candidates =
                await _repository
                    .GetCandidatesAsync();

            return Ok(candidates);
        }

        [HttpGet(
            "candidates/{applicationId:int}"
        )]
        public async Task<IActionResult>
            GetCandidate(int applicationId)
        {
            var candidate =
                await _repository
                    .GetCandidateByApplicationIdAsync(
                        applicationId
                    );

            if (candidate == null)
            {
                return NotFound(new
                {
                    message =
                        "Candidate application not found."
                });
            }

            return Ok(candidate);
        }

        [HttpPost("feedback")]
        public async Task<IActionResult>
            CreateFeedback(
                InterviewFeedbackRequestDto dto
            )
        {
            var userId = GetCurrentUserId();

            if (userId == null)
            {
                return Unauthorized(new
                {
                    message =
                        "Invalid user token."
                });
            }

            var normalizedRecommendation =
                AllowedRecommendations
                    .FirstOrDefault(
                        recommendation =>
                            recommendation.Equals(
                                dto.Recommendation,
                                StringComparison
                                    .OrdinalIgnoreCase
                            )
                    );

            if (normalizedRecommendation == null)
            {
                return BadRequest(new
                {
                    message =
                        "Recommendation must be Pending, Recommend Hire, Recommend Reject, or Second Interview."
                });
            }

            dto.Recommendation =
                normalizedRecommendation;

            var created =
                await _repository
                    .CreateFeedbackAsync(
                        userId.Value,
                        dto
                    );

            if (!created)
            {
                return BadRequest(new
                {
                    message =
                        "Feedback could not be created. The application may not be shortlisted, or feedback may already exist."
                });
            }

            return Ok(new
            {
                message =
                    "Interview feedback created successfully."
            });
        }

        [HttpPut(
            "feedback/{applicationId:int}"
        )]
        public async Task<IActionResult>
            UpdateFeedback(
                int applicationId,
                UpdateInterviewFeedbackDto dto
            )
        {
            var userId = GetCurrentUserId();

            if (userId == null)
            {
                return Unauthorized(new
                {
                    message =
                        "Invalid user token."
                });
            }

            var normalizedRecommendation =
                AllowedRecommendations
                    .FirstOrDefault(
                        recommendation =>
                            recommendation.Equals(
                                dto.Recommendation,
                                StringComparison
                                    .OrdinalIgnoreCase
                            )
                    );

            if (normalizedRecommendation == null)
            {
                return BadRequest(new
                {
                    message =
                        "Recommendation must be Pending, Recommend Hire, Recommend Reject, or Second Interview."
                });
            }

            dto.Recommendation =
                normalizedRecommendation;

            var updated =
                await _repository
                    .UpdateFeedbackAsync(
                        applicationId,
                        userId.Value,
                        dto
                    );

            if (!updated)
            {
                return NotFound(new
                {
                    message =
                        "Interview feedback not found."
                });
            }

            return Ok(new
            {
                message =
                    "Interview feedback updated successfully."
            });
        }

        [HttpPut(
            "decisions/{applicationId:int}"
        )]
        public async Task<IActionResult>
            UpdateDecision(
                int applicationId,
                HiringDecisionRequestDto dto
            )
        {
            var userId = GetCurrentUserId();

            if (userId == null)
            {
                return Unauthorized(new
                {
                    message =
                        "Invalid user token."
                });
            }

            var normalizedDecision =
                AllowedDecisions.FirstOrDefault(
                    decision =>
                        decision.Equals(
                            dto.Decision,
                            StringComparison
                                .OrdinalIgnoreCase
                        )
                );

            if (normalizedDecision == null)
            {
                return BadRequest(new
                {
                    message =
                        "Decision must be Pending, Approved, or Rejected."
                });
            }

            var updated =
                await _repository
                    .UpdateHiringDecisionAsync(
                        applicationId,
                        userId.Value,
                        normalizedDecision
                    );

            if (!updated)
            {
                return NotFound(new
                {
                    message =
                        "Candidate application not found."
                });
            }

            return Ok(new
            {
                message =
                    $"Hiring decision updated to {normalizedDecision}."
            });
        }

        private int? GetCurrentUserId()
        {
            var userIdValue =
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier
                );

            if (
                int.TryParse(
                    userIdValue,
                    out var userId
                )
            )
            {
                return userId;
            }

            return null;
        }
    }
}