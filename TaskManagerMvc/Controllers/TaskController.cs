

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }


    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto taskDto)
    {
        if(taskDto == null)
            return BadRequest();

        var task = new Task
        {
            Name = taskDto.Name,
            Description = taskDto.Description,
            DueDate = taskDto.DueDate,
            Status = taskDto.Status,
            ProjectId = taskDto.ProjectId,
            AssignedToUserId = taskDto.AssignedToUserId
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }

    

        [HttpGet("{Id}")]
        [Authorize]

        public async Task<IActionResult> GetTask(int id){
            
            var task = await _context.Tasks
                .Include(t => t.Project)
                .Include(t => t.AssignedUser)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (task == null)
                return NotFound();

            return Ok(task);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] Task updatedTask)
        {
            if (id != updatedTask.Id)
                return BadRequest();

            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();

            // Update task properties
            task.Name = updatedTask.Name;
            task.Description = updatedTask.Description;
            task.DueDate = updatedTask.DueDate;
            task.Status = updatedTask.Status;
            task.AssignedToUserId = updatedTask.AssignedToUserId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

    }