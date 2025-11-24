namespace AppStarter.Api;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

public class ApiDbContextFactory : IDesignTimeDbContextFactory<ApiDbContext>
{
    public ApiDbContext CreateDbContext(string[] args)
    {
        // Fallback connection string ONLY for EF tooling (not runtime)
        var optionsBuilder = new DbContextOptionsBuilder<ApiDbContext>();
        optionsBuilder.UseNpgsql(
            "Host=localhost;Port=5432;Database=appstarter;Username=postgres;Password=postgres"
        );

        return new ApiDbContext(optionsBuilder.Options);
    }
}

