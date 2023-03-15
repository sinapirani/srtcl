"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileSaver = void 0;
const srt_parser_2_1 = __importDefault(require("srt-parser-2"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fileSaver = (output, data) => {
    let filePath;
    try {
        const parser = new srt_parser_2_1.default();
        let fileName = output;
        const splittedOutput = output.split(".");
        if (splittedOutput[splittedOutput.length - 1] != "srt") {
            fileName += ".srt";
        }
        fs_1.default.writeFileSync(path_1.default.resolve(fileName), parser.toSrt(data));
        filePath = path_1.default.resolve(fileName);
    }
    catch (e) {
        return console.error("error in fileSaver", e);
    }
    return filePath;
};
exports.fileSaver = fileSaver;
