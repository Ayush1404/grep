import {PatternResult} from "../Pattern";
import {Pattern} from "./Pattern";
export class SquareBrackets extends Pattern {
    constructor() {
        super("SquareBrackets", "");
    }
    override _resolveOnce(pattern: string, input: string): PatternResult {
        let [matchInput, remainingInput, remainingPattern, patternName, matchedPattern]:
            [string|null, string, string, string,string|null] =
            [null, input, pattern, this.name,null];
        resolve: {
            const start = pattern.indexOf("[");
            const end = pattern.indexOf("]");
            if (start !== 0) break resolve;
            if (end === -1) break resolve;
            const subPattern = pattern.substring(start + 1, end);
            remainingInput = input.slice(end + 1);
            remainingPattern = pattern.slice(end + 1);
            const isNegation = subPattern.startsWith("^");
            const subPatternChars = subPattern.split("");
            if (!isNegation) {
                matchInput = subPatternChars.find(c => input.includes(c)) ?? null;
                break resolve;
            }
            matchInput = input.split("").find(c => !subPatternChars.includes(c)) ?? null;
            matchedPattern = "[" + subPattern + "]";
        }
        return {matchInput, remainingInput, remainingPattern, patternName, matchedPattern};
    }
}