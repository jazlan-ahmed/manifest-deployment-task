const fs = require('fs');
const yaml = require('js-yaml');

console.log('Testing GitHub Actions workflow configuration...\n');

try {
 // Read and validate the workflow file
  const workflowContent = fs.readFileSync('./.github/workflows/deploy-manifest.yml', 'utf8');
  
  console.log('✓ Workflow file exists and is readable');
  
  // Parse YAML to check for syntax errors
  const workflow = yaml.load(workflowContent);
  
  console.log('✓ Workflow file has valid YAML syntax');
  
  // Check for required properties
  if (!workflow.name) {
    throw new Error('Workflow is missing a name');
  }
  
  console.log('✓ Workflow has a name:', workflow.name);
  
  if (!workflow.on) {
    throw new Error('Workflow is missing trigger events');
  }
  
  console.log('✓ Workflow has trigger events defined');
  
  if (!workflow.jobs) {
    throw new Error('Workflow is missing jobs');
  }
  
  console.log('✓ Workflow has jobs defined');
  
  // Check for the build-and-push-image job
  if (!workflow.jobs['build-and-push-image']) {
    throw new Error('Workflow is missing build-and-push-image job');
  }
  
  console.log('✓ Workflow has build-and-push-image job');
  
  // Check for the deploy-manifest job
  if (!workflow.jobs['deploy-manifest']) {
    throw new Error('Workflow is missing deploy-manifest job');
  }
  
  console.log('✓ Workflow has deploy-manifest job');
  
  // Check for required secrets mentioned in the workflow
  const workflowText = workflowContent.toLowerCase();
  if (workflowText.includes('secrets.kubeconfig_data')) {
    console.log('✓ Workflow references KUBECONFIG_DATA secret');
  }
  
  console.log('\n✓ All validation checks passed!');
  console.log('\nThe GitHub Actions workflow is properly configured for manifest deployment.');
  console.log('Remember to set up the required secrets in your GitHub repository:');
  console.log('- KUBECONFIG_DATA: Base64-encoded kubeconfig file for your Kubernetes cluster');
  
} catch (error) {
  console.error('✗ Validation failed:', error.message);
 process.exit(1);
}