import { CreateNewAccount } from "./utils/create-account";
import { CreateProduct } from "./utils/create-product";
import User from "./utils/db/User";
import product from "./utils/db/product";
import session from "./utils/db/session";
import token from "./utils/db/token";
import { Login } from "./utils/login";
import multer from "multer";
const cors = require("cors");
import express from "express";
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
import path from "path";
import fs from "fs";

const app = express();
const port = 3001;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["POST", "GET"],
  })
);

const urlDB = "mongodb://localhost:27017/shop";
mongoose.connect(urlDB);

const Profile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profile/");
  },
  filename: function (req, file, cb) {
    const OriginalName = file.originalname.split(".");
    const NewNameImg = req.cookies.auth.split(".")[0];
    cb(null, `${NewNameImg}.${OriginalName[OriginalName.length - 1]}`);
  },
});

async function GeneratorKeyImg() {
  var charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
  while (true) {
    var key: String = "";

    for (var i = 0; i <= 30; i++) {
      var randomIndex = Math.floor(Math.random() * charSet.length);
      key += charSet.charAt(randomIndex);
    }

    const newToken = await User.findOne({ photo: key });
    if (newToken === null) return key;
  }
}

const Product = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "product/");
  },
  filename: async function (req, file, cb) {
    const OriginalName = file.originalname.split(".");
    const key = await GeneratorKeyImg();
    cb(null, `${key}.${OriginalName[OriginalName.length - 1]}`);
  },
});

const UploadProfile = multer({
  storage: Profile,
});

const UploadProduct = multer({
  storage: Product,
});
const PathProfile = path.join(__dirname, "../profile");

const PathProduct = path.join(__dirname, "../product");

app.post(
  "/profile",
  UploadProfile.single("file"),
  async (req: any, res: any) => {
    const TypeImg = req.file.originalname.split(".")[1];
    let msg = {};
    if (TypeImg === "png" || TypeImg === "jpg" || TypeImg === "jpeg") {
      const Img = session
        .findOne({ session: req.cookies.auth }, { email: 1, _id: 0 })
        .then((result) => {
          if (result) {
            User.updateOne(
              { email: result.email },
              { photo: req.file.filename }
            );
            return { status: true, msg: "File uploaded successfully!" };
          } else {
            return { status: false, msg: "Data incorrect. " };
          }
        });
      msg = Img;
    } else {
      fs.unlink(path.join(PathProfile, req.file.filename), () => {});
      msg = { status: false, msg: "File not img. " };
    }
    res.send(msg);
  }
);

app.get("/img/:name", async (req: any, res: any) => {
  try {
    const img = path.join(PathProfile, req.params.name);
    await fs.promises.access(img);
    res.sendFile(img);
  } catch (error) {
    try {
      const img = path.join(PathProduct, req.params.name);
      await fs.promises.access(img);
      res.sendFile(img);
    } catch (error) {
      res.status(404).send("Image not found");
    }
  }
});

const checkuser = async (req: any, res: any, next: any) => {
  if (req.cookies.auth) {
    session
      .findOne({ session: req.cookies.auth }, { _id: 0, session: 1 })
      .then(() => {
        next();
      })
      .catch((err) => {
        console.log(err);
        res.send({ status: false });
      });
  } else {
    res.send({ status: false });
  }
};

app.post("/user", checkuser, async (req: any, res: any) => {
  const infoSession: any = await session.findOne({ session: req.cookies.auth });
  const info: any = await User.findOne(
    { email: infoSession.email },
    { _id: 0, username: 1, email: 1, photo: 1 }
  );
  res.header("Authorization", infoSession.session);
  res.send({
    status: true,
    data: {
      email: info.email,
      username: info.username,
      lang: info.language,
      photo: info.photo ? info.photo : null,
      session: req.cookies.auth,
    },
  });
});

