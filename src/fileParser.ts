import fs from 'fs'
import path from 'path'
import Parser from 'srt-parser-2'


type parserType = {
    id: string;
    startTime: string;
    startSeconds: number;
    endTime: string;
    endSeconds: number;
    text: string;
}
export const fileParser = (input: string) => {
    
    const parser = new Parser()
    let parsedSrt: undefined | parserType[]
    try{
        const srtFile = fs.readFileSync(path.resolve(input));
        parsedSrt = parser.fromSrt(srtFile.toString())
    }
    catch(e){
        console.log("error in fileParser")
        console.error(e)
    }

    return parsedSrt

}