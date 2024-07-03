/* Replace with your SQL commands */

CREATE TABLE gigs (
    GigID SERIAL PRIMARY KEY,
    UserID INT REFERENCES users(UserID),
    Title VARCHAR(100) NOT NULL,
    Description TEXT,
    Type TEXT,
    Location TEXT,
    Budget NUMERIC(10,2),
    DatePosted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(20) DEFAULT 'Open' -- Assuming status can be 'Open', 'In Progress', 'Completed', etc.
);
