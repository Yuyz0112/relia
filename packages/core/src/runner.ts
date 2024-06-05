import { TestMessage, TestOpts } from "./types";

export const createJSONReporter = ({
  log = console.log,
  serialize = JSON.stringify,
} = {}) => {
  return async (message: TestMessage) => {
    log(serialize(message));
  };
};

const DEFAULT_TIMEOUT = 60_000;

export const test = async (
  description: string,
  fn: () => Promise<void>,
  opts?: TestOpts
): Promise<void> => {
  const { timeout = DEFAULT_TIMEOUT, reporter = () => {} } = opts || {};

  let timeoutId;
  const start = Date.now();
  let pass = true;

  try {
    reporter({
      type: "TEST_START",
      data: { description },
    });

    await Promise.race([
      fn(),
      new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error(`Timeout of ${timeout}ms exceeded`));
        }, timeout);
      }),
    ]);
    clearTimeout(timeoutId);
  } catch (error) {
    pass = false;
    reporter({
      type: "ERROR",
      data: { error },
    });
  } finally {
    reporter({
      type: "TEST_END",
      data: { description, executionTime: Date.now() - start, pass },
    });
  }
};
