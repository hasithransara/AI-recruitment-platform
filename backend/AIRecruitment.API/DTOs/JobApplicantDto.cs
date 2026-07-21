namespace AIRecruitment.API.DTOs
{
    public class JobApplicantDto
    {
        public int ApplicationId { get; set; }

        public int UserId { get; set; }

        public int JobId { get; set; }

        public string CandidateName { get; set; } = string.Empty;

        public string CandidateEmail { get; set; } = string.Empty;

        public string? Phone { get; set; }

        public string? ResumeUrl { get; set; }

        public DateTime AppliedDate { get; set; }

        public string Status { get; set; } = string.Empty;

        public double? MatchScore { get; set; }

        public string? MatchedSkills { get; set; }

        public string? MissingSkills { get; set; }
    }
}