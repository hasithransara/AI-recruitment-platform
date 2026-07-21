using System.ComponentModel.DataAnnotations;

namespace AIRecruitment.API.DTOs
{
    public class UpdateApplicationStatusDto
    {
        [Required]
        public string Status { get; set; } = string.Empty;
    }
}