import { createRoute } from 'honox/factory';
import { cx, css } from 'hono/css';
import hljs from 'highlight.js/lib/core';
import yaml from 'highlight.js/lib/languages/yaml';
import Headline from '../islands/headline';
import UseCase, { Props as UseCaseProps } from '../islands/use-case';
import p1 from '../../../../examples/multi-providers.yaml?raw';
import u1 from '../reports/u1.json';
import p2 from '../../../../examples/optimize-prompts.yaml?raw';
import u2 from '../reports/u2.json';
import p3 from '../../../../examples/continuous-testing.yaml?raw';
import u3 from '../reports/u3.json';
import Roadmap from '../components/Roadmap';

hljs.registerLanguage('yaml', yaml);

const tryBtn = css`
	margin-top: 1rem;
	margin-bottom: 1rem;
	margin-left: auto;
	display: block;
	width: fit-content;
`;

export default createRoute(async (c) => {
	return c.render(
		<div class="container">
			<Headline />
			<h3>Project Goals</h3>
			<p>
				Relia is an E2E testing framework for LLMs, designed to help you build AI benchmarks tailored to your specific use cases. It
				identifies the most suitable LLM model for your needs and ensures that model upgrades do not cause performance regressions through
				continuous testing. Built specifically for function calling (or "tool use") scenarios, which are at the core of agent-based AI
				applications.
				<br />
				<a class={cx('btn btn-default', tryBtn)} href="/reports/create">
					Try now
				</a>
			</p>
			<h3>Use Cases</h3>
			<h4>Selecting the Most Suitable LLM</h4>
			<p>Identify the best LLM for your specific use case, ensuring high performance and cost efficiency.</p>
			<blockquote>
				<em>
					This test plan compares the success rates of three LLMs (OpenAI, Fireworks, and Groq) to identify the most accurate and efficient
					model for a specific task.
				</em>
			</blockquote>
			<UseCase
				plan={
					hljs.highlight(p1, {
						language: 'yaml',
					}).value
				}
				messages={u1 as UseCaseProps['messages']}
				reportId="u1"
			/>
			<hr />
			<h4>Optimizing Prompts</h4>
			<p>
				Compare the results of multiple sets of prompts on the same model to understand the impact of different prompts and complete
				optimization.
			</p>
			<blockquote>
				<em>This test plan aims to compare the effectiveness of different prompt engineering strategies.</em>
			</blockquote>
			<UseCase
				plan={
					hljs.highlight(p2, {
						language: 'yaml',
					}).value
				}
				messages={u2 as UseCaseProps['messages']}
				reportId="u2"
			/>
			<hr />
			<h4>Continuous Testing to Prevent Regressions</h4>
			<p>Continuously test different versions of the same model to avoid regressions during upgrades.</p>
			<blockquote>
				<em>
					This test plan aims to prevent regression in model upgrades by comparing the performance of multiple versions of OpenAI's GPT-4
					models.
				</em>
			</blockquote>
			<UseCase
				plan={
					hljs.highlight(p3, {
						language: 'yaml',
					}).value
				}
				messages={u3 as UseCaseProps['messages']}
				reportId="u3"
			/>
			<h3>Roadmap</h3>
			<Roadmap />
			<hr />
			<p>
				Feel free to follow our project on&nbsp;
				<a href="https://github.com/Yuyz0112/relia" target="_blank">
					GitHub
				</a>
				,&nbsp;
				<a href="https://x.com/Aryu0112" target="_blank">
					X
				</a>
				, and&nbsp;
				<a href="https://space.bilibili.com/489667127" target="_blank">
					Bilibili
				</a>
				.
			</p>
		</div>,
		{
			title: 'Relia: Find the Best LLM for Your Needs.',
		}
	);
});
