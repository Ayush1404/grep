import { PatternResult } from "../Pattern";
import { Pattern } from "./Pattern";
import { matchPatternLine } from "../main";

export class Alternation extends Pattern {
    constructor() {
        super("Alternation", "|");
    }

    override _resolveOnce(pattern: string, input: string): PatternResult {
        let [matchInput, remainingInput, remainingPattern, patternName, matchedPattern]:
            [string | null, string, string, string, string | null] =
            [null, input, pattern, this.name, null];
        
        resolve: {
            if (!pattern.includes(this.pattern)) break resolve;
            let leftPattern = pattern.split(this.pattern)[0];
            let rightPattern = pattern.split(this.pattern)[1];
            
            const openParen = leftPattern.indexOf("(");
            const closeParen = rightPattern.indexOf(")");
            if (openParen !== -1 && closeParen === -1) break resolve;
            if (openParen === -1 && closeParen !== -1) break resolve;
            if (openParen !== -1 && closeParen !== -1) {
                leftPattern = leftPattern.substring(openParen + 1, leftPattern.length);
                rightPattern = rightPattern.substring(0, closeParen);
            }
            
            const leftResolve = matchPatternLine(input, leftPattern);
            const rightResolve = matchPatternLine(input, rightPattern);
            const okResolve = leftResolve?.matchInput != null ? leftResolve : rightResolve;
            if (okResolve?.matchInput == null) break resolve;
            return okResolve;
        }

        return { matchInput, remainingInput, remainingPattern, patternName, matchedPattern };
    }
}
