import {PatternResult} from "../Pattern";
import {Pattern} from "./Pattern";
export class SingleCharacter extends Pattern {
    constructor() {
        super("SingleCharacter", "$");
    }
    override _resolveOnce(pattern: string, input: string, originalLine: string): PatternResult {
        let [matchInput, remainingInput, remainingPattern, patternName, matchedPattern]:
            [string|null, string,string, string, string|null] =
            [null, input, pattern.slice(1), this.name, null];
        // console.log("single", {pattern, input});
        resolve:{
            if (pattern.length < 1) break resolve;
            const patternFirstChar = pattern.charAt(0);
            if (input.charAt(0) !== patternFirstChar && patternFirstChar !== ".") break resolve;
            matchInput = patternFirstChar;
            remainingInput = input.slice(1);
            matchedPattern = patternFirstChar;
        }
        return {matchInput, remainingInput, remainingPattern, patternName, matchedPattern};
    }
}