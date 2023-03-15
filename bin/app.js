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
            .option("-s", "second to add or remove")
            .option("-o", "path of output file")
            .action((input, options) => {
            const { o, s } = options;
            if (!s)
                return console.error("please specific an second");
            const parsedSrt = (0, fileParser_1.fileParser)(input);
            const second = commander_1.program.args[1];
            const output = commander_1.program.args[2];
            console.log('output', output);
            if (!Array.isArray(parsedSrt) || parsedSrt.length == 0)
                return console.error("your file is empty");
            const modified = parsedSrt.map(chunk => {
                return Object.assign(Object.assign({}, chunk), { startTime: (0, timeParser_1.timeParser)(chunk.startTime, +second), startSeconds: +chunk.startSeconds + second, endTime: (0, timeParser_1.timeParser)(chunk.endTime, +second), endSeconds: +chunk.endSeconds + second });
            });
            (0, fileSaver_1.fileSaver)(output, modified);
        });
        commander_1.program.parse();
    });
}
Main();
