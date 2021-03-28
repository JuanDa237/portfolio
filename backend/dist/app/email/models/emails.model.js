"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schemas
const emailSchema = new mongoose_1.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String
    },
    message: {
        type: String
    },
    origin: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
});
exports.default = mongoose_1.model('email', emailSchema);
