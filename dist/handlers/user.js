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
const user_1 = require("../models/user");
const helpers_1 = require("./helpers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET;
const UserStoreInstance = new user_1.UserStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserStoreInstance.index();
        res.json(users);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, usertype } = req.body;
        console.log(req.body);
        const user = { username, email, password, usertype };
        if (username === undefined || email === undefined || password === undefined || usertype === undefined) {
            res.status(400);
            res.send("Some required parameters are missing.");
            return false;
        }
        const newUser = yield UserStoreInstance.create(user);
        console.log(newUser);
        // res.json(createUserAuthToken(newUser))
        const token = jsonwebtoken_1.default.sign({ user: newUser }, SECRET);
        console.log(token);
        res.json({ token });
        // res.json(newUser)
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userid;
        if (id === undefined) {
            res.status(400);
            res.send("Missing required parameter :id.");
            return false;
        }
        const user = yield UserStoreInstance.show(id);
        res.json(user);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (email === undefined || password === undefined) {
            res.status(400);
            res.send("Some required parameters are missing! eg. :username, :password");
            return false;
        }
        const user = yield UserStoreInstance.authenticate(email, password);
        if (user === null) {
            res.status(401);
            res.send(`Wrong password for user ${email}.`);
            return false;
        }
        res.json({ token: (0, helpers_1.createUserAuthToken)(user) });
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
function userRoutes(app) {
    app.get("/users", helpers_1.verifyAuthToken, index);
    app.post("/users/create", create);
    app.get("/users/:id", helpers_1.verifyAuthToken, read);
    app.post("/users/auth", authenticate);
}
exports.default = userRoutes;
