# Manifest Deployment Application

This is a sample application demonstrating how to build and deploy a manifest file using GitHub Actions.

## Project Structure

- `index.js` - Main application entry point
- `package.json` - Node.js project configuration
- `Dockerfile` - Containerization instructions
- `k8s-manifest.yaml` - Kubernetes deployment manifest
- `.github/workflows/deploy-manifest.yml` - GitHub Actions workflow for deployment

## How It Works

1. When code is pushed to the `main` or `master` branch, the GitHub Action workflow is triggered
2. The application is built and tested
3. A Docker image is created and pushed to the GitHub Container Registry (ghcr.io)
4. The Kubernetes manifest is updated with the new image tag
5. The updated manifest is deployed to a Kubernetes cluster

## GitHub Action Workflow

The workflow defined in `.github/workflows/deploy-manifest.yml` performs the following steps:

1. Builds and tests the application
2. Creates and pushes a Docker image to GitHub Container Registry
3. Updates the Kubernetes manifest with the new image tag
4. Deploys the updated manifest to a Kubernetes cluster

### Prerequisites for Deployment

To deploy to a real Kubernetes cluster, you'll need to configure authentication in the workflow. The current workflow includes examples for:

- Azure Kubernetes Service (AKS)
- Amazon Elastic Kubernetes Service (EKS)
- Google Kubernetes Engine (GKE)

You'll need to set up the appropriate authentication secrets in your GitHub repository settings.

## Local Development

To run the application locally:

```bash
npm install
npm start
```

To build the application:

```bash
npm run build
```

## Testing the Build Process

Run the following command to test the build:

```bash
npm test
```

## Deployment Configuration

The Kubernetes manifest (`k8s-manifest.yaml`) defines:

- A deployment with 3 replicas
- A service to expose the application
- Environment variables and port configurations

## Security Considerations

- The workflow uses GitHub's built-in OIDC tokens for authentication to cloud providers
- Docker images are stored in GitHub Container Registry with appropriate permissions
- Secrets are managed through GitHub repository settings
## Next Steps for Deployment

To deploy this application to a production environment, follow these steps:

### 1. Configure Cloud Provider Authentication

Choose your cloud provider and set up OIDC authentication:

#### For Azure Kubernetes Service (AKS):
1. Register an application in Azure AD
2. Grant required permissions to your AKS cluster
3. Add the following to your workflow under the `deploy-manifest` job:
   ```yaml
   - name: Azure Login
     uses: azure/login@v1
     with:
       client-id: ${{ secrets.AZURE_CLIENT_ID }}
       tenant-id: ${{ secrets.AZURE_TENANT_ID }}
       subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
   
   - name: Set up kubectl
     uses: azure/setup-kubectl@v3
   
   - name: Get AKS credentials
     run: |
       az aks get-credentials --resource-group <RESOURCE_GROUP> --name <CLUSTER_NAME>
   ```

#### For Amazon EKS:
1. Create an IAM role that trusts GitHub's OIDC provider
2. Attach the required policies for EKS access
3. Add the following to your workflow:
   ```yaml
   - name: Configure AWS Credentials
     uses: aws-actions/configure-aws-credentials@v2
     with:
       role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
       aws-region: ${{ secrets.AWS_REGION }}
   
   - name: Update kubeconfig
     run: aws eks update-kubeconfig --name <CLUSTER_NAME>
   ```

#### For Google Kubernetes Engine (GKE):
1. Create a Workload Identity Pool
2. Configure the connection between GitHub and GCP
3. Add the following to your workflow:
   ```yaml
   - id: 'auth'
     name: 'Authenticate to Google Cloud'
     uses: google-github-actions/auth@v1
     with:
       workload_identity_provider: ${{ secrets.GCP_WORKLOAD_IDENTITY_PROVIDER }}
       service_account: ${{ secrets.GCP_SERVICE_ACCOUNT }}
   
   - name: Set up Cloud SDK
     uses: google-github-actions/setup-gcloud@v1
   
   - name: Get GKE credentials
     run: |
       gcloud container clusters get-credentials <CLUSTER_NAME> --zone <ZONE> --project $PROJECT_ID
   ```

### 2. Set Up Repository Secrets

Add the following secrets to your GitHub repository under Settings > Secrets and variables > Actions:

- For Azure: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`
- For AWS: `AWS_ROLE_TO_ASSUME`, `AWS_REGION`
- For GCP: `GCP_WORKLOAD_IDENTITY_PROVIDER`, `GCP_SERVICE_ACCOUNT`

### 3. Customize the Manifest for Production

Update `k8s-manifest.yaml` with production-specific configurations:
- Resource limits and requests
- Health checks (liveness and readiness probes)
- Environment-specific configurations
- Security contexts
- Network policies

### 4. Set Up Environment-Specific Configurations

For different environments (dev/staging/prod), consider using:
- Separate branches with environment-specific manifests
- Helm charts for templating
- Kustomize for configuration overlays

### 5. Enable GitHub Actions

1. Commit all changes to your repository
2. Navigate to the Actions tab in your GitHub repository
3. Enable GitHub Actions if it's not already enabled
4. The workflow will trigger on the next push to main/master branch

### 6. Monitor and Troubleshoot

- Check the Actions tab for workflow execution logs
- Verify deployment in your Kubernetes cluster
- Set up alerts for failed deployments
- Review security scanning results

### 7. Optional: Advanced Deployment Strategies

Consider implementing:
- Blue-green deployments for zero-downtime releases
- Canary deployments for gradual rollouts
- Automated rollback mechanisms
- Infrastructure as Code (using Terraform or similar) for cluster provisioning
## Local Development

To run the application locally:

```bash
npm install
npm start
```

The application will be available at http://localhost:3000

## GitHub Actions Deployment

This project is configured to build and deploy to Kubernetes using GitHub Actions.

### Prerequisites for Deployment

1. Set up a Kubernetes cluster (GKE, EKS, AKS, or another provider)
2. Get your cluster's kubeconfig file
3. Encode it as base64: `cat your-kubeconfig-file | base64 -w 0`
4. Add it as a GitHub secret named "KUBECONFIG_DATA" in your repository settings

### Deployment Process

The GitHub Actions workflow will:
1. Build and push the Docker image to GitHub Container Registry
2. Update the Kubernetes manifest with the new image tag
3. Deploy the application to your Kubernetes cluster
4. Wait for the deployment to be ready
5. Show the external IP where your application will be accessible

### Application Endpoints

Once deployed, your application will be available at:
- Main endpoint: `http://[EXTERNAL-IP]/`
- Health endpoint: `http://[EXTERNAL-IP]/health`

## Project Structure

- `index.js` - Main Express.js application
- `Dockerfile` - Container configuration
- `k8s-manifest.yaml` - Kubernetes deployment and service configuration
- `.github/workflows/deploy-manifest.yml` - GitHub Actions workflow
- `package.json` & `package-lock.json` - Node.js dependencies