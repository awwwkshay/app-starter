# AppStarter

> A modern, full-stack starter template for building distributed applications
> with .NET Aspire, React, Vite, and PostgreSQL.

---

## Project Structure

```
AppStarter.sln                # Solution file
docs/                         # Documentation and setup steps
apps/
	api/                        # ASP.NET Core Web API (C#, EF Core, PostgreSQL)
		AppStarter.Api/           # Main API project
	web/                        # React 19 + Vite frontend app
platform/
	AppStarter.Platform.AppHost/        # Aspire AppHost (orchestrates all services)
	AppStarter.Platform.ServiceDefaults/ # Shared service defaults (telemetry, health, etc)
shared/
	AppStarter.Shared.Domain/   # Shared domain models (C#)
```

---

## Solution Overview

### 1. **apps/api/AppStarter.Api**

- **Tech:** ASP.NET Core, Entity Framework Core, PostgreSQL
- **Purpose:** Exposes a REST API for managing `Todo` items.
- **Features:**
  - Auto-migrates DB on startup
  - OpenAPI/Swagger support
  - CORS enabled for local frontend
  - Uses shared domain models

### 2. **apps/web**

- **Tech:** React 19, Vite, Tailwind CSS, TypeScript
- **Purpose:** Modern SPA frontend for the API
- **Features:**
  - Routing with React Router
  - State management with Zustand
  - API calls via Axios
  - i18n with i18next
  - Dev tools: Husky, lint, format

### 3. **platform/AppStarter.Platform.AppHost**

- **Tech:** .NET Aspire AppHost
- **Purpose:** Orchestrates all services (API, DB, frontend)
- **Features:**
  - Manages PostgreSQL and API lifecycles
  - Injects connection strings
  - Configures environment for frontend

### 4. **platform/AppStarter.Platform.ServiceDefaults**

- **Tech:** .NET Aspire shared library
- **Purpose:** Provides common service defaults (OpenTelemetry, health checks,
  service discovery)

### 5. **shared/AppStarter.Shared.Domain**

- **Tech:** C# class library
- **Purpose:** Shared domain models (e.g., `Todo`) for API and other services

---

## Getting Started

### Prerequisites

- [.NET 10 SDK (with Aspire)](https://aka.ms/dotnet/aspire)
- [Node.js](https://nodejs.org/) & [pnpm](https://pnpm.io/)
- [PostgreSQL](https://www.postgresql.org/) (optional, managed by Aspire)

### 1. Clone & Restore

```bash
git clone <repo-url>
cd AppStarter
dotnet restore
```

### 2. Run the Full Stack (Dev)

```bash
# From the root
dotnet run --project platform/AppStarter.Platform.AppHost
# This will start API, DB, and web frontend (Vite dev server)
```

### 3. Develop Frontend Only

```bash
cd apps/web
pnpm install
pnpm dev
# Vite dev server at http://localhost:5173
```

### 4. Develop API Only

```bash
cd apps/api/AppStarter.Api
dotnet run
# API at http://localhost:5000 (or as configured)
```

---

## Database

- Uses PostgreSQL (managed by Aspire in dev)
- EF Core migrations auto-applied on API startup

---

## Useful Scripts

### Web (from `apps/web`)

- `pnpm dev` – Start Vite dev server
- `pnpm build` – Build for production
- `pnpm preview` – Preview production build
- `pnpm lint` – Lint code
- `pnpm format` – Format code

### API (from `apps/api/AppStarter.Api`)

- `dotnet run` – Start API
- `dotnet ef migrations add <Name>` – Add EF Core migration
- `dotnet ef database update` – Apply migrations

---

## References

- [Aspire Docs](https://aka.ms/dotnet/aspire)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostgreSQL](https://www.postgresql.org/)

---

## Author

Akshay Priyadarshi ([GitHub](https://github.com/Akshay-Priyadarshi))
