import { PatternResult, Patterns } from "./Pattern";

const args = process.argv;
const pattern = args[3];

if (args[2] !== "-E") {
  console.log("Expected first argument to be '-E'");
  process.exit(1);
}

function matchPatternFull(fullInput: string, pattern: string): boolean {
  const lines = fullInput.split("\n");
  return lines.filter(it => it !== "")
    .every(line => matchPatternLine(line, pattern));
}

export function matchPatternLine(line: string, pattern: string): PatternResult | null {
  let remainingInput = line.trim();
  let remainingPattern = pattern.trim();
  let result: PatternResult | null = null;
  
  while (remainingPattern.length > 0) {
    const results = Patterns
      .map(it => it.resolve(remainingPattern, remainingInput, line))
      .filter(it => it.matchInput != null); // Replaced _.isNil with native check

    result = results.find(it => it.matchInput !== null) ?? null;
    if (result == null) return null; // Replaced _.isNil with native check
    
    remainingInput = result.remainingInput;
    remainingPattern = result.remainingPattern;
  }

  return result;
}

async function main() {
  const inputLine: string = await Bun.stdin.text();
  if (!matchPatternFull(inputLine, pattern)) {
    console.log("You have failed me!", inputLine, pattern);
    process.exit(1);
  }
  process.exit(0);
}

main().then(r => console.log(r));
