using System.ComponentModel.DataAnnotations;

namespace AIRecruitment.API.DTOs
{
    public class UpdateJobDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Company { get; set; } = string.Empty;

        [Required]
        public string Location { get; set; } = string.Empty;

        [Required]
        public string JobType { get; set; } = string.Empty;

        [Required]
        public string ExperienceLevel { get; set; } = string.Empty;

        public decimal Salary { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        public bool IsActive { get; set; }
    }
}