using System.ComponentModel.DataAnnotations;

namespace AIRecruitment.API.DTOs.HiringManager
{
    public class InterviewFeedbackRequestDto
    {
        [Required]
        public int ApplicationId { get; set; }

        [Range(0, 10)]
        public int TechnicalScore { get; set; }

        [Range(0, 10)]
        public int CommunicationScore { get; set; }

        [Range(0, 10)]
        public int ProblemSolvingScore { get; set; }

        [Range(0, 10)]
        public int CultureFitScore { get; set; }

        [Required]
        [MaxLength(2000)]
        public string Comments { get; set; }
            = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Recommendation { get; set; }
            = "Pending";
    }
}