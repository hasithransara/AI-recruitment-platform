using AIRecruitment.API.DTOs;

namespace AIRecruitment.API.Interfaces
{
    public interface IAuthRepository
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto dto);

        Task<AuthResponseDto> LoginAsync(LoginDto dto);
    }
}