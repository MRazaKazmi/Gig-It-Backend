CREATE TABLE users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL,
    UserType VARCHAR(20) NOT NULL -- Assuming UserType can be 'Contractor' or 'Client'
);

CREATE TABLE gigs (
    JobID SERIAL PRIMARY KEY,
    UserID INT REFERENCES users(UserID),
    Title VARCHAR(100) NOT NULL,
    Description TEXT,
    Location TEXT,
    Budget NUMERIC(10,2),
    DatePosted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(20) DEFAULT 'Open' -- Assuming status can be 'Open', 'In Progress', 'Completed', etc.
);

CREATE TABLE proposals (
    ProposalID SERIAL PRIMARY KEY,
    UserID INT REFERENCES users(UserID),
    GigID INT REFERENCES gigs(GigID),
    CoverLetter TEXT,
    BidAmount NUMERIC(10,2),
    Status VARCHAR(20) DEFAULT 'Submitted', -- Assuming status can be 'Submitted', 'Accepted', 'Rejected', etc.
    DateSubmitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Attributes: ReviewID (Primary Key), Rating, Comment, ReviewDate, ReviewedUserID (Foreign Key referencing User.UserID), ReviewerUserID (Foreign Key referencing User.UserID), GigID (Foreign Key referencing Gig.GigID), etc.