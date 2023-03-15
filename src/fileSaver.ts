import  Parser  from 'srt-parser-2';
import { parserType } from './fileParser';
import fs from 'fs'
import path from "path"
export const fileSaver = (output: string, data: parserType[]) => {

    let filePath: string | undefined;
    try{
        const parser = new Parser()
        let fileName = output
        const splittedOutput = output.split(".")
        if(splittedOutput[splittedOutput.length-1] != "srt"){
            fileName += ".srt"
        }
        fs.writeFileSync(path.resolve(fileName), parser.toSrt(data))      
        filePath = path.resolve(fileName)
    }
    catch(e){
        return console.error("error in fileSaver", e);
        
    }

    return filePath

}