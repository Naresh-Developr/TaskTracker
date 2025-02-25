using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase{
    
    public readonly AppDbContext _context;
    public ProjectsController(AppDbContext context )
    {
        _context = context;
    }

    [HttpPost]
    [Authorize(Roles="Admin")]

    public async Task<IActionResult> CreateProject([FromBody] Project project){

        if(project == null){
            return BadRequest();
        }

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProject), new  {id = project.Id, project});
    }

    [HttpGet]
    [Authorize]

    public async Task<IActionResult> GetProject()
    {
        var projects = await _context.Projects
        .Include(p => p.Tasks) 
        .Include(p=>p.UserProjects)
        .ThenInclude(up=>up.User)
        .ToListAsync();
        
        return Ok(projects);
    
    }

    [HttpPost("assign")]
    [Authorize(Roles= "Admin")]

    public async Task<IActionResult> AssignUsersToProject([FromBody] AssignProjectRequest request)
    {
        var projects = await _context.Projects.FindAsync(request.ProjectId);
        if(projects==null){ return BadRequest();}

        foreach(var userId in request.UserIds){
            if(!_context.UserProjects.Any(up  => up.ProjectId == request.ProjectId && up.UserId == userId))
            {
                _context.UserProjects.Add(new UserProject
                {
                    ProjectId = request.ProjectId,
                    UserId = userId

                });

            }
        }
        await _context.SaveChangesAsync();

        return Ok(new { message = "Users assigned successfully."});
    }


}