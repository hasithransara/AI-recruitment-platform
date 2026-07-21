namespace AIRecruitment.API.DTOs.HiringManager
{
    public class HiringManagerDashboardDto
    {
        public int CandidatesToReview { get; set; }

        public int InterviewsToday { get; set; }

        public int PendingDecisions { get; set; }

        public int Approved { get; set; }

        public int Rejected { get; set; }

        public List<HiringManagerCandidateDto>
            RecentCandidates
        { get; set; } = new();
    }
}