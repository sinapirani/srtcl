#!/usr/bin/env node
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
const fileSaver_1 = require("./fileSaver");
const fileParser_1 = require("./fileParser");
const commander_1 = require("commander");
const timeParser_1 = require("./timeParser");
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        commander_1.program
            .name("SrtCl")
            .description("An CMD tool for edit srt files")
            .argument("<string>", "path of input file")
            .option("-remove", "second to remove")
            .option("-add", "second to add")
            .option("-o", "path of output file")
            //@ts-ignore
            .action((input, options) => {
            if (options.Add && options.Remove) {
                return console.error(`
            Error!
            Please only use add or remove..
            `);
            }
            if (options.Add && options.Remove) {
                return console.error(`
            Error!
            Please at least use add or remove..
            `);
            }
            const second = options.Add ? parseInt(commander_1.program.args[1]) : -parseInt(commander_1.program.args[1]);
            if (isNaN(second)) {
                return `
            Error!
            Please Insert correct number
            `;
            }
            const { o } = options;
            const parsedSrt = (0, fileParser_1.fileParser)(input);
            const output = commander_1.program.args[2];
            if (!Array.isArray(parsedSrt) || parsedSrt.length == 0)
                return console.error("your file is empty");
            const modified = parsedSrt.map(chunk => {
                return Object.assign(Object.assign({}, chunk), { startTime: (0, timeParser_1.timeParser)(chunk.startTime, (second)), startSeconds: chunk.startSeconds + (second), endTime: (0, timeParser_1.timeParser)(chunk.endTime, (second)), endSeconds: +chunk.endSeconds + (second) });
            });
            const filePath = (0, fileSaver_1.fileSaver)(output, modified);
            return console.log(`
            Great!
            Your file is here: ${filePath}
            `);
        });
        commander_1.program.parse();
    });
}
Main();
