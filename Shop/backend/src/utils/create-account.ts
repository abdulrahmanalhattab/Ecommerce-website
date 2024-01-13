import User from "./db/User";
import { NewToken } from "./token/new-token";

export async function CreateNewAccount(req: any, res: any) {
  const _Email = req.body.email;
  const _Password = req.body.password;
  const _Username = req.body.username;
  if ((await User.findOne({ email: _Email })) === null) {
    const NewAccount = new User({
      email: _Email,
      password: _Password,
      username: _Username,
    })
      .save()
      .then(async () => {
        return await User.findOne({ email: _Email });
      })
      .catch(() => {
        return { msg: "Failed in send data to database. " };
      });
    const Token = await NewToken(_Email);
    if (Token.status === false) {
      return Token;
    }
    return { status: true };
  } else {
    return { status: false, msg: "Already register" };
  }
}
