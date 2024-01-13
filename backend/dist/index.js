"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_account_1 = require("./utils/create-account");
const session_1 = __importDefault(require("./utils/db/session"));
const login_1 = require("./utils/login");
const cors = require("cors");
const express_1 = __importDefault(require("express"));
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["POST", "GET"],
}));
const urlDB = "mongodb://localhost:27017/shop";
mongoose.connect(urlDB);
const checkuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.auth) {
        session_1.default
            .findOne({ session: req.cookies.auth })
            .then((result) => {
            console.log(result);
            next();
        })
            .catch(() => {
            res.send({ status: false });
        });
    }
    else {
        res.send({ status: false });
    }
});
app.post("/user", checkuser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ msg: "test123" });
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("login");
    let result = {
        msg: "Email or password invalid. ",
    };
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email) &&
        req.body.password.length > 8) {
        result = yield (0, login_1.Login)(req);
        res.set("Content-Type", "application/json");
        res.set("auth", result.data.session);
        yield res.cookie("auth", result.data.session, {
            httpOnly: true,
            secure: true,
            maxAge: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
    }
    res.send(result);
}));
app.post("/new_account", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email) &&
        /^[a-zA-Z0-9_ ]+$/.test(req.body.username) &&
        /[a-zA-Z]/.test(req.body.password) &&
        /\d/.test(req.body.password))
        result = yield (0, create_account_1.CreateNewAccount)(req, res);
    res.send(result ? result : { msg: "a problem happened. " });
}));
app.post("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _Email = req.body.email;
}));
app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
});
