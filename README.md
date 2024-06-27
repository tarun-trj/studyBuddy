# Project Description

The project is a web application designed to facilitate efficient study management and user interaction. It features multiple pages and functionalities tailored for a personalized and secure user experience.

## Homepage

- Displays user-specific information such as subjects of study, user name, and navigation to relevant pages.
- Allows users to update their subjects and navigate to corresponding pages.

## Login/Register Page

- Provides secure authentication using JWT (JSON Web Tokens) for user login and registration.
- Implements bcrypt for hashing and securely storing passwords.

## Study Session Page

- Includes a dynamic todo list for adding and managing study tasks.
- Integrates a stopwatch to track study session durations, enhancing productivity monitoring.

## User Display Page

- Lists all users registered on the platform, promoting community engagement and networking.

## Match Display Page

- Utilizes the Gale-Shapley algorithm to efficiently match users based on specified criteria, enhancing user interaction and collaboration.

## Guidelines Page

- Provides users with guidelines and best practices for utilizing the website effectively and responsibly.

## About Page

- Offers information about the project, its objectives, and the team behind its development.

## Technologies Used

- *Database:* MongoDB for storing user data securely.
- *Backend:* Node.js for server-side logic.
- *Frontend:* HTML, CSS, and JavaScript for user interface development.
- *Communication:* Nodemailer for secure email communication and password recovery.
- *Security:* JWT for authentication and authorization, bcrypt for password hashing.

## Additional Tools

- *Algorithms:* Gale-Shapley algorithm for efficient user matching.
- *Libraries:* Zod and Axios for data handling and API interactions.

# Study Buddy Finder

Study Buddy Finder is a web application designed to help students find study partners based on their courses and interests. This project connects users to a MongoDB database and provides a client-side interface to interact with the system.

![Home](readme_images/home.jpg)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the Study Buddy Finder, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd studyBuddy

2. **Connect to MongoDB:**

   Ensure you have MongoDB installed and running on your system. Update the connection string in your project's configuration file if necessary.

3. **Install server-side dependencies and run the server:**

   ```bash
   npm install
   nodemon index.js

4. **Install client-side dependencies and run the client:**

   The following commands will start the development server and provide you with a link to the website.
   
   ```bash
   cd login_register
   npm install
   npm run dev

## Usage

Once the server and client are running, open the provided link in your browser to access the Study Buddy Finder. Register an account, log in, and start finding study partners!

## Project Structure

Here is an overview of the project structure:

```bash
studyBuddy/
├── .git
├── .gitignore
├── login_register
├── node_modules
├── package.json
├── package-lock.json
├── readme_images
└── README.md
```

**.git**: Contains git version control files.  
**.gitignore**: Specifies files to be ignored by git.  
**login_register**: Contains client-side code for the login and registration system.  
**node_modules**: Contains project dependencies.  
**package.json**: Lists project details and dependencies.  
**package-lock.json**: Records the exact versions of installed dependencies.  
**readme_images**: Contains images for the README file.  
**README.md**: This file.



