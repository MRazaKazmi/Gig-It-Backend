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
const proposal_1 = require("../models/proposal");
const helpers_1 = require("./helpers");
const ProposalStoreInstance = new proposal_1.ProposalStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gigid = req.params.gig_id;
        console.log(gigid);
        const proposals = yield ProposalStoreInstance.index(gigid);
        res.json(proposals);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gigid = req.params.gig_id;
        const { userid, coverletter, bidamount, status, datesubmitted } = req.body;
        if (userid === undefined || coverletter === undefined || bidamount === undefined || status === undefined || datesubmitted === undefined) {
            const missingParameters = [];
            if (userid === undefined)
                missingParameters.push('userid');
            if (coverletter === undefined)
                missingParameters.push('coverletter');
            if (bidamount === undefined)
                missingParameters.push('bidamount');
            if (status === undefined)
                missingParameters.push('status');
            if (datesubmitted === undefined)
                missingParameters.push('datesubmitted');
            res.status(400);
            res.send(`Some required parameters are missing: ${missingParameters.join(', ')}`);
            return false;
        }
        const proposal = { userid, gigid, coverletter, bidamount, status, datesubmitted };
        const newProposal = yield ProposalStoreInstance.create(proposal);
        res.json(newProposal);
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
        const proposal = yield ProposalStoreInstance.show(id);
        res.json(proposal);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const readProposalsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.params.userId;
        const proposalsForUser = yield ProposalStoreInstance.readProposalsForUser(userid);
        res.json(proposalsForUser);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const readProposalsForPUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.params.userId;
        const proposalsForPUser = yield ProposalStoreInstance.readProposalsForPUser(userid);
        res.json(proposalsForPUser);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const updateProposalStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proposalid = req.params.proposalId;
        const { status } = req.body;
        const updateProposalStatus = yield ProposalStoreInstance.updateProposalStatus(status, proposalid);
        res.json(updateProposalStatus);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const getProposalsWithGigsPUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.params.userId;
        const proposalsWithGigsPUser = yield ProposalStoreInstance.getProposalsWithGigsPUser(userid);
        res.json(proposalsWithGigsPUser);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
const getProposalsWithGigs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.params.userId;
        const proposalsWithGigs = yield ProposalStoreInstance.getProposalsWithGigs(userid);
        res.json(proposalsWithGigs);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
function ProposalRoutes(app) {
    app.get("/gigs/:gig_id/proposals", helpers_1.verifyAuthToken, index);
    app.post("/gigs/:gig_id/proposals/create", helpers_1.verifyAuthToken, create);
    app.get("/gigs/:gig_id/proposals/:id", helpers_1.verifyAuthToken, read);
    app.get('/proposals/user/:userId', helpers_1.verifyAuthToken, readProposalsForUser);
    app.get('/proposals/p_user/:userId', helpers_1.verifyAuthToken, readProposalsForPUser);
    app.patch('/proposals/:proposalId/status', helpers_1.verifyAuthToken, updateProposalStatus);
    app.get('/proposalswithgigs/p_user/:userId', helpers_1.verifyAuthToken, getProposalsWithGigsPUser);
    app.get('/proposalswithgigs/user/:userId', helpers_1.verifyAuthToken, getProposalsWithGigs);
}
exports.default = ProposalRoutes;
