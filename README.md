# API Test

Middleware for the GitHub API, allowing users to query repositories.

Endpoints can be found here: *link*

## Requirements
- Node v.20.5.1^ (may work on older versions)
- Yarn v. 1.22.22
- GitHub fine-grained access token (highly recommended but optional)

## Setup
1. Clone repo locally.
2. Ensure Node and Yarn are up to date. 
3. Install dependencies with `yarn install`.
4. Create a .env file, and add the following variables:
    - `PORT=<port>` I used 3000, but any other available port works.
    - `AUTH_TOKEN=<token>` (your GitHub fine-grained access token). Tokens are available in account settings > developer settings. This line may be commented out if not using authentication/needing to test, but using a token is highly recommended due to GitHub API's rate limits.
5. Run the server with `node app.js`. `Listening on <port>` should appear in the console.
6. Run tests with `npm test app`. To ensure tests run, you may need to comment out line 9 in src/controllers.ts.
