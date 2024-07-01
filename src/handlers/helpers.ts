import jwt, {Secret} from "jsonwebtoken"
import {User} from "../models/user"
import {NextFunction, Request, Response} from "express"

const SECRET = process.env.JWT_SECRET as Secret

export function createUserAuthToken (user: User) {
    const payload = {
    userid: user.userid, // Include user ID in the payload
    email: user.email,
    usertype: user.usertype,
    username:user.username
  };
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, SECRET, options);
};
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
export function verifyAuthToken (req: Request, res: Response, next: NextFunction): void | boolean {
  if (!req.headers.authorization) {

    console.log(req.headers)
    res.status(401)
    res.json("Access denied, invalid token")

    return false
  }

  try {
    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, SECRET)

    next()
  } catch (err) {
    console.error(err)

    res.status(401)
    res.json("Access denied, invalid token")

    return false
  }
}