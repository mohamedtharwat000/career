# Career Site Code Challenge

## Project Overview

This project is a front-end development task for a careers webpage. The goal is to develop a responsive and user-friendly interface for job openings, a login page, and a candidate profile page. The project uses a variety of modern web technologies to ensure optimal performance and usability.

## Features

- **Job Openings Page:** Displays a list of current job openings.
- **Login Page:** Simple login form for candidates.
- **Candidate Profile Page:** Form to collect candidate information (Email, First Name, Last Name, Resume in PDF format, Cover Letter in PDF format, Phone number).
- **Responsive Design:** Ensures the webpage is fully responsive and mobile-friendly.
- **User Authentication:** Allows candidates to apply for jobs only after logging in.

## Technologies Used

- **Front-End:**
  - React.js
  - Reactstrap (Bootstrap components for React)
  - React Router DOM
- **Back-End:**
  - Node.js
  - Express.js
  - JSON Web Token for authentication
  - Bcrypt for password hashing
- **Build and Development Tools:**
  - ESLint for code linting
  - Prettier for code formatting
  - esbuild for fast bundling and compiling
  - npm-run-all for running multiple scripts concurrently
- **Other Dependencies:**
  - Axios for making HTTP requests
  - Cookie-Parser for handling cookies
  - Browser-Sync for live-reloading during development

## Project Structure

- `src/`: Contains the source code for the front-end and back-end.
- `dist/`: Contains the bundled and compiled code.
- `build.js`: Script for building the project.
- `server.cjs`: Entry point for the backend server.

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/career.git
   cd career
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Scripts

- `format`: Runs Prettier to format the code.

  ```bash
  npm run format
  ```

- `lint`: Runs ESLint to fix and check for errors.

  ```bash
  npm run lint
  ```

- `build`: Compiles the React code and bundles it.

  ```bash
  npm run build
  ```

- `start`: Starts the backend server.

  ```bash
  npm run start
  ```

- `dev`: Runs the build and starts the server in parallel.
  ```bash
  npm run dev
  ```

## Deployment

To deploy the project, ensure that the backend server is running and the front-end build is served correctly. You can use services like Heroku, Vercel, or any other cloud provider for deployment.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Author

Mohamed Tharwat
