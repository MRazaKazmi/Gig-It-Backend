"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./handlers/user"));
const gig_1 = __importDefault(require("./handlers/gig"));
const proposal_1 = __importDefault(require("./handlers/proposal"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
var port = process.env.PORT || 3000;
if (process.env.ENV === "test") {
    port = 81;
}
const address = `127.0.0.1:${port}`;
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, user_1.default)(app);
(0, gig_1.default)(app);
(0, proposal_1.default)(app);
app.listen(port, () => {
    console.info(`Starting app on: ${address}`);
});
exports.default = app;
