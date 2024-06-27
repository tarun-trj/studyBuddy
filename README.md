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



