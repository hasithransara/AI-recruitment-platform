namespace AIRecruitment.API.DTOs.Candidate
{
    public class CandidateDashboardDto
    {
        public int TotalApplications { get; set; }

        public int TotalInterviews { get; set; }

        public double AverageMatchScore { get; set; }

        public int SavedJobs { get; set; }

        public List<CandidateDashboardJobDto> RecommendedJobs { get; set; }
            = new();

        public List<CandidateDashboardApplicationDto> RecentApplications
        {
            get;
            set;
        } = new();
    }

    public class CandidateDashboardJobDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Company { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public string JobType { get; set; } = string.Empty;

        public double MatchScore { get; set; }
    }

    public class CandidateDashboardApplicationDto
    {
        public int Id { get; set; }

        public int JobId { get; set; }

        public string JobTitle { get; set; } = string.Empty;

        public string Company { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public double? MatchScore { get; set; }

        public DateTime AppliedDate { get; set; }
    }
}