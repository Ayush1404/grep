import {PatternResult} from "../Pattern";
import {Pattern} from "./Pattern";
export class Void extends Pattern {
    constructor() {
        super("Void", "");
    }
    override _resolveOnce(pattern: string, input: string, originalLine: string): PatternResult {
        let [matchInput, remainingInput, remainingPattern, patternName, matchedPattern]:
            [string | null,string, string, string,string|null] =
            [null, input, pattern, this.name, null];
        resolve: {
            if (pattern.startsWith("+")) break resolve;
            [matchInput, remainingInput,matchedPattern] = [input.charAt(0), input.slice(1), ""];
            if (input.length === 0) matchInput = null;
        }
        return {matchInput, remainingInput, remainingPattern, patternName, matchedPattern};
    }
}