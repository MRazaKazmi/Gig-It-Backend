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
exports.ProposalStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProposalStore {
    create(newProposal) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const sql = 'INSERT INTO mazdurr.proposals (userid, gigid, coverletter, bidamount, status, datesubmitted) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
                const result = yield conn.query(sql, [
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
            }
            catch (err) {
                conn.release();
                console.log('Failed to create new proposal.', err);
                throw err;
            }
        });
    }
    index(gigid) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const sql = 'SELECT * FROM mazdurr.proposals WHERE gigid=$1';
                const result = yield conn.query(sql, [gigid]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                conn.release();
                console.log('Failed to query all proposals.', err);
                throw err;
            }
        });
    }
    show(proposalid) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            try {
                const sql = 'SELECT * FROM mazdurr.proposals WHERE proposalid=$1';
                const result = yield conn.query(sql, [proposalid]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                conn.release();
                console.log('Failed to query proposal details.', err);
                throw err;
            }
        });
    }
    delete(proposalid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM mazdurr.proposals WHERE proposalid = $1";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [proposalid]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Could not delete proposal ${proposalid}. Error: ${err}`);
            }
        });
    }
    readProposalsForUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT p.proposalid, p.gigid, p.coverletter, p.bidamount, p.status, p.datesubmitted, \
            g.title as gigtitle FROM mazdurr.proposals p JOIN mazdurr.gigs g ON p.gigid = g.gigid \
            WHERE g.userid = $1";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [userid]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not delete proposal ${userid}. Error: ${err}`);
            }
        });
    }
    readProposalsForPUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT p.proposalid, p.gigid, p.coverletter, p.bidamount, p.status, p.datesubmitted, \
            g.title as gigtitle FROM mazdurr.proposals p JOIN mazdurr.gigs g ON p.gigid = g.gigid \
            WHERE p.userid = $1";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [userid]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not delete proposal ${userid}. Error: ${err}`);
            }
        });
    }
}
exports.ProposalStore = ProposalStore;
