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
exports.CreateNewAccount = void 0;
const User_1 = __importDefault(require("./db/User"));
const new_token_1 = require("./token/new-token");
function CreateNewAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _Email = req.body.email;
        const _Password = req.body.password;
        const _Username = req.body.username;
        if ((yield User_1.default.findOne({ email: _Email })) === null) {
            const NewAccount = new User_1.default({
                email: _Email,
                password: _Password,
                username: _Username,
            })
                .save()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                return yield User_1.default.findOne({ email: _Email });
            }))
                .catch(() => {
                return { msg: "Failed in send data to database. " };
            });
            const Token = yield (0, new_token_1.NewToken)(_Email);
            if (Token.status === false) {
                return Token;
            }
            return NewAccount;
        }
        else {
            return { status: false, msg: "Already register" };
        }
    });
}
exports.CreateNewAccount = CreateNewAccount;
