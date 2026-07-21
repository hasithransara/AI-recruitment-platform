using System.ComponentModel.DataAnnotations;

namespace AIRecruitment.API.DTOs.HiringManager
{
    public class HiringDecisionRequestDto
    {
        [Required]
        public string Decision { get; set; }
            = string.Empty;
    }
}