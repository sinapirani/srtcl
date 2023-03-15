import { fileSaver } from './fileSaver';
import { fileParser, parserType } from './fileParser';
import {program} from "commander"
import { timeParser } from './timeParser';



async function Main(){

    program
    .name("SrtCl")
    .description("An CMD tool for edit srt files")
    .argument("<string>", "path of input file")
    .option("-remove", "second to remove")
    .option("-add", "second to add")
    .option("-o", "path of output file")
    //@ts-ignore
    .action((input, options) => {

        if(options.Add && options.Remove ){
            return console.error(
            `
            Error!
            Please only use add or remove..
            `);
        }

        if(options.Add && options.Remove){
            return console.error(`
            Error!
            Please at least use add or remove..
            `);
            
        }
        
        const second = options.Add ? parseInt(program.args[1]) : -parseInt(program.args[1])
        if(isNaN(second)){
            return `
            Error!
            Please Insert correct number
            `
        }
        const {o} = options        
        const parsedSrt = fileParser(input)
        const output = program.args[2]
        
        if(!Array.isArray(parsedSrt) || parsedSrt.length == 0 )
            return console.error("your file is empty");
        
        const modified: any = parsedSrt.map(chunk => {
            return {
                ...chunk,
                startTime: timeParser(chunk.startTime, (second)),
                startSeconds: chunk.startSeconds + (second),
                endTime: timeParser(chunk.endTime, (second)),
                endSeconds: +chunk.endSeconds + (second)
            }
        })
        const filePath = fileSaver(output, modified)
        return console.log(
            `
            Great!
            Your file is here: ${filePath}
            `
        );
        

    })

    program.parse();
    
}

Main()
