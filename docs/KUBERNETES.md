# 🧭 Kubernetes Environments with Namespaces — Architecture & Best Practices

This document explains how to run **multiple environments (dev, staging, production)** inside a **single Kubernetes cluster** using **namespaces**, along with:

* Ingress routing per environment
* Automated TLS using **cert-manager + Let's Encrypt**
* URL convention per environment
* API vs Web routing (`/api` vs `/`)
* Why namespaces are useful

---

## 📌 Why Multiple Environments in One Cluster?

You *can* run separate clusters (often used by larger enterprises), but for most teams:

✔️ Cheaper
✔️ Easier to manage
✔️ Share compute resources
✔️ Faster deployments
✔️ Reduced ops overhead

Namespaces provide **logical isolation**, so each environment has its own:

| Resource        | Isolated by Namespace |
| --------------- | --------------------- |
| Deployments     | ✔️                    |
| Services        | ✔️                    |
| ConfigMaps      | ✔️                    |
| Secrets         | ✔️                    |
| RBAC Policies   | ✔️                    |
| Ingress Rules   | ✔️                    |
| Resource Quotas | ✔️                    |

---

## 🏷️ Namespaces Design

We will use:

```
dev
staging
prod
```

---

### Create Namespaces

```sh
kubectl create namespace dev
kubectl create namespace staging
kubectl create namespace prod
```

---

## 🔐 TLS + Certificate Automation (cert-manager)

Install cert-manager:

```sh
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.crds.yaml

helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.15.0
```

---

### Configure Let's Encrypt ClusterIssuer

> Create once — usable by all namespaces.

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: you@example.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-private-key
    solvers:
    - http01:
        ingress:
          class: nginx
```

Apply:

```sh
kubectl apply -f cluster-issuer.yaml
```

---

## 🌍 Domain Strategy

| Environment | URL Example         |
| ----------- | ------------------- |
| Dev         | `example.dev.com`   |
| Staging     | `example.stage.com` |
| Production  | `example.com`       |

---

## 🚦 Ingress Architecture

Each namespace has its own ingress, example:

* `/` → React frontend Service
* `/api` → API backend Service

---

### Example Deployment Setup

📁 In each namespace you'll have:

```
deployment.yaml
service.yaml
ingress.yaml
```

---

### Example Ingress YAML for Each Namespace

#### `dev` namespace (`example.dev.com`)

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  namespace: dev
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - example.dev.com
    secretName: tls-example-dev
  rules:
  - host: example.dev.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80
```

Repeat for staging and prod by changing namespace + host:

#### `staging` → `example.stage.com`

#### `prod` → `example.com`

> Only 3 fields change: Namespace, Host, TLS secret name.

---

## 🔐 Sealed Secrets (Optional But Recommended)

Since you're managing multiple environments with real credentials, use:

```
bitnami-labs/sealed-secrets
```

This prevents storing raw secrets in Git.

---

## 🧱 RBAC + Quotas per Namespace

(Optional, recommended for teams):

Example Resource Quotas:

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: dev
spec:
  hard:
    requests.cpu: "2"
    requests.memory: 4Gi
    limits.cpu: "4"
    limits.memory: 8Gi
```

---

## 🚀 CI/CD Deployment Strategy

| Environment | Trigger                       | Source                      |
| ----------- | ----------------------------- | --------------------------- |
| Dev         | Every push / feature branch   | `:dev` or Git hash          |
| Staging     | PR merged → Approval required | `:stage`                    |
| Production  | Manual or controlled deploy   | `:latest` or tagged release |

Use GitOps (ArgoCD / FluxCD) or Helm with environment values:

```
values.dev.yaml
values.staging.yaml
values.prod.yaml
```

---

## 🧪 Testing URLs

| Environment | Frontend                     | API                             |
| ----------- | ---------------------------- | ------------------------------- |
| Dev         | `https://example.dev.com/`   | `https://example.dev.com/api`   |
| Staging     | `https://example.stage.com/` | `https://example.stage.com/api` |
| Prod        | `https://example.com/`       | `https://example.com/api`       |

---

## 🏁 Summary

| Feature                                 | Achieved |
| --------------------------------------- | -------- |
| Multiple environments in single cluster | ✔️       |
| Logical isolation using namespaces      | ✔️       |
| Automated HTTPS                         | ✔️       |
| Single ingress with routing rules       | ✔️       |
| Consistent domain naming                | ✔️       |
| Separate API+Web routing                | ✔️       |

---

## Next Step Suggestions

* Enable **Horizontal Pod Autoscaling**
* Add **monitoring (Prometheus + Grafana)**
* Add **logging (Loki, Elastic, or OpenSearch)**
* Add **backup strategies (Velero)**

---

If you want, I can also generate:

📁 `k8s/` folder structure
🧰 Helm charts
🚀 ArgoCD GitOps manifest
📦 Terraform scripts to bootstrap cluster

---
