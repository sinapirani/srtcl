import { fileParser } from './fileParser';
import {program} from "commander"



async function Main(){

    program
    .name("SrtCl")
    .description("An CMD tool for edit srt files")
    .argument("<string>", "path of input file")
    .option("-s", "second to add or remove")
    .option("-o", "path of output file")
    .action((input, options) => {
        const {i, o, s} = options        
        const parsedSrt = fileParser(input)
        if(Array.isArray(parsedSrt) && parsedSrt.length == 0)
            return console.error("your file is empty");
        
    })

    program.parse();
    
}

Main()
