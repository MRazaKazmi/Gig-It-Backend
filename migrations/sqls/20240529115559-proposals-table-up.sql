/* Replace with your SQL commands */

CREATE TABLE proposals (
    ProposalID SERIAL PRIMARY KEY,
    UserID INT REFERENCES users(UserID),
    GigID INT REFERENCES gigs(GigID),
    CoverLetter TEXT,
    BidAmount NUMERIC(10,2),
    Status VARCHAR(20) DEFAULT 'Submitted', -- Assuming status can be 'Submitted', 'Accepted', 'Rejected', etc.
    DateSubmitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);