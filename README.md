# Notomatic: AI-Powered Note Generator

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Active-success)](https://github.com/rayeesrather99/Notomatic)

## Overview

Notomatic is a full-stack web application that utilizes AI to automatically generate structured notes from syllabus documents. It provides students and educators with a convenient way to create concise, organized summaries, saving time and effort in the note-taking process.

## Key Features

*   **Syllabus Upload:** Upload syllabus documents in PDF format.
*   **AI-Powered Notes Generation:** Leverages the Google Gemini Pro API to generate notes based on the syllabus text.
*   **Notes Management:** View, download (as PDF), edit, and delete generated notes within the application.
*   **User Authentication:** Secure user accounts and login system.
*   **Dashboard**: The dashboard gives users an overview of their notes, and a quick access to all of the key information for the application.

## Technologies Used

*   **Frontend:**
    *   React.js
    *   Vite
    *   React Router
    *   React Feather
    *   Tailwind CSS
*   **Backend:**
    *   Node.js
    *   Express.js
    *   MongoDB
    *   Mongoose
    *   JSONWebToken
    *   bcrypt
    *   google-generative-ai
    *   pdf-parse
    *   express-rate-limit

## Setup Instructions

Follow these steps to set up and run Notomatic locally:

### Prerequisites

*   Node.js and npm (Node Package Manager)
*   MongoDB installed and running
*   Google Gemini API Key

### Installation

1.  **Clone the repository:**
```bash
git clone https://github.com/your-username/notomatic.git
cd notomatic
content_copy
download
Use code with caution.
Markdown

Install dependencies for both the backend and frontend:

cd backend
npm install
cd ../frontend
npm install
content_copy
download
Use code with caution.
Bash

Configure environment variables:

Create a .env file in the backend directory with the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
API_KEY=your_google_gemini_api_key
content_copy
download
Use code with caution.

Remember to replace the placeholder values with your actual credentials.

Running the Application

Start the backend server:

cd backend
node server.js
content_copy
download
Use code with caution.
Bash

Start the frontend development server:

cd ../frontend
npm run dev
content_copy
download
Use code with caution.
Bash
*   The frontend application should be running at `http://localhost:5173` (or a similar address, as specified by Vite).
content_copy
download
Use code with caution.
API Endpoints

Here is the list of all the API Endpoints for Notomatic:

POST /api/auth/login - Logs in a user and returns a JWT token.

POST /api/auth/signup - Registers a new user.

POST /api/feedback - Submit a new feedback (Requires Authentication)

GET /api/notifications - Get all notifications (Requires Authentication)

GET /api/users - Get a user (Requires Authentication)

POST /api/syllabus/upload - Upload a syllabus file (Requires Authentication)

GET /api/notes/generate/:syllabusId - Generates a note from a syllabus (Requires Authentication)

GET /api/notes/user - Get all notes for a user (Requires Authentication)

GET /api/notes/download/:noteId - Download a specific note (Requires Authentication)

DELETE /api/notes/:noteId - Deletes a specific note (Requires Authentication)

PUT /api/notes/:noteId - Updates a note (Requires Authentication)

GET /api/dashboard - Get all information for the dashboard (Requires Authentication)

GET /api/health - Get all information for the server.

Important Considerations

Here is a summary of important considerations for Notomatic:

Make sure that you have the latest version of all the dependencies being used.

Use the proper authentication and authorization middleware to properly manage requests.

Use secure keys for the JWT and MongoDB keys.

Make sure the application is secure.

Make sure that all the required components are working correctly.

Contributing

Contributions are welcome! If you'd like to contribute to Notomatic, please follow these guidelines:

Fork the repository.

Create a new branch for your feature or bug fix.

Make your changes and commit them with descriptive commit messages.

Submit a pull request.

License

This project is licensed under the MIT License - see the LICENSE file for details.

Contact

Your Name/Team Name - [Your Email]

Acknowledgements

This project was inspired by (Mention any inspirations or related projects).

We would like to thank (Acknowledge any contributors or libraries used).

This README provides a comprehensive overview of your project and should be a great starting point for potential users and contributors. Good luck!
