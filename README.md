# API Test

Middleware for the GitHub API, allowing users to query repositories.

Endpoints can be found here: *link*

## Requirements
- Node v.20.5.1^ (may work on older versions)
- npm v.9.8.0^
- GitHub account (highly recommended but optional)

## Setup
1. Pull repo down locally.
2. Install dependencies with `npm install`.
3. Create a .env file, and add the following variables:
    - `PORT=<port>` I used 3000, but any other available port works.
    - `AUTH_TOKEN=<token>` (your GitHub fine-grained access token). Tokens are available in your account settings > developer settings. This line may be commented out if not using authentication, but using a token is highly recommended due to GitHub API's rate limits.'
4. Run the server with `node app.js`. `Listening on <port>` should appear in the console.
5. Run tests with `npm test app`.