import {Application, Request, Response} from "express"
import {User, UserStore} from "../models/user"
import {verifyAuthToken, createUserAuthToken} from "./helpers"
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET

const UserStoreInstance = new UserStore()

const index = async (req: Request, res: Response) => {
  try {
    const users: User[] = await UserStoreInstance.index()

    res.json(users)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

const create = async (req: Request, res: Response) => {
  try {

    const { username, email, password, usertype } = req.body;
    console.log(req.body)
    const user = { username, email, password, usertype };

    if (username === undefined ||email === undefined || password === undefined || usertype === undefined) {
      res.status(400)
      res.send("Some required parameters are missing.")
      return false
    }

    const newUser: User = await UserStoreInstance.create(user)
    console.log(newUser)
    // res.json(createUserAuthToken(newUser))
    const token = jwt.sign({ user: newUser }, SECRET as jwt.Secret );
    console.log(token)
    res.json({token})
    // res.json(newUser)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}


const read = async (req: Request, res: Response) => {
  try {
    const id = req.params.userid as unknown as number

    if (id === undefined) {
      res.status(400)
      res.send("Missing required parameter :id.")
      return false
    }

    const user: User = await UserStoreInstance.show(id)

    res.json(user)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

const authenticate = async (req: Request, res: Response) => {
  try {
    const email = req.body.email as unknown as string
    const password = req.body.password as unknown as string

    if (email === undefined || password === undefined) {
      res.status(400)
      res.send("Some required parameters are missing! eg. :username, :password")
      return false
    }

    const user: User | null = await UserStoreInstance.authenticate(email, password)

    if (user === null) {
      res.status(401)
      res.send(`Wrong password for user ${email}.`)

      return false
    }

    res.json({ token: createUserAuthToken(user) });
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

export default function userRoutes (app: Application) {
    app.get("/users", verifyAuthToken, index)
    app.post("/users/create", create)
    app.get("/users/:id", verifyAuthToken, read)
    app.post("/users/auth", authenticate)

}