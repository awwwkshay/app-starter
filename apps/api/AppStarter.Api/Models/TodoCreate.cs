using AppStarter.Shared.Domain.Models;

namespace AppStarter.Api.Models;

public class TodoCreate
{
    public required string Title { get; set; }
    public string? Description { get; set; } = null;
    public bool IsCompleted { get; set; } = false;

    public Todo ToTodo()
    {
        return new Todo
        {
            Title = this.Title,
            Description = this.Description,
            IsCompleted = this.IsCompleted
        };
    }
}
