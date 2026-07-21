using AIRecruitment.API.Data;
using AIRecruitment.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AIRecruitment.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult GetCurrentUser()
    {
        var email = User.FindFirst(ClaimTypes.Email)?.Value;

        var user = _context.Users.FirstOrDefault(u => u.Email == email);

        if (user == null)
            return NotFound();

        return Ok(new
        {
            user.Id,
            user.FullName,
            user.Email,
            user.Role
        });
    }

    [Authorize]
    [HttpPut("update")]
    public IActionResult UpdateProfile(ProfileDto dto)
    {
        var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;

        var user = _context.Users.FirstOrDefault(x => x.Email == email);

        if (user == null)
            return NotFound();

        user.FullName = dto.FullName;
        user.Phone = dto.Phone;
        user.Location = dto.Location;
        user.Headline = dto.Headline;
        user.About = dto.About;

        _context.SaveChanges();

        return Ok(new
        {
            message = "Profile updated successfully"
        });
    }
}