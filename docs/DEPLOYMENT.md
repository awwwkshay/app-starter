# 🚀 Deployment Guide

This document describes how deployment works in this monorepo using:

- .NET Aspire (local development orchestrator)
- Container Registry
- GitHub Actions (CI)
- ArgoCD (GitOps)
- Kubernetes (runtime platform)
- Multiple environments mapped to Git branches (development, staging,
  production)

---

## 🔥 Deployment Model Summary

This repository follows a **GitOps workflow**:

> The state of each environment is defined by the Kubernetes manifests stored
> under `infrastructure/overlays/<environment>` in the corresponding Git branch.

Deployments happen automatically when:

- Code is updated → CI builds versioned images → manifests reference new images
  → ArgoCD redeploys
- Manifest changes are pushed → ArgoCD reconciles configuration automatically

No manual `kubectl apply` commands are required.

---

## 📦 Repository Structure

```BASH
repo/
├── apps/
│ ├── api/
│ ├── web/
│ └── worker/
│
├── AppHost/ # Aspire (local-only development environment)
│
├── infrastructure/
│ ├── base/ # Shared Kubernetes resources
│ ├── overlays/
│ │ ├── development/
│ │ ├── staging/
│ │ └── production/
│ └── applicationset.yaml # (Optional) ArgoCD ApplicationSet for PR previews
│
└── .github/workflows/ # CI pipelines
```

---

## 🌎 Environment to Branch Mapping

| Environment  | Git Branch   | URL Example               | Purpose |
|-------------|--------------|---------------------------|---------|
| Development | `development` | <https://dev.example.com>   | Active ongoing feature integration |
| Staging     | `staging`     | <https://staging.example.com> | QA/UAT validation |
| Production  | `production`  | <https://example.com>       | Live environment |

ArgoCD watches these branches and applies updates automatically.

---

## 🧪 Local Development (Aspire)

Local development does **not** require Kubernetes or Docker.

Run the entire stack using Aspire:

```BASH
dotnet run --project AppHost
```

Aspire automatically:

- Builds and runs API, Web, Worker services
- Runs React/Vite apps
- Connects dependencies and environment variables
- Provides a dashboard for logs, tracing, health, and port mappings

Each developer gets a full isolated environment locally.

---

## 🔧 CI Pipeline (Build + Version + Push)

Whenever code is pushed to any branch:

1. CI builds all services under `/apps`
2. Runs validation and tests
3. Builds container images
4. Pushes images to registry
5. Tags each image with commit SHA:

```BASH
sha-<COMMIT_HASH>
```

Example:

```BASH
ghcr.io/your-org/api:sha-91cdbe2
ghcr.io/your-org/web:sha-91cdbe2
ghcr.io/your-org/worker:sha-91cdbe2
```

1. CI or Argo Image Updater updates manifests to reference the latest tag.

---

## ⚙️ Deployment via ArgoCD

ArgoCD watches:

```BASH
infrastructure/overlays/<environment>/
```

in its corresponding Git branch.

When changes occur:

- If only image versions change → rolling restart
- If infrastructure changes → full configuration sync

ArgoCD continuously ensures the **actual** cluster matches the **desired** state
in Git.

---

## 🔁 Deployment Scenarios

### 1️⃣ Code Change (No Infra Change)

- CI builds new images
- Image tags update in manifests
- ArgoCD applies rollout automatically

_No manual edits needed._

---

### 2️⃣ Infrastructure Change

Infrastructure examples include:

- New Kubernetes workloads
- Ingress modification
- Memory/CPU requests/limits
- New services added to monorepo

Steps:

1. Update `infrastructure/` files
2. Commit to appropriate branch
3. ArgoCD syncs and applies changes

---

## 🧬 Promotion Workflow

Promotion is done by merging between environment branches:

```BASH
feature → development → staging → production
```

Example:

```BASH
# Deploy to development
git checkout development
git merge feature/my-feature
git push

# After testing, deploy to staging
git checkout staging
git merge development
git push

# Release to production
git checkout production
git merge staging
git push
```

Each merge triggers CI and ArgoCD deployment automatically.

---

## 🧪 Optional: PR Preview Environments

If enabled, pull requests automatically generate ephemeral environments:

```BASH
https://pr-42.dev.example.com
```

These are destroyed when the PR is closed.

---

## 🛠 Tool Responsibilities

| Responsibility                   | Tool                |
| -------------------------------- | ------------------- |
| Local orchestration              | .NET Aspire         |
| Build/Test/Publish artifacts     | CI (GitHub Actions) |
| Container registry               | GHCR, ACR, or ECR   |
| Deployment runtime               | Kubernetes          |
| Continuous sync & reconciliation | ArgoCD              |

---

## ❓ Troubleshooting

| Issue                     | Likely Cause                      | Resolution                                 |
| ------------------------- | --------------------------------- | ------------------------------------------ |
| Deployment did not update | Wrong branch updated              | Ensure commit pushed to environment branch |
| Old image running         | Image updater not updating tag    | Validate CI steps or Argo image automation |
| Sync errors in ArgoCD     | Invalid or missing YAML/Kustomize | Fix manifest and push                      |
| Local environment differs | Outdated Aspire config            | Pull latest changes and restart Aspire     |

---

## 🏁 Summary

- Aspire supports consistent **local development**
- CI builds versioned images tagged by **commit SHA**
- Git branches define **environment state**
- ArgoCD automatically deploys based on Git
- The workflow is **fully automated and deterministic**

---

### 📬 Support

Internal contact: `platform-team@your-org.com`

```BASH
---

Would you like:

- `ci.yml`
- `kustomization.yaml`
- `argocd applicationset.yaml`
- or the full **starter infrastructure bundle ZIP**?

Reply: **CI**, **KUSTOMIZE**, **ARGO**, or **ALL**.
```
