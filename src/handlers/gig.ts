import {Application, Request, Response} from "express"
import {Gig, GigStore} from "../models/gig"
import {verifyAuthToken} from "./helpers"

const GigStoreInstance = new GigStore()

const index = async (req: Request, res: Response) => {
  try {
    const gigs: Gig[] = await GigStoreInstance.index()

    res.json(gigs)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const { userid, title, description, type, location, budget, dateposted, status } = req.body;

    if (userid === undefined || title === undefined || description === undefined || type === undefined ||location === undefined || budget === undefined || dateposted === undefined || status === undefined) {
      const missingParameters = [];
      if (title === undefined) missingParameters.push('title');
      if (description === undefined) missingParameters.push('description');
      if (type === undefined) missingParameters.push('type');
      if (location === undefined) missingParameters.push('location');
      if (budget === undefined) missingParameters.push('budget');
      if (dateposted === undefined) missingParameters.push('dateposted');
      if (status === undefined) missingParameters.push('status');

      res.status(400)
      res.send(`Some required parameters are missing: ${missingParameters.join(', ')}`);
      return false
    }
    const gig = { userid, title, description, type, location, budget, dateposted, status};

    const newGig: Gig = await GigStoreInstance.create(gig)

    res.json(newGig)
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

    const gig: Gig = await GigStoreInstance.show(id)

    res.json(gig)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}


const updateGigStatus = async (req: Request, res: Response) => {
  try {
    const gigid = req.params.GigId as unknown as number;
    const { status } = req.body;
    const updateGigStatus = await GigStoreInstance.updateGigStatus(status, gigid);

    res.json(updateGigStatus)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}


  export default function orderRoutes (app: Application) {
  app.get("/gigs", verifyAuthToken, index)
  app.post("/gigs/create", verifyAuthToken, create)
  app.get("/gigs/:id", verifyAuthToken, read)
  app.patch('/gigs/:GigId/status', verifyAuthToken, updateGigStatus)}

