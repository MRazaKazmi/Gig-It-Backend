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
                'INSERT INTO mazdurr.proposals (userid, gigid, coverletter, bidamount, status, datesubmitted) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'

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

    async index(): Promise<Proposal[]> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM mazdurr.proposals';
            const result = await conn.query(sql);

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
            const sql = 'SELECT * FROM mazdurr.proposals WHERE proposalid=$1';
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
          const sql = "DELETE FROM mazdurr.proposals WHERE proposalid = $1";
          const conn = await pool.connect();

          const result = await conn.query(sql, [proposalid]);

          const user = result.rows[0];

          conn.release();

          return user;
        } catch (err) {
          throw new Error(`Could not delete proposal ${proposalid}. Error: ${err}`);
        }
      }

}