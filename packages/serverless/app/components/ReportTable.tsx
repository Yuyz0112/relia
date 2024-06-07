import type { ITestEndMessage, TestPlan } from '@relia/core';
import ErrorText from './ErrorText';

export type Props = { messages: ITestEndMessage[]; reportId?: string };

export default function ReportTable({ messages, reportId = 'default' }: Props) {
	const group = groupByProvider(messages);

	return (
		<table>
			<thead>
				<tr>
					<th>Model</th>
					<th>Success Rate</th>
					<th>Suite</th>
					<th>Round</th>
					<th>Result</th>
				</tr>
			</thead>
			<tbody>
				{Object.keys(group).flatMap((key) => {
					const { suites, model, name: provider } = group[key];
					const total = suites.reduce((acc, suite) => acc + suite.rounds.length, 0);
					const totalPass = suites.reduce((acc, suite) => acc + suite.passCount, 0);
					const successRate = (totalPass / total) * 100;

					return suites.flatMap((suite, suiteIndex) => {
						const { rounds } = suite;
						const totalRound = rounds.length;
						rounds.sort((a, b) => a.round - b.round);

						return rounds.map((round) => {
							const labelFor = `${reportId}-${key}-${suiteIndex}-${round.round}`;
							const sharedTds = (
								<>
									<td class="align-right">{round.round}</td>
									<td class={`${round.pass ? 'bg-success' : 'bg-error'} error-cell`} width={350}>
										<div>
											{round.pass ? 'Success' : 'Failure'}
											<ErrorText error={round.error} labelFor={labelFor} />
										</div>
									</td>
								</>
							);

							if (round.round > 1) {
								return <tr>{sharedTds}</tr>;
							}

							return (
								<tr>
									{round.round === 1 && suiteIndex === 0 && (
										<>
											<td class="break-all" rowspan={total} width={200}>
												<div>{provider}</div>
												<div>{model}</div>
											</td>
											<td rowspan={total} width="150px">
												<div>{successRate.toFixed(2)}%</div>
												<div className="progress-bar" style={{ width: 130, marginLeft: 5, backgroundColor: 'rgb(248 113 113)' }}>
													<div
														className="progress-bar-filled"
														style={{ width: `${successRate}%`, backgroundColor: 'rgb(74 222 128)' }}
													></div>
												</div>
											</td>
										</>
									)}
									<td rowspan={totalRound} class="align-right">
										{suiteIndex + 1}
									</td>
									{sharedTds}
								</tr>
							);
						});
					});
				})}
			</tbody>
		</table>
	);
}

function groupByProvider(results: ITestEndMessage[]) {
	const providers: Record<
		// provider name
		string,
		{
			name: string;
			model: string;
			suites: {
				passCount: number;
				rounds: {
					round: number;
					pass: boolean;
					executionTime: number;
					error?: unknown;
				}[];
			}[];
		}
	> = {};

	results.forEach((result) => {
		const { provider, suite, round, key } = result.meta as unknown as {
			key: string;
			provider: Pick<TestPlan['providers'][0], 'name' | 'model'>;
			suite: number;
			round: number;
		};
		const { pass, executionTime, error } = result.data;

		if (!providers[key]) {
			providers[key] = { name: provider.name, model: provider.model, suites: [] };
		}

		if (!providers[key].suites[suite]) {
			providers[key].suites[suite] = {
				rounds: [],
				passCount: 0,
			};
		}

		providers[key].suites[suite].rounds.push({
			round,
			pass,
			executionTime,
			error,
		});

		if (pass) {
			providers[key].suites[suite].passCount++;
		}
	});

	return providers;
}
