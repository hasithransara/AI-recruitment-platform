using System.ComponentModel.DataAnnotations;

namespace AIRecruitment.API.Models
{
    public class Job
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Company { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Location { get; set; } = string.Empty;

        [MaxLength(50)]
        public string JobType { get; set; } = "Full Time";

        [MaxLength(50)]
        public string ExperienceLevel { get; set; } = "Entry";

        public decimal Salary { get; set; }

        public string Description { get; set; } = string.Empty;

        public DateTime PostedDate { get; set; } = DateTime.UtcNow;

        public bool IsActive { get; set; } = true;
    }
}