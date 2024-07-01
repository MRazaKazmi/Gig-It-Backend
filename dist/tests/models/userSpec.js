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
const user_1 = require("../../models/user");
const store = new user_1.UserStore();
describe("User Model", () => {
    const testUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        usertype: 'Contractor'
    };
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            usertype: 'Contractor'
        });
        testUser.userid = result.userid;
        expect(result.username).toEqual(testUser.username);
        expect(result.email).toEqual(testUser.email);
        expect(result.password).toEqual(testUser.password);
        expect(result.usertype).toEqual(testUser.usertype);
    }));
    it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([testUser]);
    }));
    it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(testUser.userid);
        expect(result).toEqual(testUser);
    }));
    it('delete method should remove the user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield store.delete(testUser.userid);
        const result = yield store.index();
        expect(result).toEqual([]);
    }));
});
