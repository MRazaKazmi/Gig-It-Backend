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
Object.defineProperty(exports, "__esModule", { value: true });
const proposal_1 = require("../../models/proposal");
const gig_1 = require("../../models/gig");
const user_1 = require("../../models/user");
const proposalStore = new proposal_1.ProposalStore();
const gigStore = new gig_1.GigStore();
const userStore = new user_1.UserStore();
describe("Proposal Model", () => {
    let testProposal = {
        proposalid: 1,
        userid: 1,
        gigid: 1,
        coverletter: 'testcoverletter',
        bidamount: 100,
        status: 'Accepted',
        datesubmitted: '01/01/2024'
    };
    let testGig = {
        gigid: 1,
        userid: 1,
        title: 'testtitle',
        description: 'testdescription',
        type: 'testtype',
        location: 'testlocation',
        budget: 100,
        dateposted: '01/01/2024',
        status: 'Open'
    };
    let testUser = {
        userid: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        usertype: 'Contractor'
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield userStore.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            usertype: 'Contractor'
        });
        testUser.userid = createUser.userid;
        testGig.userid = createUser.userid;
        const createGig = yield gigStore.create({
            userid: testGig.userid,
            title: 'testtitle',
            description: 'testdescription',
            location: 'testlocation',
            type: 'testtype',
            budget: 100,
            dateposted: '01/01/2024',
            status: 'Open'
        });
        testGig.gigid = createGig.gigid;
        testProposal.gigid = createGig.gigid;
    }));
    it('should have an index method', () => {
        expect(proposalStore.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(proposalStore.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(proposalStore.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(proposalStore.delete).toBeDefined();
    });
    it('create method should add a proposal', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield proposalStore.create({
            userid: testGig.userid,
            gigid: testGig.gigid,
            coverletter: 'testcoverletter',
            bidamount: 100,
            status: 'Accepted',
            datesubmitted: '01/01/2024'
        });
        testProposal.proposalid = result.proposalid;
        expect(result.coverletter).toEqual(testProposal.coverletter);
        expect(result.status).toEqual(testProposal.status);
    }));
    it('index method should return a list of proposals', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield proposalStore.index(testGig.gigid);
        expect(result.length).toBe(1);
        expect(result[0].coverletter).toEqual(testProposal.coverletter);
        expect(result[0].status).toEqual(testProposal.status);
    }));
    it('show method should return the correct proposal', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield proposalStore.show(1);
        expect(result.coverletter).toEqual(testProposal.coverletter);
        expect(result.status).toEqual(testProposal.status);
    }));
    it('delete method should remove the proposal', () => __awaiter(void 0, void 0, void 0, function* () {
        yield proposalStore.delete(testProposal.proposalid);
        const result = yield proposalStore.index(testGig.gigid);
        expect(result).toEqual([]);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        userStore.delete(testUser.userid);
        gigStore.delete(testGig.gigid);
    }));
});
