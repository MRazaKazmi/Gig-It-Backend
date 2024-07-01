"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = exports.createUserAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET;
function createUserAuthToken(user) {
    const payload = {
        userid: user.userid, // Include user ID in the payload
        email: user.email,
        usertype: user.usertype,
        username: user.username
    };
    const options = { expiresIn: '1h' };
    return jsonwebtoken_1.default.sign(payload, SECRET, options);
}
exports.createUserAuthToken = createUserAuthToken;
;
// export function createUserAuthToken (user: User) {
//   return jwt.sign(
//     {
//       userid: user.userid,
//       usertype: user.usertype, // Include usertype in the payload
//       email: user.email
//     },
//     SECRET,
//     { expiresIn: '1h' }
//   );
// };
function verifyAuthToken(req, res, next) {
    if (!req.headers.authorization) {
        console.log(req.headers);
        res.status(401);
        res.json("Access denied, invalid token");
        return false;
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        jsonwebtoken_1.default.verify(token, SECRET);
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401);
        res.json("Access denied, invalid token");
        return false;
    }
}
exports.verifyAuthToken = verifyAuthToken;
