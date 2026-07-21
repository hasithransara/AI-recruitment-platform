using System.ComponentModel.DataAnnotations;

namespace AIRecruitment.API.DTOs.Admin
{
    public class UpdateJobStatusDto
    {
        [Required]
        public bool IsActive { get; set; }
    }
}