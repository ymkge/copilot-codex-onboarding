import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { add, subtract, multiply, divide, calculateTax } from "../src/calculator.ts";

describe("Calculator Basic Operations", () => {
  it("should add two numbers correctly", () => {
    assert.strictEqual(add(2, 3), 5);
    assert.strictEqual(add(-1, 1), 0);
  });

  it("should subtract two numbers correctly", () => {
    assert.strictEqual(subtract(10, 4), 6);
    assert.strictEqual(subtract(5, 8), -3);
  });

  it("should multiply two numbers correctly", () => {
    assert.strictEqual(multiply(3, 4), 12);
    assert.strictEqual(multiply(5, 0), 0);
  });

  it("should divide two numbers correctly", () => {
    assert.strictEqual(divide(10, 2), 5);
    assert.strictEqual(divide(9, 3), 3);
  });

  it("should throw an error when dividing by zero (Exercise Target)", () => {
    // This test will FAIL initially because src/calculator.ts returns Infinity instead of throwing.
    assert.throws(
      () => divide(10, 0),
      {
        name: "Error",
        message: "Division by zero is not allowed",
      }
    );
  });
});

describe("Calculator Tax Calculation", () => {
  it("should calculate exact tax for divisible amounts", () => {
    const result = calculateTax(100, 0.1);
    assert.strictEqual(result.tax, 10);
    assert.strictEqual(result.total, 110);
  });

  it("should round down (truncate) tax to integer when fraction occurs (Exercise Target)", () => {
    // 105 * 0.1 = 10.5 -> expected truncated tax: 10, total: 115
    // This test will FAIL initially because src/calculator.ts returns 10.5 without rounding.
    const result = calculateTax(105, 0.1);
    assert.strictEqual(result.tax, 10);
    assert.strictEqual(result.total, 115);
  });

  it("should throw error for negative inputs", () => {
    assert.throws(
      () => calculateTax(-100, 0.1),
      {
        name: "Error",
        message: "Amount and tax rate must be non-negative",
      }
    );

    assert.throws(
      () => calculateTax(100, -0.05),
      {
        name: "Error",
        message: "Amount and tax rate must be non-negative",
      }
    );
  });
});
