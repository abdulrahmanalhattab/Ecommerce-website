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
exports.NewToken = void 0;
const token_1 = __importDefault(require("../db/token"));
function GeneratorToken() {
    return __awaiter(this, void 0, void 0, function* () {
        var charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
        while (true) {
            var token = "Y24";
            for (var i = 0; i <= 15; i++) {
                var randomIndex = Math.floor(Math.random() * charSet.length);
                token += charSet.charAt(randomIndex);
            }
            const newToken = yield token_1.default.findOne({ token: token });
            if (newToken === null)
                return token;
        }
    });
}
function NewToken(Email) {
    return __awaiter(this, void 0, void 0, function* () {
        const _Email = Email;
        const _Token = yield GeneratorToken();
        if ((yield token_1.default.findOne({ email: _Email })) === null) {
            const CreateToken = yield new token_1.default({
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
        }
        else {
            return { status: false, msg: "Already register" };
        }
    });
}
exports.NewToken = NewToken;
