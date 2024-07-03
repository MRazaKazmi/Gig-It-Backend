"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
const secret = process.env.JWT_SECRET;
class UserStore {
    create(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHash = bcrypt_1.default.hashSync(newUser.password + pepper, parseInt(saltRounds));
            const conn = yield database_1.default.connect();
            try {
                const sql = 'INSERT INTO users (username, email, password, usertype) VALUES ($1, $2, $3, $4) RETURNING *';
                const result = yield conn.query(sql, [
                    newUser.username,
                    newUser.email,
                    passwordHash,
                    newUser.usertype,
                ]);
                const createdUser = result.rows[0];
                conn.release();
                return createdUser;
            }
            catch (err) {
                conn.release();
                console.log('Failed to create new user.', err);
                throw err;
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                conn.release();
                console.log('Failed to query all users.', err);
                throw err;
            }
        });
    }
    show(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const sql = 'SELECT * FROM users WHERE userid=$1';
                const result = yield conn.query(sql, [userid]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                conn.release();
                console.log('Failed to query user details.', err);
                throw err;
            }
        });
    }
    delete(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM users WHERE userid = $1";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [userid]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Could not delete user ${userid}. Error: ${err}`);
            }
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM users WHERE email = $1";
                const connection = yield database_1.default.connect();
                const { rows } = yield connection.query(sql, [email]);
                console.log(rows);
                if (rows.length > 0) {
                    const user = rows[0];
                    console.log(user);
                    if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                        return user;
                    }
                }
                connection.release();
                return null;
            }
            catch (err) {
                throw new Error(`Could not find user ${email}. ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
