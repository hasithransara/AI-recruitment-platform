namespace AIRecruitment.API.DTOs.Admin
{
    public class AdminDashboardDto
    {
        public int TotalUsers { get; set; }

        public int TotalCandidates { get; set; }

        public int TotalRecruiters { get; set; }

        public int TotalHiringManagers { get; set; }

        public int TotalJobs { get; set; }

        public int ActiveJobs { get; set; }

        public int TotalApplications { get; set; }

        public int TotalInterviews { get; set; }
    }
}