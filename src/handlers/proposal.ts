import {Application, Request, Response} from "express"
import {Proposal, ProposalStore} from "../models/proposal"
import {verifyAuthToken} from "./helpers"

const ProposalStoreInstance = new ProposalStore()

const index = async (req: Request, res: Response) => {
  try {
    const gigid = req.params.gig_id as unknown as number;
    console.log(gigid)
    const proposals: Proposal[] = await ProposalStoreInstance.index(gigid)

    res.json(proposals)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const gigid = req.params.gig_id as unknown as number;

    const { userid, coverletter, bidamount, status, datesubmitted } = req.body;
    if (userid === undefined || coverletter === undefined || bidamount === undefined || status === undefined || datesubmitted === undefined) {
      const missingParameters = [];
      if (userid === undefined) missingParameters.push('userid');
      if (coverletter === undefined) missingParameters.push('coverletter');
      if (bidamount === undefined) missingParameters.push('bidamount');
      if (status === undefined) missingParameters.push('status');
      if (datesubmitted === undefined) missingParameters.push('datesubmitted');

      res.status(400)
      res.send(`Some required parameters are missing: ${missingParameters.join(', ')}`);
      return false
    }

    const proposal = { userid, gigid, coverletter, bidamount, status, datesubmitted};

    const newProposal: Proposal = await ProposalStoreInstance.create(proposal)

    res.json(newProposal)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

const read = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number

    if (id === undefined) {
      res.status(400)
      res.send("Missing required parameter :id.")
      return false
    }

    const proposal: Proposal = await ProposalStoreInstance.show(id)

    res.json(proposal)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

const readProposalsForUser = async (req: Request, res: Response) => {
  try {
    const userid = req.params.userId as unknown as number;
    const proposalsForUser = await ProposalStoreInstance.readProposalsForUser(userid)

    res.json(proposalsForUser)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

const readProposalsForPUser = async (req: Request, res: Response) => {
  try {
    const userid = req.params.userId as unknown as number;
    const proposalsForPUser = await ProposalStoreInstance.readProposalsForPUser(userid)

    res.json(proposalsForPUser)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}


const updateProposalStatus = async (req: Request, res: Response) => {
  try {
    const proposalid = req.params.proposalId as unknown as number;
    const { status } = req.body;
    const updateProposalStatus = await ProposalStoreInstance.updateProposalStatus(status, proposalid);

    res.json(updateProposalStatus)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

const getProposalsWithGigsPUser = async (req: Request, res: Response) => {
  try {
    const userid = req.params.userId as unknown as number;
    const proposalsWithGigsPUser = await ProposalStoreInstance.getProposalsWithGigsPUser(userid);
    res.json(proposalsWithGigsPUser);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const getProposalsWithGigs = async (req: Request, res: Response) => {
  try {
    const userid = req.params.userId as unknown as number;
    const proposalsWithGigs = await ProposalStoreInstance.getProposalsWithGigs(userid);
    res.json(proposalsWithGigs);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};


  export default function ProposalRoutes (app: Application) {
  app.get("/gigs/:gig_id/proposals", verifyAuthToken, index)
  app.post("/gigs/:gig_id/proposals/create", verifyAuthToken, create)
  app.get("/gigs/:gig_id/proposals/:id", verifyAuthToken, read)
  app.get('/proposals/user/:userId', verifyAuthToken,readProposalsForUser )
  app.get('/proposals/p_user/:userId', verifyAuthToken,readProposalsForPUser )
  app.patch('/proposals/:proposalId/status', verifyAuthToken, updateProposalStatus)
  app.get('/proposalswithgigs/p_user/:userId', verifyAuthToken,getProposalsWithGigsPUser )
  app.get('/proposalswithgigs/user/:userId', verifyAuthToken,getProposalsWithGigs)
}
