import {PatternResult} from "../Pattern";
export class Pattern {
    constructor(public readonly name:string, public readonly pattern: string) {}
    _resolveOnce(pattern: string, input: string, originalLine: string): PatternResult {
        return {matchInput: null, remainingInput: input, remainingPattern: pattern, patternName: this.name, matchedPattern: null};
    }
    resolve(pattern: string, input: string, originalLine: string): PatternResult {
        const resolve =  this._resolveOnce(pattern, input, originalLine);
        plus: {
            if (!resolve.remainingPattern.startsWith("+")) break plus;
            // console.log("once",{resolve});
            if (resolve.matchedPattern === resolve.matchInput) {
                resolve.remainingPattern = resolve.remainingPattern.slice(1);
                // console.log("nil",{resolve});
                return resolve;
            }
            // console.log("+",{resolve});
            return this.resolve(
                resolve.matchedPattern + resolve.remainingPattern,
                resolve.remainingInput,
                originalLine
            );
        }
        questionMark: {
            // console.log("questionMark 1", {resolve});
            if (!resolve.remainingPattern.startsWith("?")) break questionMark;
            resolve.remainingPattern = resolve.remainingPattern.slice(1);
            resolve.matchInput = (resolve.matchInput ?? "") + "?";
            resolve.matchedPattern = (resolve.matchedPattern ?? "") + "?";
            // console.log("questionMark", {resolve});
        }
        return resolve;
    }
}