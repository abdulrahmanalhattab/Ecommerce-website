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
exports.NewSession = void 0;
const session_1 = __importDefault(require("../db/session"));
function GeneratorSession(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        var charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
        while (true) {
            var session = token + ".";
            for (var i = 0; i <= 30; i++) {
                var randomIndex = Math.floor(Math.random() * charSet.length);
                session += charSet.charAt(randomIndex);
            }
            if ((yield session_1.default.findOne({ session: session, email: email })) === null)
                return session;
        }
    });
}
function NewSession(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (token === null)
            return { status: false, msg: "The data is incorrect. " };
        const session = yield GeneratorSession(email, token);
        const newSession = yield new session_1.default({
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
    });
}
exports.NewSession = NewSession;
