namespace AIRecruitment.API.Models
{
    public class User
    {
        public int Id { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string? Phone { get; set; }

        public string? Location { get; set; }

        public string? Headline { get; set; }

        public string? About { get; set; }

        public CandidateProfile? CandidateProfile { get; set; }
    }
}