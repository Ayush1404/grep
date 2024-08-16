import { isDigit, PatternResult } from "../Pattern";
import { Pattern } from "./Pattern";

export class Digit extends Pattern {
    constructor() {
        super("Digit", "\\d");
    }

    override _resolveOnce(pattern: string, input: string): PatternResult {
        let [matchInput, remainingInput, remainingPattern, matchedPattern]:
            [string | null, string, string, string | null] = [null, input, pattern, null];
        
        resolve: {
            if (!pattern.startsWith(this.pattern)) break resolve; // Replaced _.startsWith with native startsWith
            const firstChar = input.charAt(0);
            if (!isDigit(firstChar)) break resolve;
            matchInput = firstChar;
            remainingInput = input.slice(1);
            remainingPattern = pattern.slice(this.pattern.length);
            matchedPattern = this.pattern;
        }

        return { matchInput, remainingInput, remainingPattern, patternName: this.name, matchedPattern };
    }
}
