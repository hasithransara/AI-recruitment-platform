namespace AIRecruitment.API.DTOs.HiringManager
{
    public class HiringManagerCandidateDto
    {
        public int ApplicationId { get; set; }

        public int CandidateUserId { get; set; }

        public int JobId { get; set; }

        public string CandidateName { get; set; }
            = string.Empty;

        public string CandidateEmail { get; set; }
            = string.Empty;

        public string? Phone { get; set; }

        public string? ResumeUrl { get; set; }

        public string JobTitle { get; set; }
            = string.Empty;

        public string Company { get; set; }
            = string.Empty;

        public DateTime AppliedDate { get; set; }

        public string ApplicationStatus { get; set; }
            = string.Empty;

        public double MatchScore { get; set; }

        public string? MatchedSkills { get; set; }

        public string? MissingSkills { get; set; }

        public int? TechnicalScore { get; set; }

        public int? CommunicationScore { get; set; }

        public int? ProblemSolvingScore { get; set; }

        public int? CultureFitScore { get; set; }

        public string? Comments { get; set; }

        public string Recommendation { get; set; }
            = "Pending";

        public string Decision { get; set; }
            = "Pending";

        public double AverageInterviewScore { get; set; }
    }
}