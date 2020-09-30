"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    date: {
        type: Date,
        default: Date.now,
    }
});
var ArticleModel = mongoose_1.default.model("Article", ArticleSchema);
exports.default = ArticleModel;
