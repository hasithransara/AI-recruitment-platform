using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AIRecruitment.API.Models
{
    public class Application
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int JobId { get; set; }

        public DateTime AppliedDate { get; set; }
            = DateTime.UtcNow;

        [Required]
        public string Status { get; set; }
            = "Pending";

        public double? MatchScore { get; set; }

        public string? MatchedSkills { get; set; }

        public string? MissingSkills { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;

        [ForeignKey(nameof(JobId))]
        public Job Job { get; set; } = null!;

        public InterviewFeedback? InterviewFeedback
        {
            get;
            set;
        }
    }
}