"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileParser = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const srt_parser_2_1 = __importDefault(require("srt-parser-2"));
const fileParser = (input) => {
    const parser = new srt_parser_2_1.default();
    let parsedSrt;
    try {
        const srtFile = fs_1.default.readFileSync(path_1.default.resolve(input));
        parsedSrt = parser.fromSrt(srtFile.toString());
    }
    catch (e) {
        console.log("error in fileParser");
        console.error(e);
    }
    return parsedSrt;
};
exports.fileParser = fileParser;
