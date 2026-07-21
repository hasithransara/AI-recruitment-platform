using Microsoft.AspNetCore.Http;

namespace AIRecruitment.API.DTOs
{
    public class ResumeUploadDto
    {
        public IFormFile Resume { get; set; } = null!;
    }
}