namespace AIRecruitment.API.DTOs
{
    public class RecruiterDashboardDto
    {
        public int ActiveJobs { get; set; }

        public int TotalApplications { get; set; }

        public int Shortlisted { get; set; }

        public int Hired { get; set; }
    }
}