namespace AIRecruitment.API.DTOs
{
    public class ProfileDto
    {
        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string? Phone { get; set; }

        public string? Address { get; set; }


        public string Location { get; set; }

        public string? City { get; set; }

        public string? Country { get; set; }

        public string Headline { get; set; }

        public string About { get; set; }

        public string? LinkedIn { get; set; }

        public string? GitHub { get; set; }

        public string? Portfolio { get; set; }

        public string? AboutMe { get; set; }

        public string? ResumeUrl { get; set; }

        public string? ProfileImage { get; set; }
    }
}