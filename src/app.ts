import {program} from "commander"


async function Main(){

    program
    .name("SrtCl")
    .description("An CMD tool for edit srt files")
    .option("-i", "path of input file")
    .option("-o", "path of output file")

    program.parse();

    
}

Main()
