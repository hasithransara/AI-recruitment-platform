namespace AIRecruitment.API.DTOs
{
    public class RecruiterAnalyticsDto
    {
        public List<JobApplicationsDto> ApplicationsPerJob { get; set; } = new();

        public List<StatusCountDto> ApplicationStatus { get; set; } = new();

        public List<MatchRangeDto> MatchDistribution { get; set; } = new();

        public List<RecentApplicationDto> RecentApplications { get; set; } = new();
    }

    public class JobApplicationsDto
    {
        public string JobTitle { get; set; } = "";
        public int Count { get; set; }
    }

    public class StatusCountDto
    {
        public string Status { get; set; } = "";
        public int Count { get; set; }
    }

    public class MatchRangeDto
    {
        public string Range { get; set; } = "";
        public int Count { get; set; }
    }

    public class RecentApplicationDto
    {
        public int ApplicationId { get; set; }

        public string CandidateName { get; set; } = "";

        public string JobTitle { get; set; } = "";

        public string Status { get; set; } = "";

        public double MatchScore { get; set; }

        public DateTime AppliedDate { get; set; }
    }
}