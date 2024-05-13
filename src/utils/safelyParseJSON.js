/**
 * It parses JSON safely when malformed
 * @param json String to parse
 * @returns { object }
 */

function safelyParseJSON(json) {
  if (typeof json !== 'string') return {};

  try {
    return JSON.parse(json);
  } catch (err) {
    console.warn(err);
    return {};
  }
}

export default safelyParseJSON;
