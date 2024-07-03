import pool from '../database';

export type Proposal = {
    proposalid?: number;
    userid: number;
    gigid: number;
    coverletter:string;
    bidamount:number;
    status: string;
    datesubmitted: string | Date;
};

export class ProposalStore {
    async create(newProposal: Proposal): Promise<Proposal> {

        const conn = await pool.connect();

        try {
            const sql =
                'INSERT INTO proposals (userid, gigid, coverletter, bidamount, status, datesubmitted) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'

            const result = await conn.query(sql, [
                newProposal.userid,
                newProposal.gigid,
                newProposal.coverletter,
                newProposal.bidamount,
                newProposal.status,
                newProposal.datesubmitted,
            ]);

            const createdProposal = result.rows[0];

            conn.release();

            return createdProposal;
        } catch (err) {
            conn.release();

            console.log('Failed to create new proposal.', err);

            throw err;
        }
    }

    async index(gigid:number): Promise<Proposal[]> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM proposals WHERE gigid=$1';
            const result = await conn.query(sql, [gigid]);

            conn.release();
            return result.rows;
        } catch (err) {
            conn.release();

            console.log('Failed to query all proposals.', err);

            throw err;
        }
    }

    async show(proposalid: number): Promise<Proposal> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM proposals WHERE proposalid=$1';
            const result = await conn.query(sql, [proposalid]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            conn.release();

            console.log('Failed to query proposal details.', err);

            throw err;
        }
    }

    async delete(proposalid: number): Promise<Proposal> {
        try {
          const sql = "DELETE FROM proposals WHERE proposalid = $1";
          const conn = await pool.connect();

          const result = await conn.query(sql, [proposalid]);

          const user = result.rows[0];

          conn.release();

          return user;
        } catch (err) {
          throw new Error(`Could not delete proposal ${proposalid}. Error: ${err}`);
        }
      }

      async readProposalsForUser(userid: number) {
        try {
          const sql = "SELECT p.proposalid, p.gigid, p.coverletter, p.bidamount, p.status, p.datesubmitted, \
            g.title as gigtitle FROM proposals p JOIN gigs g ON p.gigid = g.gigid \
            WHERE g.userid = $1"

          const conn = await pool.connect();

          const result = await conn.query(sql, [userid]);

          conn.release();

          return result.rows;
        } catch (err) {
          throw new Error(`Could not delete proposal ${userid}. Error: ${err}`);
        }
      }

      async readProposalsForPUser(userid: number) {
        try {
          const sql = "SELECT p.proposalid, p.gigid, p.coverletter, p.bidamount, p.status, p.datesubmitted, \
            g.title as gigtitle FROM proposals p JOIN gigs g ON p.gigid = g.gigid \
            WHERE p.userid = $1"

          const conn = await pool.connect();

          const result = await conn.query(sql, [userid]);

          conn.release();

          return result.rows;
        } catch (err) {
          throw new Error(`Could not delete proposal ${userid}. Error: ${err}`);
        }
      }

      async updateProposalStatus(status: string, proposalid: number) {

        try {

          const sql = "UPDATE proposals SET status = $1 WHERE proposalid = $2 RETURNING *"

          const conn = await pool.connect();

          const result = await conn.query(sql, [status, proposalid]);

          conn.release();

          return result.rows;
        } catch (err) {
          throw new Error(` Error: ${err}`);
        }
      }

      async getProposalsWithGigsPUser(userid: number) {

        try {

          const sql = "SELECT p.proposalid, p.gigid, p.coverletter, p.bidamount, p.status, p.datesubmitted,g.title, \
          g.type FROM proposals p JOIN gigs g ON p.gigid = g.gigid WHERE p.userid = $1"


          const conn = await pool.connect();

          const result = await conn.query(sql, [userid]);

          conn.release();

          return result.rows;
        } catch (err) {
          throw new Error(` Error: ${err}`);
        }
      }
      async getProposalsWithGigs(userid: number) {

        try {

          const sql = "SELECT p.proposalid, p.gigid, p.coverletter, p.bidamount, p.status, p.datesubmitted,g.title, \
          g.type FROM proposals p JOIN gigs g ON p.gigid = g.gigid WHERE g.userid = $1"


          const conn = await pool.connect();

          const result = await conn.query(sql, [userid]);

          conn.release();

          return result.rows;
        } catch (err) {
          throw new Error(` Error: ${err}`);
        }
      }

    }
