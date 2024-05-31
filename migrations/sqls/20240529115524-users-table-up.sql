/* Replace with your SQL commands */

CREATE TABLE users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Password VARCHAR(100) NOT NULL,
    UserType VARCHAR(20) NOT NULL -- Assuming UserType can be 'Contractor' or 'Client'
);
