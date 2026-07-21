namespace AIRecruitment.API.DTOs
{
    public class ApplicationDto
    {
        public int Id { get; set; }

        public string JobTitle { get; set; } = string.Empty;

        public string Company { get; set; } = string.Empty;

        public DateTime AppliedDate { get; set; }

        public string Status { get; set; } = string.Empty;

        public double? MatchScore { get; set; }

        public string? MatchedSkills { get; set; }

        public string? MissingSkills { get; set; }
    }
}