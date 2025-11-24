# Steps to Generate This Starter

```BASH
# Add the Aspire workload if you haven't already
$ dotnet workload update
$ dotnet workload install update
$ dotnet new list aspire

# Create a new Aspire Empty project
$ dotnet new aspire -o AppStarter
$ cd AppStarter
$ dotnet restore
# Create the folder structure
$ mkdir docs apps platform shared
# move the AppStarter.AppHost and AppStarter.ServiceDefaults to the platform folder
$ mv AppStarter.AppHost/* platform/AppStarter.AppHost
$ mv AppStarter.ServiceDefaults/* platform/AppStarter.ServiceDefaults

# update the solution with the new platform/* projects
$ dotnet sln remove AppStarter.AppHost/AppStarter.AppHost.csproj
$ dotnet sln remove AppStarter.ServiceDefaults/AppStarter.ServiceDefaults.csproj
$ dotnet sln add platform/AppStarter.AppHost/AppStarter.AppHost.csproj
$ dotnet sln add platform/AppStarter.ServiceDefaults/AppStarter.ServiceDefaults.csproj

# Clean up the root folder
$ rm -rf AppStarter.AppHost AppStarter.ServiceDefaults

# Make api and web apps folders
$ mkdir apps/api apps/web
```