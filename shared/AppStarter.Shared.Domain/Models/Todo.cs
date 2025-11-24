using System;

namespace AppStarter.Shared.Domain.Models;

public class Todo : Base
{
    public required string Title { get; set; }
    public string? Description { get; set; } = null;
    public bool IsCompleted { get; set; } = false;
}
