using AIRecruitment.API.DTOs;

namespace AIRecruitment.API.Services
{
    public class AIRecommendationService
    {
        public AIRecommendationDto GetRecommendation(
            double matchScore
        )
        {
            var result = new AIRecommendationDto();

            if (matchScore >= 90)
            {
                result.Level = "Highly Recommended";
            }
            else if (matchScore >= 75)
            {
                result.Level = "Recommended";
            }
            else if (matchScore >= 60)
            {
                result.Level = "Consider";
            }
            else
            {
                result.Level = "Not Recommended";
            }

            return result;
        }
    }
}