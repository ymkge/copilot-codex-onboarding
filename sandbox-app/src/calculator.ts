/**
 * Calculator domain module for onboarding exercises.
 * 
 * NOTE: This module contains deliberate bugs for educational purposes.
 * Hands-on participants will use GitHub Copilot / OpenAI Codex to detect and fix them.
 */

export interface TaxCalculationResult {
  amount: number;
  taxRate: number;
  tax: number;
  total: number;
}

/**
 * Adds two numbers.
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Subtracts b from a.
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Multiplies two numbers.
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Divides a by b.
 * 
 * BUG (Deliberate):
 * Does not check if b is 0. In JavaScript, a / 0 produces Infinity instead
 * of throwing an informative error.
 */
export function divide(a: number, b: number): number {
  // TODO (Exercise): Check if b === 0 and throw new Error("Division by zero is not allowed")
  return a / b;
}

/**
 * Calculates tax and total amount with the specified tax rate.
 * Tax is expected to be rounded down (truncated / Math.floor) for consumer purchase.
 * 
 * BUG (Deliberate):
 * Returns unrounded floating point number instead of integer tax.
 * Example: amount = 105, taxRate = 0.1 -> returns 10.5 instead of 10.
 */
export function calculateTax(amount: number, taxRate: number = 0.1): TaxCalculationResult {
  if (amount < 0 || taxRate < 0) {
    throw new Error("Amount and tax rate must be non-negative");
  }

  // TODO (Exercise): Tax should be Math.floor(amount * taxRate)
  const tax = amount * taxRate;
  const total = amount + tax;

  return {
    amount,
    taxRate,
    tax,
    total,
  };
}
