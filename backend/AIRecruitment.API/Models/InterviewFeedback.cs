using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AIRecruitment.API.Models
{
    public class InterviewFeedback
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ApplicationId { get; set; }

        [Required]
        public int HiringManagerUserId { get; set; }

        [Range(0, 10)]
        public int TechnicalScore { get; set; }

        [Range(0, 10)]
        public int CommunicationScore { get; set; }

        [Range(0, 10)]
        public int ProblemSolvingScore { get; set; }

        [Range(0, 10)]
        public int CultureFitScore { get; set; }

        [MaxLength(2000)]
        public string Comments { get; set; }
            = string.Empty;

        [MaxLength(50)]
        public string Recommendation { get; set; }
            = "Pending";

        [MaxLength(30)]
        public string Decision { get; set; }
            = "Pending";

        public DateTime CreatedAt { get; set; }
            = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; }
            = DateTime.UtcNow;

        [ForeignKey(nameof(ApplicationId))]
        public Application Application { get; set; }
            = null!;

        [ForeignKey(nameof(HiringManagerUserId))]
        public User HiringManager { get; set; }
            = null!;
    }
}