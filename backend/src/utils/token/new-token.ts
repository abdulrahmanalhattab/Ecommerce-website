import Token from "../db/token";

async function GeneratorToken() {
  var charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
  while (true) {
    var token: String = "Y24";

    for (var i = 0; i <= 15; i++) {
      var randomIndex = Math.floor(Math.random() * charSet.length);
      token += charSet.charAt(randomIndex);
    }

    const newToken = await Token.findOne({ token: token });
    if (newToken === null) return token;
  }
}

export async function NewToken(Email: string) {
  const _Email = Email;
  const _Token = await GeneratorToken();

  if ((await Token.findOne({ email: _Email })) === null) {
    const CreateToken = await new Token({
      email: _Email,
      token: _Token,
    })
      .save()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });

    return {
      status: true,
      data: {
        token: CreateToken.token,
        email: CreateToken.email,
      },
    };
  } else {
    return { status: false, msg: "Already register" };
  }
}
