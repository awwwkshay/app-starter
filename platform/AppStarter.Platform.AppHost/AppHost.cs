var builder = DistributedApplication.CreateBuilder(args);

// Add Postgres database
var postgres = builder.AddPostgres("postgres")
                    .WithHostPort(5432)
                    .WithPgAdmin();

// Add API database
var apiDb = postgres.AddDatabase("apiDb");

// Add API project
var api = builder.AddProject<Projects.AppStarter_Api>("api")
            .WithReference(apiDb)
            .WaitFor(apiDb);

// Add web app
builder.AddNpmApp("web", "../../apps/web")
    .WithReference(api)
    .WaitFor(api)
    .WithHttpEndpoint(port: 5173, env: "PORT")
    .WithEnvironment("VITE_API_URL", api.GetEndpoint("https"))
    .WithExternalHttpEndpoints();

// Build and run the application
builder.Build().Run();
