using AppStarter.Api;
using AppStarter.Api.Models;
using AppStarter.Shared.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

// Add services
builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApiDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("apiDb");

    if (string.IsNullOrWhiteSpace(connectionString))
        throw new Exception("Aspire did not inject the connection string.");

    options.UseNpgsql(connectionString);
});

var app = builder.Build();

//
// 🌱 Auto-run EF Core migrations during startup
//
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApiDbContext>();
    db.Database.Migrate(); // Always applies migrations and creates the database if needed
}

// Configure HTTP pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

// CRUD Endpoints
app.MapGet("/todos", async (ApiDbContext db) =>
    await db.Todos.ToListAsync()
).WithName("ReadTodos");

app.MapGet("/todos/{id}", async (ApiDbContext db, int id) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(todo)
            : Results.NotFound()
).WithName("ReadTodoById");

app.MapPost("/todos", async (ApiDbContext db, [FromBody] TodoCreate todoCreate) =>
{
    var todo = todoCreate.ToTodo();
    db.Todos.Add(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/todos/{todo.Id}", todo);
}).WithName("CreateTodo");

app.MapDelete("/todos/{id}", async (ApiDbContext db, int id) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo is null) return Results.NotFound();

    db.Todos.Remove(todo);
    await db.SaveChangesAsync();
    return Results.NoContent();
}).WithName("DeleteTodo");

app.MapPut("/todos/{id}", async (ApiDbContext db, int id, [FromBody] Todo updatedTodo) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo is null) return Results.NotFound();

    todo.Title = updatedTodo.Title;
    todo.Description = updatedTodo.Description;
    todo.IsCompleted = updatedTodo.IsCompleted;

    await db.SaveChangesAsync();
    return Results.NoContent();
}).WithName("UpdateTodo");

app.Run();
