# API Test

Middleware for the GitHub API, allowing users to query repositories.

Endpoints can be found at the Postman collection provided in email.

## Requirements
- Node v.20.5.1^ (may work on older versions)
- Yarn v. 1.22.22
- GitHub fine-grained access token (optional, recommended for running jest tests locally)

## Setup
1. Clone repo locally.
2. Ensure Node and Yarn are up to date. 
3. Install dependencies with `yarn install`.
4. Create a .env file, and add the following variables:
    - `PORT=<port>` I used 3000, but any other available port will work.
    - `AUTH_TOKEN=<token>` (your GitHub fine-grained access token).
        - Tokens are available in account settings > developer settings.
        - Authentication is not required and the relevant line (src/controllers/controllers.ts line 9) has been commented out. If running Postman HTTP requests, it should be commented out, and auth token is not required. If running Jest testing locally, this line should be uncommented and auth token provided. 
5. Run the server with `npx ts-node src/app.ts`. `Listening on <port>` should appear in the console.
6. Run jest tests with `npm test app`.
