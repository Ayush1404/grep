import {PatternResult} from "../Pattern";
import {Pattern} from "./Pattern";
export class StartLineAnchor extends Pattern {
    constructor() {
        super("StartLineAnchor", "^");
    }
    override _resolveOnce(pattern: string, input: string, originalLine: string): PatternResult {
        let [matchInput, remainingInput, remainingPattern, patternName, matchedPattern]:
            [string | null,string, string, string,string|null] =
            [null, input, pattern, this.name, null];
        resolve: {
            if (!pattern.startsWith(this.pattern)) break resolve;
            const subPattern = pattern.split(" ")[0].slice(this.pattern.length);
            // console.log({subPattern, originalLine});
            if (!originalLine.startsWith(subPattern)) break resolve;
            matchInput = subPattern;
            remainingInput = input.slice(matchInput.length + this.pattern.length);
            remainingPattern = pattern.slice(this.pattern.length + matchInput.length);
            matchedPattern =this.pattern + subPattern;
        }
        return {matchInput, remainingInput, remainingPattern, patternName, matchedPattern};
    }
}