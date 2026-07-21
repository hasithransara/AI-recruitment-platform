namespace AIRecruitment.API.Models
{
    public class ResumeMatchResult
    {
        public double MatchScore { get; set; }

        public List<string> MatchedSkills { get; set; }
            = new();

        public List<string> MissingSkills { get; set; }
            = new();
    }
}