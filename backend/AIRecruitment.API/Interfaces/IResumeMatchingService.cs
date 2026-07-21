using AIRecruitment.API.Models;

namespace AIRecruitment.API.Interfaces
{
    public interface IResumeMatchingService
    {
        ResumeMatchResult CalculateMatch(
            string? resumeText,
            string? jobDescription
        );
    }
}