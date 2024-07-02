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
const gig_1 = require("../models/gig");
const helpers_1 = require("./helpers");
const GigStoreInstance = new gig_1.GigStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gigs = yield GigStoreInstance.index();
        res.json(gigs);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userid, title, description, type, location, budget, dateposted, status } = req.body;
        if (userid === undefined || title === undefined || description === undefined || type === undefined || location === undefined || budget === undefined || dateposted === undefined || status === undefined) {
            const missingParameters = [];
            if (title === undefined)
                missingParameters.push('title');
            if (description === undefined)
                missingParameters.push('description');
            if (type === undefined)
                missingParameters.push('type');
            if (location === undefined)
                missingParameters.push('location');
            if (budget === undefined)
                missingParameters.push('budget');
            if (dateposted === undefined)
                missingParameters.push('dateposted');
            if (status === undefined)
                missingParameters.push('status');
            res.status(400);
            res.send(`Some required parameters are missing: ${missingParameters.join(', ')}`);
            return false;
        }
        const gig = { userid, title, description, type, location, budget, dateposted, status };
        const newGig = yield GigStoreInstance.create(gig);
        res.json(newGig);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === undefined) {
            res.status(400);
            res.send("Missing required parameter :id.");
            return false;
        }
        const gig = yield GigStoreInstance.show(id);
        res.json(gig);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const updateGigStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gigid = req.params.GigId;
        const { status } = req.body;
        const updateGigStatus = yield GigStoreInstance.updateGigStatus(status, gigid);
        res.json(updateGigStatus);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
function orderRoutes(app) {
    app.get("/gigs", helpers_1.verifyAuthToken, index);
    app.post("/gigs/create", helpers_1.verifyAuthToken, create);
    app.get("/gigs/:id", helpers_1.verifyAuthToken, read);
    app.patch('/gigs/:GigId/status', helpers_1.verifyAuthToken, updateGigStatus);
}
exports.default = orderRoutes;
