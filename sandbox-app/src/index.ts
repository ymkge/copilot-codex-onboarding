import { add, multiply, calculateTax, divide } from "./calculator.ts";

function main() {
  console.log("=== Sandbox Application (Copilot & Codex Onboarding) ===");
  console.log(`Add (10 + 5): ${add(10, 5)}`);
  console.log(`Multiply (4 * 3): ${multiply(4, 3)}`);

  const taxResult = calculateTax(105, 0.1);
  console.log(`Tax for 105 at 10%:`, taxResult);

  try {
    const divResult = divide(10, 2);
    console.log(`Divide (10 / 2): ${divResult}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    }
  }
}

main();
