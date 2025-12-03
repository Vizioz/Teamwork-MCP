# Publishing to npm

This project uses GitHub Actions with OIDC trusted publishing to automatically publish new releases to npm when a GitHub release is created. This approach eliminates the need for long-lived npm tokens and provides enhanced security through short-lived, workflow-specific credentials.

## Setup Instructions

To set up automatic npm publishing with trusted publishers, you need to link your npm package to your GitHub repository.

### Configuring Trusted Publishing on npm

1. Log in to your npm account at [npmjs.com](https://www.npmjs.com/)
2. Navigate to your package's settings page
3. Click on "Publishing access" in the left sidebar
4. Under "Trusted Publishers", click "Add trusted publisher"
5. Select "GitHub Actions" as the provider
6. Configure the following fields:
   - **Repository owner**: Your GitHub username or organization name
   - **Repository name**: `teamwork-mcp`
   - **Workflow filename**: `npm-publish.yml` (must match exactly, including the `.yml` extension)
   - **Environment name**: Leave blank unless using GitHub environments
7. Click "Add" to save the configuration

### Enhancing Security (Recommended)

Once trusted publishing is configured, you can further secure your package:

1. Go to your package settings on npmjs.com → "Publishing access"
2. Select "Require two-factor authentication and disallow tokens"
3. Save your changes
4. Revoke any existing npm automation tokens that are no longer needed

This ensures that only your GitHub Actions workflow can publish the package.

## Publishing Process

With trusted publishing configured, the publishing process works as follows:

1. Update the version in `package.json`
2. Commit and push your changes
3. Create a new GitHub release (this triggers the workflow)
4. The GitHub Action will:
   - Check out the code
   - Set up Node.js
   - Update npm to the latest version (required for OIDC support)
   - Install dependencies
   - Build the project
   - Publish to npm using OIDC authentication (no token required)
   - Automatically generate provenance attestations

## Benefits of Trusted Publishing

- **No long-lived secrets**: Eliminates the risk of token exposure or compromise
- **Automatic provenance**: Cryptographic proof of where and how your package was built
- **Short-lived credentials**: Tokens are generated on-demand and expire quickly
- **Simplified setup**: No need to manage or rotate npm tokens

## Troubleshooting

If the npm publishing fails, check the following:

- Verify that the trusted publisher configuration on npmjs.com matches your workflow exactly:
  - Repository owner and name must be correct
  - Workflow filename must be `npm-publish.yml` (case-sensitive, including `.yml` extension)
- Ensure the package version in `package.json` is not already published
- Check that the package name in `package.json` is available on npm
- Verify the workflow has the required permissions (`id-token: write` and `contents: read`)
- Ensure you're using npm 11.5.1 or later (the workflow updates npm automatically)
- Review the GitHub Actions logs for specific error messages

**Note:** npm does not validate your trusted publisher configuration when you save it. Errors will only appear when you attempt to publish.

For more information, see:

- [npm Trusted Publishers Documentation](https://docs.npmjs.com/trusted-publishers)
- [GitHub Actions OIDC Documentation](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
