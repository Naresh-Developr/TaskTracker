using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;



[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase{

    public readonly AppDbContext _context;
    public readonly IConfiguration _configuration;


    public AuthController(AppDbContext appDbContext, IConfiguration configuration)
    {
        _configuration = configuration;
        _context = appDbContext;
        
    }

    [HttpPost("signup")]
    public IActionResult SignUp([FromBody] SignUpRequest request)
{
    if(_context.Users.Any(u => u.Email == request.Email))
    {
        return BadRequest("A user with this email already exists");
    }

    var user = new User
    {
        Name = request.Name,
        Email = request.Email,
        passwordHash = PasswordHasher.HashPassword(request.passwordHash),
        RoleId = request.RoleId <= 0 ? 1 : request.RoleId
    };

    _context.Users.Add(user);
    _context.SaveChanges();

    return Ok();
}

    [HttpPost("signin")]

    public IActionResult SignIn([FromBody] SignInRequest signInRequest){
        var ExistingUser = _context.Users.Include(u => u.Role)
        .FirstOrDefault(e => e.Email == signInRequest.Email);

        if(ExistingUser == null || !PasswordHasher.verifyPassword(signInRequest.passwordHash, ExistingUser.passwordHash)){
            return BadRequest("Invaild email or PassWord");
        }

        var token = GenerateJwtToken(ExistingUser);

        return Ok(new
        {
            Token = token,
            Role = ExistingUser.Role.RoleName    
        }); 
    }

    private string GenerateJwtToken(User user)
{
    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role.RoleName)
    };

    var token = new JwtSecurityToken(
        issuer: _configuration["Jwt:Issuer"],
        audience: _configuration["Jwt:Audience"],
        claims: claims,
        expires: DateTime.Now.AddHours(1),
        signingCredentials: credentials
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}

}

