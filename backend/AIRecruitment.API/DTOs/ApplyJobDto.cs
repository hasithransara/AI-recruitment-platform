using System.ComponentModel.DataAnnotations;

namespace AIRecruitment.API.DTOs
{
    public class ApplyJobDto
    {
        [Required]
        public int JobId { get; set; }
    }
}