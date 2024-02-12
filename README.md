# CRUD Application with AngularJS and Node.js

This is a simple CRUD (Create, Read, Update, Delete) application built using AngularJS for the frontend and Node.js with Express.js for the backend. It allows users to perform CRUD operations on a database table via a web interface.

## Features

- **Create**: Users can create new records by entering a name and clicking the "Create" button.
- **Read**: Existing records are displayed in a table showing their IDs and descriptions.
- **Update**: Users can update existing records by entering the ID of the record to update and its new description, then clicking the "Update" button.
- **Delete**: Users can delete existing records by entering the ID of the record to delete and clicking the "Delete" button.

## Technologies Used

- **AngularJS**: Frontend framework for dynamic web applications.
- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Web application framework for Node.js used for building APIs and web applications.
- **SQL Server**: Database management system used to store and manage data.

## Prerequisites

- Node.js installed on your local machine.
- SQL Server installed and running on your local machine.
- Basic knowledge of AngularJS, Node.js, Express.js, and SQL Server.

## Dependencies

- **mssql**: A SQL Server client for Node.js.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **cors**: Middleware for enabling CORS (Cross-Origin Resource Sharing) in Express.js.
- **express**: Web application framework for Node.js used for building APIs and web applications.

## Database Schema

The SQL Server database used in this application has the following schema:

- **Table Name**: TestTable
| **Column Name** | **DATA TYPE** |
|-|-|
| **test_id** | `INT PRIMARY KEY AUTO_INCREMENT`` |
| **test_value** | `VARCHAR(50)`` |

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies
- `npm install express`
- `npm install dotenv`
- `npm install mssql`
- `npm install cors`
6. Create a `.env` file in the root directory and define the following environment variables:
   ```
   DB_USER=admin
   DB_PASSWORD=pass
   DB_SERVER=DESKTOP-RRTU67G\\PLAYGROUND
   DB_NAME=Test
   ```
7. Set up the SQL Server database with the specified schema and configure the connection settings in `server.js`.
8. Run the server by executing `node server.js`.
9. Open a web browser and go to `http://localhost:3000` to access the CRUD application.

## Directory Structure

```
crud-application/
│
├── public/             # Static files served by the Express.js server
│   ├── index.html      # HTML template for the frontend interface
│   ├── styles.css      # CSS styles for the frontend interface
│   └── js/             # JavaScript files for the AngularJS application
│       └── app.js      # AngularJS application logic
│
├── server.js           # Node.js server code using Express.js
│
├── config.js           # Database configuration (optional if using .env)
│
├── .env                # Environment variables (ignored by git)
│
├── package.json        # Project metadata and dependencies
│
└── README.md           # Project documentation
```
