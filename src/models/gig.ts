import pool from '../database';

export type Gig = {
    gigid?: number;
    userid: number;
    title: string;
    description:string;
    type:string;
    location:string;
    budget: number;
    dateposted: string | Date;
    status: string;
};

export class GigStore {
    async create(newGig: Gig): Promise<Gig> {

        const conn = await pool.connect();

        try {
            const sql =
                'INSERT INTO mazdurr.gigs (userid, title, description, type, location, budget, dateposted, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'

            const result = await conn.query(sql, [
                newGig.userid,
                newGig.title,
                newGig.description,
                newGig.type,
                newGig.location,
                newGig.budget,
                newGig.dateposted,
                newGig.status
            ]);

            const createdGig = result.rows[0];

            conn.release();

            return createdGig;
        } catch (err) {
            conn.release();

            console.log('Failed to create new gig.', err);

            throw err;
        }
    }

    async index(): Promise<Gig[]> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM mazdurr.gigs';
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            conn.release();

            console.log('Failed to query all gigs.', err);

            throw err;
        }
    }

    async show(gigid: number): Promise<Gig> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM mazdurr.gigs WHERE gigid=$1';
            const result = await conn.query(sql, [gigid]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            conn.release();

            console.log('Failed to query gig details.', err);

            throw err;
        }
    }

    async delete(gigid: number): Promise<Gig> {
        try {
          const sql = "DELETE FROM mazdurr.gigs WHERE gigid = $1";
          const conn = await pool.connect();

          const result = await conn.query(sql, [gigid]);

          const user = result.rows[0];

          conn.release();

          return user;
        } catch (err) {
          throw new Error(`Could not delete gig ${gigid}. Error: ${err}`);
        }
      }

}