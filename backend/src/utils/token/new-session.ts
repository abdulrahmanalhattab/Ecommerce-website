import Session from "../db/session";

async function GeneratorSession(email: string, token: string) {
  var charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";

  while (true) {
    var session: String = token + ".";

    for (var i = 0; i <= 30; i++) {
      var randomIndex = Math.floor(Math.random() * charSet.length);
      session += charSet.charAt(randomIndex);
    }
    if ((await Session.findOne({ session: session, email: email })) === null)
      return session;
  }
}

export async function NewSession(email: string, token: string) {
  // if token not found or equals null return the data is incorrect.
  if (token === null) return { status: false, msg: "The data is incorrect. " };

  // Create new session
  const session = await GeneratorSession(email, token);

  const newSession = await new Session({
    email: email,
    token: token,
    session: session,
  })
    .save()
    .then(() => {
      return {
        status: true,
        data: {
          token: token,
          email: email,
          session: session,
        },
      };
    })
    .catch(() => {
      return { status: false, msg: "Error in sending data. " };
    });

  return newSession;
}
