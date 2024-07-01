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
const gig_1 = require("../../models/gig");
const user_1 = require("../../models/user");
const gigStore = new gig_1.GigStore();
const userStore = new user_1.UserStore();
describe("Gig Model", () => {
    const testGig = {
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
    const testUser = {
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
    }));
    it('should have an index method', () => {
        expect(gigStore.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(gigStore.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(gigStore.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(gigStore.delete).toBeDefined();
    });
    it('create method should add a gig', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield gigStore.create({
            userid: testUser.userid,
            title: 'testtitle',
            description: 'testdescription',
            type: 'testtype',
            location: 'testlocation',
            budget: 100,
            dateposted: '01/01/2024',
            status: 'Open'
        });
        testGig.gigid = result.gigid;
        expect(result.title).toEqual(testGig.title);
        expect(result.description).toEqual(testGig.description);
        expect(result.location).toEqual(testGig.location);
    }));
    it('index method should return a list of gigs', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield gigStore.index();
        expect(result.length).toBe(1);
        expect(result[0].title).toEqual(testGig.title);
        expect(result[0].description).toEqual(testGig.description);
        expect(result[0].location).toEqual(testGig.location);
    }));
    it('show method should return the correct gig', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield gigStore.show(testGig.gigid);
        expect(result.title).toEqual(testGig.title);
        expect(result.description).toEqual(testGig.description);
        expect(result.location).toEqual(testGig.location);
    }));
    it('delete method should remove the gig', () => __awaiter(void 0, void 0, void 0, function* () {
        yield gigStore.delete(testGig.gigid);
        const result = yield gigStore.index();
        expect(result).toEqual([]);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        userStore.delete(testUser.userid);
    }));
});
