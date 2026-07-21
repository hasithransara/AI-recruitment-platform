using System.ComponentModel.DataAnnotations;

namespace AIRecruitment.API.DTOs
{
    public class CreateJobDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Company { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public string JobType { get; set; } = "Full Time";

        public string ExperienceLevel { get; set; } = "Entry";

        public decimal Salary { get; set; }

        public string Description { get; set; } = string.Empty;
    }
}