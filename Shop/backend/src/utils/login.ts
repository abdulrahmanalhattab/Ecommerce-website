import User from "./db/User";
import token from "./db/token";
import { NewSession } from "./token/new-session";

export async function Login(req: any) {
  const _Email = req.body.email;
  const _Password = req.body.password;
  if ((await User.findOne({ email: _Email, password: _Password })) === null)
    return { status: false, msg: "Email or password invalid. " };

  const _Token: any = await token.findOne(
    { email: _Email },
    { _id: 0, token: 1 }
  );
  const _NewSession: any = await NewSession(_Email, _Token.token);
  if (_NewSession.status === false) return _NewSession;

  return {
    status: true,
    data: {
      session: _NewSession.data.session,
      email: _Email,
    },
  };
}
