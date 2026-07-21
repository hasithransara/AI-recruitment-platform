using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AIRecruitment.API.Models
{
    public class CandidateProfile
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public User? User { get; set; }

        [MaxLength(15)]
        public string? Phone { get; set; }

        [MaxLength(150)]
        public string? Address { get; set; }

        [MaxLength(100)]
        public string? City { get; set; }

        [MaxLength(100)]
        public string? Country { get; set; }

        [MaxLength(200)]
        public string? LinkedIn { get; set; }

        [MaxLength(200)]
        public string? GitHub { get; set; }

        [MaxLength(200)]
        public string? Portfolio { get; set; }

        public string? AboutMe { get; set; }

        public string? ResumeUrl { get; set; }

        public string? ResumeText { get; set; }

        public string? ProfileImage { get; set; }

    }
}