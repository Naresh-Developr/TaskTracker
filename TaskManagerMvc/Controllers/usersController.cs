using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/users
    [HttpGet]
    [Authorize] // Only authorized users can access this endpoint. Adjust as needed.
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.Users
            .Select(u => new 
            {
                u.Id,
                u.Name,
                u.Email,
                u.RoleId
                // Exclude passwordHash or any sensitive data
            })
            .ToListAsync();
        
        return Ok(users);
    }
}
