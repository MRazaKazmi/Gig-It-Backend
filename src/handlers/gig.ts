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
    const { userid, title, description, location, budget, dateposted, status } = req.body;

    if (userid === undefined || title === undefined || description === undefined || location === undefined || budget === undefined || dateposted === undefined || status === undefined) {
      res.status(400)
      res.send("Some required parameters are missing! eg. :products, :status, :user_id")
      return false
    }
    const gig = { userid, title, description, location, budget, dateposted, status};

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



export default function orderRoutes (app: Application) {
  app.get("/gigs", verifyAuthToken, index)
  app.post("/gigs/create", verifyAuthToken, create)
  app.get("/gigs/:id", verifyAuthToken, read)
}