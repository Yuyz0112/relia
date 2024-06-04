import { test, hold, report } from "zora";
import {
  createJSONReporter,
  Message as TestMessage,
  createDiffReporter,
} from "zora-reporters";
import { createClient } from "./client";
import { TestPlan } from "./types";

export * from "./types";

export async function runTests(testPlan: TestPlan) {
  const { providers, suites, tools, round } = testPlan;

  hold();

  const results: TestMessage[] = [];

  const reporterMode = testPlan.reporter?.mode ?? "diff";
  const reporter =
    reporterMode === "json"
      ? createJSONReporter({
          log(raw) {
            results.push(JSON.parse(raw));
          },
        })
      : createDiffReporter();

  for (const provider of providers) {
    const client = createClient(provider);

    for (const [index, suite] of suites.entries()) {
      for (let currentRound = 1; currentRound <= round; currentRound++) {
        test(
          `provider ${provider.name}, model ${provider.model}, suite ${index}, round ${round}`,
          async (t) => {
            const chatCompletion = await client.chat.completions.create({
              model: provider.model,
              temperature: provider.temperature,
              messages: suite.messages,
              tools,
            });

            const { tool_calls } = chatCompletion.choices[0].message;
            t.ok(tool_calls?.length, `have tool calls`);
            t.deepEqual(
              {
                name: tool_calls![0].function.name,
                arguments: JSON.parse(tool_calls![0].function.arguments),
              },
              suite.result
            );
          },
          {
            timeout: 120_000,
          }
        );
      }
    }
  }

  await report({ reporter });

  if (reporterMode === "json") {
    return results;
  }
}
