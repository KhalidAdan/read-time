import { describe, expect, test } from "vitest";
import { calculateReadingTime } from ".";

describe("calculateReadingTime", () => {
  test("calculates reading time for short text with normal speed", () => {
    const result = calculateReadingTime({
      text: "This is a short test sentence.",
    });
    expect(result.readTime).toBe(1);
    expect(result.readTimeInfo).toBe("Less than a minute.");
    expect(result.readTimeLabel).toBe("1 min read");
  });

  test("calculates reading time for longer text with normal speed", () => {
    const longText = "This is a longer text. ".repeat(20); // 100 words
    const result = calculateReadingTime({ text: longText });
    expect(result.readTime).toBe(1);
    expect(result.readTimeInfo).toBe("Around 1 minute.");
    expect(result.readTimeLabel).toBe("1 min read");
  });

  test("calculates reading time for fast speed", () => {
    const longText = "This is a longer text. ".repeat(50); // 250 words
    const result = calculateReadingTime({
      text: longText,
      speed: "fast",
    });
    expect(result.readTime).toBe(2);
    expect(result.readTimeInfo).toBe("Around 2 minutes.");
    expect(result.readTimeLabel).toBe("2 min read");
  });

  test("calculates reading time for slow speed", () => {
    const result = calculateReadingTime({
      text: "Short text for slow reading.",
      speed: "slow",
    });
    expect(result.readTime).toBe(1);
    expect(result.readTimeInfo).toBe("Less than a minute.");
    expect(result.readTimeLabel).toBe("1 min read");
  });

  test("uses custom wpm when provided", () => {
    const longText = "This is a longer text. ".repeat(30); // 150 words
    const result = calculateReadingTime({
      text: longText,
      wpm: 60,
    });
    expect(result.readTime).toBe(3);
    expect(result.readTimeInfo).toBe("Around 3 minutes.");
    expect(result.readTimeLabel).toBe("3 min read");
  });

  test("handles very long text", () => {
    const veryLongText = "Lorem ipsum ".repeat(1000); // 2000 words
    const result = calculateReadingTime({ text: veryLongText });
    expect(result.readTime).toBe(12);
    expect(result.readTimeInfo).toBe("Around 12 minutes.");
    expect(result.readTimeLabel).toBe("12 min read");
  });

  test("handles empty text", () => {
    const result = calculateReadingTime({ text: "" });
    expect(result.readTime).toBe(1);
    expect(result.readTimeInfo).toBe("Less than a minute.");
    expect(result.readTimeLabel).toBe("1 min read");
  });

  test("prioritizes speed over wpm when both are provided", () => {
    const longText = "This is a longer text. ".repeat(20); // 100 words
    const result = calculateReadingTime({
      text: longText,
      speed: "slow",
      wpm: 240,
    });
    expect(result.readTime).toBe(1);
    expect(result.readTimeInfo).toBe("Around 1 minute.");
    expect(result.readTimeLabel).toBe("1 min read");
  });
});
