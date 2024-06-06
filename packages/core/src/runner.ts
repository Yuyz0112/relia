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
  const { timeout = DEFAULT_TIMEOUT, reporter = () => {}, meta } = opts || {};

  let timeoutId;
  const start = Date.now();
  let error: unknown;

  try {
    reporter({
      type: "TEST_START",
      data: { description },
      meta,
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
  } catch (caughtError) {
    error = caughtError;
  } finally {
    reporter({
      type: "TEST_END",
      data: {
        description,
        executionTime: Date.now() - start,
        pass: !error,
        error,
      },
      meta,
    });
  }
};
