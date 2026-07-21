using System.ComponentModel.DataAnnotations;

namespace AIRecruitment.API.DTOs.Admin
{
    public class UpdateUserRoleDto
    {
        [Required]
        public string Role { get; set; } = string.Empty;
    }
}