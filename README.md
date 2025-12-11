# Manifest Deployment Application

This application demonstrates how to build and deploy a Node.js application to Kubernetes using GitHub Actions.

## Overview

This project includes:
- A simple Node.js application
- Kubernetes manifest for deployment
- GitHub Actions workflow for CI/CD

## GitHub Actions Workflow

The repository includes a GitHub Actions workflow that:
1. Builds and tests the application
2. Creates a Docker image
3. Pushes the image to GitHub Container Registry
4. Updates the Kubernetes manifest with the new image tag
5. Deploys the updated manifest to a Kubernetes cluster

### Required Secrets

To use the deployment workflow, you need to configure the following secret in your GitHub repository:

- `KUBECONFIG_DATA`: Base64-encoded kubeconfig file for your Kubernetes cluster

### Optional Secrets (for cloud-specific deployments):

- GKE: `GKE_PROJECT`, `GKE_SA_KEY`, `GKE_CLUSTER_NAME`, `GKE_ZONE`
- EKS: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`
- AKS: `AZURE_CREDENTIALS`, `AZURE_RESOURCE_GROUP`, `AZURE_CLUSTER_NAME`

### Setting up KUBECONFIG_DATA

To generate the KUBECONFIG_DATA value:
```bash
cat ~/.kube/config | base64 -w 0
```

Then add this as a repository secret named `KUBECONFIG_DATA`.

### Common Issues

If you encounter the error "The connection to the server localhost:8080 was refused", this typically means:
1. No Kubernetes cluster is accessible from the current environment
2. The KUBECONFIG is not properly configured
3. The cluster credentials have expired

Make sure your KUBECONFIG contains the correct cluster information and that the cluster is accessible from the environment where you're running kubectl commands.

```bash
cat ~/.kube/config | base64 -w 0
```

Then add this as a repository secret named `KUBECONFIG_DATA`.

## Local Development

To run the application locally:
```bash
npm install
npm start
```

The application will be available at http://localhost:3000

## Kubernetes Deployment

The application is configured to run in a Kubernetes cluster with:
- 3 replicas for high availability
- LoadBalancer service for external access
- Environment variable configuration

## Testing

Run tests with:
```bash
npm test