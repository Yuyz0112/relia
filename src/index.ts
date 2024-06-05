import { ok, deepEqual } from "node:assert";
import { createClient } from "./client";
import { TestPlan, TestMessage } from "./types";
import { createJSONReporter, test } from "./runner";

export * from "./types";

export async function runTests(testPlan: TestPlan) {
  const { providers, suites, tools, round } = testPlan;

  const results: TestMessage[] = [];

  const reporterMode = testPlan.reporter?.mode ?? "diff";
  const reporter =
    reporterMode === "json"
      ? createJSONReporter({
          log(raw) {
            results.push(JSON.parse(raw));
          },
        })
      : createJSONReporter();

  for (const provider of providers) {
    const client = createClient(provider);

    for (const [index, suite] of suites.entries()) {
      for (let currentRound = 1; currentRound <= round; currentRound++) {
        await test(
          `provider ${provider.name}, model ${provider.model}, suite ${index}, round ${round}`,
          async () => {
            const chatCompletion = await client.chat.completions.create({
              model: provider.model,
              temperature: provider.temperature,
              messages: suite.messages,
              tools,
            });

            const { tool_calls } = chatCompletion.choices[0].message;
            ok(tool_calls?.length, `have tool calls`);
            deepEqual(
              {
                name: tool_calls![0].function.name,
                arguments: JSON.parse(tool_calls![0].function.arguments),
              },
              suite.result
            );
          },
          {
            reporter,
          }
        );
      }
    }
  }

  if (reporterMode === "json") {
    return results;
  }
}
