using System.ComponentModel.DataAnnotations;

namespace AIRecruitment.API.DTOs.Admin
{
    public class UpdateUserStatusDto
    {
        [Required]
        public bool IsActive { get; set; }
    }
}