app.get("/users", async (req: any, res: any) => {
  User.find(
    {},
    { email: 1, password: 1, username: 1, date: 1, type: 1, _id: 0 }
  )
    .then((result) => {
      if (result) {
        const size = 7;
        let data = [];

        for (let i = 0; i < result.length; i += size)
          data.push(result.slice(i, i + size));

        res.send({ status: true, data: data });
      } else {
        res.send({ status: false, msg: "Not found data. " });
      }
    })
    .catch(() => {
      res.send({ status: false, msg: "Error. " });
    });
});

app.post("/new-account", async (req: any, res: any) => {
  let result: any;
  if (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email) &&
    /^[a-zA-Z0-9_ ]+$/.test(req.body.username) &&
    /[a-zA-Z]/.test(req.body.password) &&
    /\d/.test(req.body.password)
  )
    result = await CreateNewAccount(req, res);
  res.send(result);
});

app.post("/login", async (req: any, res: any) => {
  if (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email) &&
    req.body.password.length > 8
  ) {
    const login = await Login(req);
    if (login.status === true) {
      res.set("Content-Type", "application/json");
      res.set("Authorization", login.data.session);
      await res.cookie("auth", login.data.session, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.send(login);
    } else {
      res.send(login);
    }
  } else {
    res.send({ status: true });
  }
});

app.post(
  "/create-product",
  UploadProduct.single("file"),
  async (req: any, res: any) => {
    const data = {
      product: req.body.product,
      description: req.body.description.split(","),
      price: req.body.price,
      rate: req.body.rate,
      img: req.file.filename,
      type: req.body.type,
    };
    const result = await CreateProduct(data);
    res.send(result);
  }
);

