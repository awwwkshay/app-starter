# Use the official .NET SDK image for build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copy solution and referenced projects before restoring to keep layers cacheable
COPY AppStarter.sln ./
COPY apps/api ./apps/api
COPY platform ./platform
COPY shared ./shared

RUN dotnet restore AppStarter.sln

RUN dotnet publish apps/api/AppStarter.Api/AppStarter.Api.csproj -c Release -o /app/dist --no-restore

# Use the official .NET runtime image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/dist .
EXPOSE 8080
EXPOSE 8081
ENTRYPOINT ["dotnet", "AppStarter.Api.dll"]