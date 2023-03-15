import { fileSaver } from './fileSaver';
import { fileParser, parserType } from './fileParser';
import {program} from "commander"
import { timeParser } from './timeParser';



async function Main(){

    program
    .name("SrtCl")
    .description("An CMD tool for edit srt files")
    .argument("<string>", "path of input file")
    .option("-s", "second to add or remove")
    .option("-o", "path of output file")
    .action((input, options) => {
        const {o, s} = options        
        if(!s)
            return console.error("please specific an second");
        const parsedSrt = fileParser(input)
        const second = program.args[1]
        const output = program.args[2]
        console.log('output', output);
        
        
        if(!Array.isArray(parsedSrt) || parsedSrt.length == 0 )
            return console.error("your file is empty");
        
        const modified: any = parsedSrt.map(chunk => {
            return {
                ...chunk,
                startTime: timeParser(chunk.startTime, +second),
                startSeconds: +chunk.startSeconds + second,
                endTime: timeParser(chunk.endTime, +second),
                endSeconds: +chunk.endSeconds + second
            }
        })

        fileSaver(output, modified)

    })

    program.parse();
    
}

Main()
