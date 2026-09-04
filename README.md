# DevOps Home Lab – G-Lab

A production-style DevOps home lab demonstrating **CI/CD automation, containerization, private image management, self-hosted GitHub Actions runners, automated deployment, and infrastructure monitoring**.

---

## Project Overview

This project deploys the **G-Lab full-stack web application** using a complete DevOps workflow.

The application consists of:

* Frontend – HTML, CSS and JavaScript
* Backend – Node.js and Express.js
* Database – MongoDB
* Containerization – Docker
* CI/CD – GitHub Actions
* Container Registry – GitHub Container Registry (GHCR)
* Production Server – Linux
* Monitoring – Prometheus and Grafana
* System Metrics – Node Exporter

The main objective is to automate the journey from **Git push → Docker build → image push → production deployment → monitoring**.

---

## DevOps Architecture

```text
                    Developer
                       │
                       │ git push
                       ▼
                ┌───────────────┐
                │    GitHub     │
                │   Repository  │
                └───────┬───────┘
                        │
                        ▼
              ┌───────────────────┐
              │  GitHub Actions   │
              │      CI/CD        │
              └─────────┬─────────┘
                        │
                        ▼
             ┌─────────────────────┐
             │  Self-Hosted Runner │
             │     Linux Server    │
             └──────────┬──────────┘
                        │
             ┌──────────┴──────────┐
             │                     │
             ▼                     ▼
      ┌─────────────┐       ┌─────────────┐
      │   Backend   │       │  Frontend   │
      │ Docker Image│       │ Docker Image│
      └──────┬──────┘       └──────┬──────┘
             │                     │
             └──────────┬──────────┘
                        ▼
              ┌───────────────────┐
              │       GHCR        │
              │ GitHub Container  │
              │     Registry      │
              └─────────┬─────────┘
                        │
                        │ docker pull
                        ▼
              ┌───────────────────┐
              │  Production Linux │
              │      Server       │
              └─────────┬─────────┘
                        │
                ┌───────┴────────┐
                │                │
                ▼                ▼
        ┌──────────────┐  ┌──────────────┐
        │   Backend    │  │   Frontend   │
        │ Docker :3001 │  │ Nginx :8080  │
        └──────────────┘  └──────────────┘


Monitoring:

Linux Server
      │
      ▼
Node Exporter
      │
      ▼
Prometheus
      │
      ▼
Grafana
```

---

## CI/CD Pipeline

The project uses **GitHub Actions** with a self-hosted Linux runner.

Whenever code is pushed to the `main` branch, the pipeline automatically:

1. Checks out the repository
2. Logs in to GitHub Container Registry
3. Builds the backend Docker image
4. Pushes the backend image to GHCR
5. Builds the frontend Docker image
6. Pushes the frontend image to GHCR
7. Pulls the latest images on the production server
8. Stops the previous application containers
9. Removes the old containers
10. Starts the new backend container
11. Starts the new frontend container

### Pipeline Flow

```text
Git Push
   ↓
GitHub Actions
   ↓
Self-Hosted Runner
   ↓
Docker Build
   ↓
GHCR Push
   ↓
Production Docker Pull
   ↓
Old Containers Removed
   ↓
New Containers Started
   ↓
Application Updated
```

---

## Technologies Used

| Category           | Technology                        |
| ------------------ | --------------------------------- |
| Version Control    | Git / GitHub                      |
| CI/CD              | GitHub Actions                    |
| Runner             | GitHub Actions Self-Hosted Runner |
| Containers         | Docker                            |
| Container Registry | GitHub Container Registry         |
| Backend            | Node.js / Express.js              |
| Frontend           | HTML / CSS / JavaScript           |
| Database           | MongoDB                           |
| Web Server         | Nginx                             |
| Monitoring         | Prometheus                        |
| Visualization      | Grafana                           |
| System Metrics     | Node Exporter                     |
| Operating System   | Ubuntu Linux                      |

---

## Docker Architecture

The application is separated into two containers.

### Backend

```text
g-lab-backend
      │
      └── Node.js / Express
              │
              └── Port 3001
```

### Frontend

```text
g-lab-frontend
      │
      └── Nginx
              │
              └── Port 8080 → Container Port 80
```

### Production Containers

```text
g-lab-backend
    └── 3001:3001

g-lab-frontend
    └── 8080:80

Prometheus
    └── 9090:9090

Grafana
    └── 3000:3000

Node Exporter
    └── 9100
```

---

## GitHub Container Registry

Docker images are stored in **GitHub Container Registry (GHCR)**.