app.get("/product", async (req: any, res: any) => {
  await product
    .find(
      {},
      {
        id: 1,
        price: 1,
        description: 1,
        display: 1,
        product: 1,
        rate: 1,
        date: 1,
        img: 1,
        type: 1,
        _id: 0,
      }
    )
    .then((result) => {
      const size = 5;
      let data = [];

      for (let i = 0; i < result.length; i += size)
        data.push(result.slice(i, i + size));
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/search-product", async (req: any, res: any) => {
  const id = req.body.id;
  if (id === "") {
    res.send({ status: false });
    return;
  }
  await product
    .findOne(
      { id: id },
      {
        id: 1,
        price: 1,
        description: 1,
        display: 1,
        product: 1,
        rate: 1,
        date: 1,
        img: 1,
        type: 1,
        _id: 0,
      }
    )
    .then((result) => {
      if (result) {
        res.send({ status: true, data: result });
      } else {
        res.send({ status: false });
      }
    })
    .catch((err) => {
      res.send({ status: false, msg: "error" });
    });
});

app.post("/delete-product", (req: any, res: any) => {
  const id = req.body.id;
  product.findOne({ id: id }).then((ResultImg: any) => {
    fs.unlink(path.join(PathProduct, ResultImg.img), () => {});
  });
  product
    .deleteOne({ id: id })
    .then(async (result) => {
      if (result.acknowledged && result.deletedCount === 1) {
        res.send({ status: true });
      } else {
        res.send({ status: false });
      }
    })
    .catch(() => {
      res.send({ status: false });
    });
});

app.post(
  "/update-product",
  UploadProduct.single("file"),
  async (req: any, res: any) => {
    const id = req.body.id;
    let data: any = {
      product: req.body.product,
      description: req.body.description.split(","),
      price: req.body.price,
      rate: req.body.rate,
      type: req.body.type,
    };
    if (req.file) {
      data.img = req.file.filename;
      product.findOne({ id: id }).then((result: any) => {
        fs.unlink(path.join(PathProduct, result.img), () => {});
      });
    }

    product
      .updateOne({ id: id }, data)
      .then((result) => {
        if (result.matchedCount === 1 && result.acknowledged) {
          res.send({ status: true });
        } else {
          res.send({ status: false });
        }
      })
      .catch((err) => {
        res.send({ status: false });
      });
  }
);

app.post("/update-account", async (req: any, res: any) => {
  const data = {
    email: req.body.data.email,
    password: req.body.data.password,
    username: req.body.data.username,
    type: req.body.data.type,
  };

  User.updateOne({ email: req.body.primary }, data)
    .then(async (result) => {
      if (result.matchedCount === 1 && result.acknowledged) {
        if (req.body.primary !== req.body.data.email) {
          await session.updateMany(
            { email: req.body.primary },
            { email: req.body.data.email }
          );

          await token.updateOne(
            { email: req.body.primary },
            { email: req.body.data.email }
          );
        }
        res.send({ status: true });
      } else {
        res.send({ status: false });
      }
    })
    .catch(() => {
      res.send({ status: false });
    });
});

app.post("/delete-account", (req: any, res: any) => {
  const _Email = req.body.email;
  User.deleteOne({ email: _Email })
    .then(async (result) => {
      if (result.acknowledged && result.deletedCount === 1) {
        await session.deleteMany({ email: _Email });
        await token.deleteOne({ email: _Email });
        res.send({ status: true });
      } else {
        res.send({ status: false });
      }
    })
    .catch(() => {
      res.send({ status: false });
    });
});

app.post("/logout", (req: any, res: any) => {
  const cookie = req.cookies;

  session
    .updateOne({ session: cookie.auth }, { status: false })
    .then((result) => {
      if (result.matchedCount === 1 && result.acknowledged) {
        const cookies = req.cookies;

        for (const cookieName in cookies) {
          res.clearCookie(cookieName);
        }
        res.send({ status: true });
      }
    });
});

app.get("/dashboard", async (req: any, res: any) => {
  const _Product: any = await product.find({}).then((result) => {
    return result;
  });
  const _Users: any = await User.find({}).then((result) => {
    return result;
  });
  res.send({
    product: _Product.length,
    user: _Users.length,
  });
});

app.get("/home", async (req: any, res: any) => {
  const _Product: any = await product
    .find(
      {},
      {
        _id: 0,
        id: 1,
        type: 1,
        product: 1,
        description: 1,
        price: 1,
        rate: 1,
        img: 1,
      }
    )
    .then((result) => {
      return result;
    });
  const _Types: any = await product
    .find({}, { _id: 0, type: 1 })
    .then((result) => {
      return result.map((item) => item.type);
    });

  const data = {
    product: _Product,
    types: _Types,
    social: {
      facebook: {
        username: "Abdulrahman",
        url: "https://facebook.com",
      },
      instagram: {
        username: "Abdulrahman",
        url: "https://instagram.com",
      },
      whatsapp: {
        username: "+972 59-559-3325",
        url: "https://whatsapp.com",
      },
    },
  };

  res.send(data);
});

app.get("/furniture", async (req: any, res: any) => {
  const _Product = await product.find({}, { _id: 0, __v: 0 }).then((result) => {
    return result;
  });

  const sortedData = _Product.sort((a, b) => a.type.localeCompare(b.type));

  let type: any = [];
  let data: any = req.query.type ? [] : _Product;

  sortedData.filter((item) => {
    if (!type.includes(item.type)) {
      type.push(item.type);
      return true;
    }
    return false;
  });

  if (req.query.type) {
    sortedData.filter((item) => {
      if (item.type.includes(req.query.type)) {
        data.push(item);
        return true;
      }
      return false;
    });
  }
  res.send({
    data: data,
    type: type,
    social: {
      facebook: {
        username: "Abdulrahman",
        url: "https://facebook.com",
      },
      instagram: {
        username: "Abdulrahman",
        url: "https://instagram.com",
      },
      whatsapp: {
        username: "+972 59-559-3325",
        url: "https://whatsapp.com",
      },
    },
  });
});

app.listen(port, () => {
  console.log(`URL: http://localhost:${port}`);
});
