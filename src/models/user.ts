import pool from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;
const secret = process.env.JWT_SECRET as string;


export type User = {
    userid?: number;
    username: string;
    email: string;
    password: string;
    usertype: string;
}

export class UserStore {
    async create(newUser: User): Promise<User> {
        const passwordHash = bcrypt.hashSync(
            newUser.password + pepper,
            parseInt(saltRounds)
        );

        const conn = await pool.connect();

        try {
            const sql =
                'INSERT INTO users (username, email, password, usertype) VALUES ($1, $2, $3, $4) RETURNING *'

            const result = await conn.query(sql, [
                newUser.username,
                newUser.email,
                passwordHash,
                newUser.usertype,

            ]);

            const createdUser = result.rows[0];

            conn.release();

            return createdUser;
        } catch (err) {
            conn.release();

            console.log('Failed to create new user.', err);

            throw err;
        }
    }

    async index(): Promise<User[]> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            conn.release();

            console.log('Failed to query all users.', err);

            throw err;
        }
    }

    async show(userid: number): Promise<User> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM users WHERE userid=$1';
            const result = await conn.query(sql, [userid]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            conn.release();

            console.log('Failed to query user details.', err);

            throw err;
        }
    }

    async delete(userid: number): Promise<User> {
        try {
          const sql = "DELETE FROM users WHERE userid = $1";
          const conn = await pool.connect();

          const result = await conn.query(sql, [userid]);

          const user = result.rows[0];

          conn.release();

          return user;
        } catch (err) {
          throw new Error(`Could not delete user ${userid}. Error: ${err}`);
        }
      }

    async authenticate (email: string, password: string): Promise<User | null> {
        try {
            const sql = "SELECT * FROM users WHERE email = $1"
            const connection = await pool.connect()
            const {rows} = await connection.query(sql, [email])
            console.log(rows)

            if (rows.length > 0) {
            const user = rows[0]
            console.log(user)

            if (bcrypt.compareSync(password + pepper, user.password)) {
                return user
            }
            }

            connection.release()

            return null
        } catch (err) {
            throw new Error(`Could not find user ${email}. ${err}`)
        }
        }
    }