### Backend Image

```text
ghcr.io/kavindugeethshan/g-lab-backend:latest
```

### Frontend Image

```text
ghcr.io/kavindugeethshan/g-lab-frontend:latest
```

This allows the production server to pull the latest application images automatically during deployment.

---

## Self-Hosted GitHub Actions Runner

Instead of using GitHub-hosted runners, this project uses a **self-hosted Linux runner**.

Runner:

```text
prabavi-Latitude-5400
```

Labels:

```text
self-hosted
Linux
X64
```

The runner executes the CI/CD workflow directly on the Linux production environment.

---

## Monitoring

The infrastructure is monitored using **Prometheus, Node Exporter and Grafana**.

### Monitoring Architecture

```text
Linux Server
      │
      ▼
Node Exporter :9100
      │
      ▼
Prometheus :9090
      │
      ▼
Grafana :3000
```

### Node Exporter

Node Exporter exposes Linux system metrics such as:

* CPU usage
* Memory usage
* Disk usage
* Network statistics
* System load
* Filesystem metrics

### Prometheus

Prometheus scrapes Node Exporter every **15 seconds**.

Current scrape configuration:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "linux-server"
    static_configs:
      - targets: ["host.docker.internal:9100"]
```

The Linux server target is successfully reported as:

```text
health: up
```

### Grafana

Grafana is used to visualize the Prometheus metrics through a Linux server monitoring dashboard.

---

## Production Deployment

The production environment runs on an Ubuntu Linux server using Docker.

The application is accessible through:

```text
Frontend: http://SERVER-IP:8080
Backend:  http://SERVER-IP:3001
Grafana:  http://SERVER-IP:3000
Prometheus: http://SERVER-IP:9090
```

> Replace `SERVER-IP` with the IP address of the production Linux server.

---

## Repository Structure

```text
Devops-Home-Lab/
│
├── .github/
│   └── workflows/
│       └── docker.yml
│
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── Dockerfile
├── .dockerignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

## Dockerfile – Backend

The backend uses Node.js 22.

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
```

---

## Dockerfile – Frontend

The frontend is served using Nginx.

```dockerfile
FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 80
```

---

## GitHub Actions Workflow

The workflow is triggered when changes are pushed to `main`.

```yaml
on:
  push:
    branches:
      - main
```

The workflow uses the self-hosted runner:

```yaml
runs-on: self-hosted
```

It also grants the workflow permission to publish packages to GHCR:

```yaml
permissions:
  contents: read
  packages: write
```

---

## Security

Sensitive environment variables are **not stored inside the Docker image or Git repository**.

The production backend receives environment variables using:

```text
--env-file ~/.env
```

The `.dockerignore` also prevents sensitive/local files from being included in the Docker build context.

```text
.env
node_modules
.git
npm-debug.log
```

---

## Key DevOps Concepts Demonstrated

This project demonstrates practical experience with:

* Git version control
* GitHub repositories
* GitHub Actions
* CI/CD automation
* Self-hosted runners
* Docker image creation
* Docker container management
* GitHub Container Registry
* Automated production deployment
* Linux server administration
* Nginx
* Prometheus
* Grafana
* Node Exporter
* Infrastructure monitoring
* Environment variable management
* Production-style deployment workflows

---

## Evidence

The project includes evidence of the implemented DevOps pipeline and monitoring infrastructure.

### CI/CD

* GitHub Actions successful pipeline
* Docker image build and push
* GHCR container images
* Self-hosted runner online
* Automatic production deployment

### Production

* Running backend and frontend Docker containers
* Application accessible from the production server

### Monitoring

* Node Exporter running
* Prometheus Linux server target showing `UP`
* Grafana Linux server monitoring dashboard

---

## Future Improvements

Potential future improvements include:

* Application-level Prometheus metrics
* Docker container monitoring with cAdvisor
* Alertmanager notifications
* HTTPS with a reverse proxy
* Infrastructure as Code using Terraform
* Kubernetes deployment
* Automated rollback strategy
* Blue/Green or Canary deployments
* Centralized logging
* AWS cloud deployment

---

## Project Goal

The goal of this project is to build a practical **DevOps home lab** that demonstrates how a full-stack application can be continuously integrated, containerized, stored in a container registry, automatically deployed to a Linux production server, and monitored using industry-standard DevOps tools.

---

## Author

**Kavindu Geethshan**
Bachelor of Information Technology (BIT) University of Colombo School of Computing
GitHub: https://github.com/kavindugeethshan

## License
This project is developed for educational and portfolio purposes.
