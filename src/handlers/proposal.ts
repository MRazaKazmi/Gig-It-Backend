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
      res.status(400)
      res.send("Some required parameters are missing! eg. :products, :status, :user_id")
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


  export default function ProposalRoutes (app: Application) {
  app.get("/gigs/:gig_id/proposals", verifyAuthToken, index)
  app.post("/gigs/:gig_id/proposals/create", verifyAuthToken, create)
  app.get("/gigs/:gig_id/proposals/:id", verifyAuthToken, read)
}
