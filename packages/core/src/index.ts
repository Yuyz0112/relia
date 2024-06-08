import { ok, deepEqual } from "node:assert";
import pMap from "p-map";
import { createClient } from "./client";
import { TestPlan, TestMessage } from "./types";
import { createJSONReporter, test } from "./runner";

export * from "./types";

export async function runTests(testPlan: TestPlan) {
  const {
    providers,
    suites,
    tools,
    round = 1,
    concurrency = suites.length,
  } = testPlan;

  const results: TestMessage[] = [];

  const reporter = createJSONReporter({
    log(raw) {
      results.push(JSON.parse(raw));
    },
  });

  const tasks: Promise<void>[] = [];
  for (const [providerIndex, provider] of providers.entries()) {
    const client = createClient(provider);

    for (const [index, suite] of suites.entries()) {
      for (let currentRound = 1; currentRound <= round; currentRound++) {
        tasks.push(
          test(
            `provider ${provider.name}, model ${provider.model}, suite ${index}, round ${round}`,
            async () => {
              const chatCompletion = await client.chat.completions.create({
                model: provider.model,
                temperature: suite.temperature ?? provider.temperature,
                messages: suite.messages,
                tools,
              });

              const { tool_calls } = chatCompletion.choices[0].message;
              ok(tool_calls?.length, `have tool calls`);
              deepEqual(
                tool_calls.map((c) => ({
                  name: c.function.name,
                  arguments: JSON.parse(c.function.arguments),
                })),
                suite.result
              );
            },
            {
              reporter,
              meta: {
                key: providerIndex,
                provider: {
                  name: provider.name,
                  model: provider.model,
                },
                suite: index,
                round: currentRound,
              },
            }
          )
        );
      }
    }
  }

  await pMap(tasks, (t) => t, { concurrency });

  return results;
}
