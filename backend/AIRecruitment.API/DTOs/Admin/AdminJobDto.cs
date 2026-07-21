namespace AIRecruitment.API.DTOs.Admin
{
    public class AdminJobDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Company { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public string JobType { get; set; } = string.Empty;

        public string ExperienceLevel { get; set; } = string.Empty;

        public decimal Salary { get; set; }

        public DateTime PostedDate { get; set; }

        public bool IsActive { get; set; }

        public int ApplicationCount { get; set; }
    }
}