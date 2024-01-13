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
exports.Login = void 0;
const User_1 = __importDefault(require("./db/User"));
const token_1 = __importDefault(require("./db/token"));
const new_session_1 = require("./token/new-session");
function Login(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const _Email = req.body.email;
        const _Password = req.body.password;
        if ((yield User_1.default.findOne({ email: _Email, password: _Password })) === null)
            return { status: false, msg: "Email or password invalid. " };
        const _Token = yield token_1.default.findOne({ email: _Email }, { _id: 0, token: 1 });
        const _NewSession = yield (0, new_session_1.NewSession)(_Email, _Token.token);
        if (_NewSession.status === false)
            return _NewSession;
        return {
            status: true,
            data: {
                session: _NewSession.data.session,
                email: _Email,
            },
        };
    });
}
exports.Login = Login;
