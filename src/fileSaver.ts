import  Parser  from 'srt-parser-2';
import { parserType } from './fileParser';
import fs from 'fs'
import path from "path"
export const fileSaver = (output: string, data: parserType[]) => {

    try{
        const parser = new Parser()
        let fileName = output
        const splittedOutput = output.split(".")
        if(splittedOutput[splittedOutput.length-1] != "srt"){
            fileName += ".srt"
        }
        console.log(path.resolve(fileName));
        fs.writeFileSync(path.resolve(fileName), parser.toSrt(data))      
    }
    catch(e){
        return console.error("error in fileSaver", e);
        
    }

}