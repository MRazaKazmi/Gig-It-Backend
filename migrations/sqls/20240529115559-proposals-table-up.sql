/* Replace with your SQL commands */

CREATE TABLE mazdurr.proposals (
    ProposalID SERIAL PRIMARY KEY,
    UserID INT REFERENCES mazdurr.users(UserID),
    GigID INT REFERENCES mazdurr.gigs(GigID),
    CoverLetter TEXT,
    BidAmount NUMERIC(10,2),
    Status VARCHAR(20) DEFAULT 'Submitted', -- Assuming status can be 'Submitted', 'Accepted', 'Rejected', etc.
    DateSubmitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);