/**
 * @typedef {Object} ReadingTimeResult
 * @property {number} readTime - The estimated reading time in minutes
 * @property {string} readTimeInfo - Detailed information about the reading time
 * @property {string} readTimeLabel - A label for the reading time
 */

/**
 * @typedef {"fast" | "normal" | "slow"} ReadingSpeed
 */

/**
 * @typedef {Object} CalculateReadingTimeProps
 * @property {string} text - The text to calculate reading time for
 * @property {ReadingSpeed} [speed] - The reading speed (optional)
 * @property {number} [wpm] - Words per minute (optional)
 */

/**
 * Calculates the reading time for a given text
 * @param {CalculateReadingTimeProps} props - The properties for calculation
 * @returns {ReadingTimeResult} The calculated reading time result
 */
export let calculateReadingTime = ({ text, speed, wpm: externalWpm }) => {
  let readingSpeeds = { fast: 240, normal: 180, slow: 100 };
  let wpm =
    speed && readingSpeeds[speed]
      ? readingSpeeds[speed]
      : externalWpm || readingSpeeds.normal;

  let words = text.trim().split(/\s+/).length;
  let estimatedReadTime = Math.ceil(words / wpm);

  let shortTextThresholds = { fast: 90, normal: 70, slow: 50 };
  let readerSpeedThreshold =
    speed && shortTextThresholds[speed]
      ? shortTextThresholds[speed]
      : shortTextThresholds.normal;

  let isShortText = text.length < readerSpeedThreshold;
  let readTimeLabel = `${estimatedReadTime} min read`;
  let readTimeInfo = isShortText
    ? "Less than a minute."
    : `Around ${estimatedReadTime} minute${
        estimatedReadTime === 1 ? "" : "s"
      }.`;

  return { readTime: estimatedReadTime, readTimeInfo, readTimeLabel };
};
