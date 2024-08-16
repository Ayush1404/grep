
import { AlphaNumeric } from "./patterns/AlphaNumeric";
import { Alternation } from "./patterns/Alternation";
import { Digit } from "./patterns/Digits";
import { EndLineAnchor } from "./patterns/EndLineAnchor";
import { SingleCharacter } from "./patterns/SingleCharacter";
import { SquareBrackets } from "./patterns/SquareBrackets";
import { StartLineAnchor } from "./patterns/StartLineAnchor";
import { Void } from "./patterns/Void";

export interface PatternResult {
    matchInput: string | null;
    remainingInput: string;
    remainingPattern: string;
    patternName: string;
    matchedPattern: string | null;
}

export function isDigit(c: string): boolean {
    return !isNaN(Number.parseInt(c, 10)); // Replaced _.isNaN with native isNaN
}

export const Patterns = [
    new Alternation(),
    new Digit(),
    new AlphaNumeric(),
    new SquareBrackets(),
    new StartLineAnchor(),
    new EndLineAnchor(),
    new SingleCharacter(),
    new Void(),
];
