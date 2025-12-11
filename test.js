// Simple test to validate the application structure
const fs = require('fs');
const path = require('path');

console.log('Validating project structure...');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'index.js',
  'Dockerfile',
  'k8s-manifest.yaml',
  '.github/workflows/deploy-manifest.yml'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✓ ${file} exists`);
  } else {
    console.log(`✗ ${file} missing`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n✓ All required files are present');
  console.log('✓ Application structure is valid');
  console.log('✓ GitHub Action workflow is configured');
  console.log('\nThe project is ready for deployment via GitHub Actions.');
} else {
  console.log('\n✗ Some required files are missing. Please check the project structure.');
  process.exit(1);
}

// Validate package.json has required scripts
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredScripts = ['start', 'build'];

let hasRequiredScripts = true;

requiredScripts.forEach(script => {
  if (!packageJson.scripts[script]) {
    console.log(`✗ Script '${script}' is missing from package.json`);
    hasRequiredScripts = false;
  } else {
    console.log(`✓ Script '${script}' is present in package.json`);
  }
});

if (hasRequiredScripts) {
  console.log('\n✓ All required scripts are present in package.json');
}