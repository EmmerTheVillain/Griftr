# Griftr - Connect with a Twist

Griftr is a unique application that puts a spin on the traditional dating app concept. It's a platform where tech enthusiasts and savvy individuals can interact with scammers in a "controlled environment". With Griftr, users can experience the thrill of connecting with scammers while maintaining their "privacy" and "security". Griftr was built with the idea of incorporating various technologies and best practices to provide a seamless experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Additional Libraries](#additional-libraries)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **User Profiles**: Users can create and manage their profiles, complete with photos and personal information.
2. **Matching Algorithm**: Griftr employs a sophisticated matching algorithm that pairs tech bros with scammers based on shared interests and personalities.
3. **Interactive UI**: The app features an intuitive and polished user interface that makes navigation and interaction smooth and enjoyable.
4. **Responsive Design**: Griftr is designed to work flawlessly across various devices and screen sizes, ensuring a consistent experience for all users.

## Technologies Used

Griftr leverages a variety of technologies to create a robust and engaging experience for users:

- **Node.js**: A powerful runtime environment that enables server-side JavaScript execution.
- **Express.js**: A minimalistic web application framework for Node.js that facilitates building RESTful APIs and handling HTTP requests.
- **Handlebars.js**: A templating engine used to create dynamic and reusable HTML templates.
- **MySQL**: A popular relational database management system used to store and manage user data.
- **Sequelize**: An Object-Relational Mapping (ORM) library that simplifies database interactions and management.
- **Multer**: A popular middleware for handling image uploads in Express.
- **Heroku**: A cloud platform that enables easy deployment and hosting of web applications.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites:

- Node.js and npm installed.
- MySQL server or an equivalent database service.
- Heroku account for deployment.

### Installation

1. Clone the repository: `git clone https://github.com/EmmerTheVillain/Griftr
2. Navigate to the project directory: `cd griftr`
3. Install dependencies: `npm install`

## Usage

1. Set up your MySQL database and update the configuration in `config/config.js`.
2. Run database migrations: `npx sequelize-cli db:migrate`
3. Launch the app: `npm start`
4. Open your web browser and navigate to `http://localhost:3000` to access Griftr.


## Deployment

Deploy Griftr to Heroku for online access:

1. Set up a Heroku app.
2. Add a Heroku remote: `heroku git:remote -a your-app-name`
3. Push the code to Heroku: `git push heroku main`
4. Ensure you've set the necessary environment variables in your Heroku app settings.


## Protecting Sensitive Information

Sensitive information, such as API keys and database credentials, should be stored as environment variables in a `.env` file. Make sure to add `.env` to your `.gitignore` file to prevent accidentally exposing this information.

## Contributing

Contributions to Griftr are welcome! Please follow the guidelines outlined in the `CONTRIBUTING.md` file.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this readme template according to your project's specifics. Remember to keep your users informed and engaged while providing clear instructions for installation, usage, and deployment. Good luck with your Griftr application!
