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
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConnection = void 0;
const mongoose_1 = require("mongoose");
function startConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        var url;
        if (process.env.PROD == 'true') {
            url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_U_PASS}@contact-me.dcrjc.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
        }
        else {
            url = `mongodb://${process.env.DB_HOST}/${process.env.DB}`;
        }
        try {
            yield mongoose_1.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
            console.log('DB is connected.');
        }
        catch (error) {
            console.log("DB isn't connected.");
        }
    });
}
exports.startConnection = startConnection;
