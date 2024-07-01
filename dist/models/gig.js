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
exports.GigStore = void 0;
const database_1 = __importDefault(require("../database"));
class GigStore {
    create(newGig) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const sql = 'INSERT INTO mazdurr.gigs (userid, title, description, type, location, budget, dateposted, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
                const result = yield conn.query(sql, [
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
            }
            catch (err) {
                conn.release();
                console.log('Failed to create new gig.', err);
                throw err;
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const sql = 'SELECT * FROM mazdurr.gigs';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                conn.release();
                console.log('Failed to query all gigs.', err);
                throw err;
            }
        });
    }
    show(gigid) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const sql = 'SELECT * FROM mazdurr.gigs WHERE gigid=$1';
                const result = yield conn.query(sql, [gigid]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                conn.release();
                console.log('Failed to query gig details.', err);
                throw err;
            }
        });
    }
    delete(gigid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM mazdurr.gigs WHERE gigid = $1";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [gigid]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Could not delete gig ${gigid}. Error: ${err}`);
            }
        });
    }
}
exports.GigStore = GigStore;
