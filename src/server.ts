import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from "./handlers/user"
import GigRoutes from "./handlers/gig"
import ProposalRoutes from "./handlers/proposal"

const cors = require('cors');

const app = express()

app.use(cors({
  origin: 'http://gig-it.s3-website.eu-north-1.amazonaws.com'
}));

var port = process.env.PORT || 3000;

if (process.env.ENV === "test") {
  port = 81
}

const address: string = `127.0.0.1:${port}`

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})


userRoutes(app)
GigRoutes(app)
ProposalRoutes(app)


app.listen(port, () => {
  console.info(`Starting app on: ${address}`)
})

export default app