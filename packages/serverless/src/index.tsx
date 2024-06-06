import { Hono } from 'hono';
import type { FC } from 'hono/jsx';
import { Style, css } from 'hono/css';
import { ITestEndMessage, runTests, TestMessage } from '@relia/core';
import ReportTable from './ReportTable';

const app = new Hono<{ Bindings: Env }>();

const Layout: FC = (props) => {
	return (
		<html>
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Relia Test Report</title>
				<link rel="stylesheet" href="https://unpkg.com/terminal.css@0.7.4/dist/terminal.min.css" />
				<Style>{css`
					.error-info {
						display: none;
						white-space: pre-wrap;
						margin-top: 4px;
						padding: 2px;
					}
					.error-cell {
						position: relative;
					}
					.error-cell label {
						cursor: pointer;
					}
					.error-checkbox {
						display: none;
					}
					.error-checkbox:checked + .error-info {
						display: block;
					}
					.align-right {
						text-align: right;
					}
					.bg-success {
						background-color: rgb(220 252 231);
					}
					.bg-error {
						background-color: rgb(254 226 226);
					}
					.bg-diff-add {
						background-color: rgb(248 113 113);
					}
					.bg-diff-remove {
						background-color: rgb(74 222 128);
					}
					.break-all {
						word-break: break-all;
					}
					.text-italic {
						font-style: italic;
					}
				`}</Style>
			</head>
			<body class="container">{props.children}</body>
		</html>
	);
};

app.get('/', async (c) => {
	let messages = [
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 0,
				round: 1,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 0,
				round: 2,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 0,
				round: 3,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 0,
				round: 4,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 1,
				round: 1,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 1,
				round: 2,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 1,
				round: 3,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 1,
				round: 4,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 0,
				round: 1,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 0,
				round: 2,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 0,
				round: 3,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 0,
				round: 4,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 1,
				round: 1,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 1,
				round: 2,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 1,
				round: 3,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 1,
				round: 4,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4o, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 0,
				round: 1,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4o, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 0,
				round: 2,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4o, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 0,
				round: 3,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4o, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 0,
				round: 4,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4o, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 1,
				round: 1,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4o, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 1,
				round: 2,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4o, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 1,
				round: 3,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider openAI, model gpt-4o, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 1,
				round: 4,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 0,
				round: 1,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 0,
				round: 2,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 0,
				round: 3,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 0,
				round: 4,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 1,
				round: 1,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 1,
				round: 2,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 1,
				round: 3,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 1,
				round: 4,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 0,
				round: 1,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 0,
				round: 2,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 0,
				round: 3,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 0, round 4',
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 0,
				round: 4,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 1,
				round: 1,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 1,
				round: 2,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 1,
				round: 3,
			},
		},
		{
			type: 'TEST_START',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 1, round 4',
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 1,
				round: 4,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 0, round 4',
				executionTime: 853,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 0,
				round: 1,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 0, round 4',
				executionTime: 876,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 0,
				round: 2,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 1, round 4',
				executionTime: 954,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 1,
				round: 1,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 0, round 4',
				executionTime: 960,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 0,
				round: 4,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 0, round 4',
				executionTime: 1123,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 0,
				round: 3,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 1, round 4',
				executionTime: 1275,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 1,
				round: 2,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 1, round 4',
				executionTime: 1617,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 1,
				round: 3,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-3.5-turbo, suite 1, round 4',
				executionTime: 1682,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-3.5-turbo',
				},
				suite: 1,
				round: 4,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 0, round 4',
				executionTime: 2339,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 0,
				round: 2,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 0, round 4',
				executionTime: 2534,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 0,
				round: 1,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 0, round 4',
				executionTime: 2546,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 0,
				round: 4,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 0, round 4',
				executionTime: 2935,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 0,
				round: 3,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 1, round 4',
				executionTime: 3084,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 1,
				round: 2,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4o, suite 0, round 4',
				executionTime: 3374,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 0,
				round: 1,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 1, round 4',
				executionTime: 3669,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 1,
				round: 3,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4o, suite 0, round 4',
				executionTime: 3808,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 0,
				round: 2,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 1, round 4',
				executionTime: 3837,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 1,
				round: 1,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4o, suite 0, round 4',
				executionTime: 3860,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 0,
				round: 3,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4-turbo, suite 1, round 4',
				executionTime: 4213,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4-turbo',
				},
				suite: 1,
				round: 4,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4o, suite 0, round 4',
				executionTime: 4375,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 0,
				round: 4,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4o, suite 1, round 4',
				executionTime: 4509,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 1,
				round: 1,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4o, suite 1, round 4',
				executionTime: 4687,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 1,
				round: 4,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4o, suite 1, round 4',
				executionTime: 4792,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 1,
				round: 3,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider openAI, model gpt-4o, suite 1, round 4',
				executionTime: 4955,
				pass: true,
			},
			meta: {
				provider: {
					name: 'openAI',
					model: 'gpt-4o',
				},
				suite: 1,
				round: 2,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 0, round 4',
				executionTime: 5339,
				pass: true,
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 0,
				round: 1,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 0, round 4',
				executionTime: 5406,
				pass: true,
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 0,
				round: 2,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 0, round 4',
				executionTime: 5646,
				pass: true,
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 0,
				round: 4,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 1, round 4',
				executionTime: 5791,
				pass: true,
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 1,
				round: 1,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 1, round 4',
				executionTime: 6006,
				pass: true,
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 1,
				round: 2,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 0, round 4',
				executionTime: 6078,
				pass: true,
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 0,
				round: 3,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 1, round 4',
				executionTime: 6181,
				pass: true,
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 1,
				round: 3,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider fireworks, model accounts/fireworks/models/firefunction-v1, suite 1, round 4',
				executionTime: 6244,
				pass: true,
			},
			meta: {
				provider: {
					name: 'fireworks',
					model: 'accounts/fireworks/models/firefunction-v1',
				},
				suite: 1,
				round: 4,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 0, round 4',
				executionTime: 7883,
				pass: true,
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 0,
				round: 1,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 0, round 4',
				executionTime: 9608,
				pass: true,
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 0,
				round: 2,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 0, round 4',
				executionTime: 14177,
				pass: true,
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 0,
				round: 3,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 1, round 4',
				executionTime: 14389,
				pass: true,
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 1,
				round: 1,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 0, round 4',
				executionTime: 14593,
				pass: true,
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 0,
				round: 4,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 1, round 4',
				executionTime: 17616,
				pass: false,
				error: {
					generatedMessage: true,
					code: 'ERR_ASSERTION',
					actual: {
						name: 'get_stock_price',
						arguments: {
							symbol: 'Tesla',
						},
					},
					expected: {
						name: 'get_stock_price',
						arguments: {
							symbol: 'TSLA',
						},
					},
					operator: 'deepStrictEqual',
				},
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 1,
				round: 2,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 1, round 4',
				executionTime: 18068,
				pass: false,
				error: {
					generatedMessage: true,
					code: 'ERR_ASSERTION',
					actual: {
						name: 'get_stock_price',
						arguments: {
							symbol: 'Tesla',
						},
					},
					expected: {
						name: 'get_stock_price',
						arguments: {
							symbol: 'TSLA',
						},
					},
					operator: 'deepStrictEqual',
				},
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 1,
				round: 4,
			},
		},
		{
			type: 'TEST_END',
			data: {
				description: 'provider groq, model llama3-70b-8192, suite 1, round 4',
				executionTime: 21243,
				pass: false,
				error: {
					generatedMessage: true,
					code: 'ERR_ASSERTION',
					actual: {
						name: 'get_stock_price',
						arguments: {
							symbol: 'Tesla',
						},
					},
					expected: {
						name: 'get_stock_price',
						arguments: {
							symbol: 'TSLA',
						},
					},
					operator: 'deepStrictEqual',
				},
			},
			meta: {
				provider: {
					name: 'groq',
					model: 'llama3-70b-8192',
				},
				suite: 1,
				round: 3,
			},
		},
	];

	// messages = (await runTests({
	// 	providers: [
	// 		{
	// 			name: 'openAI',
	// 			model: 'gpt-3.5-turbo',
	// 			temperature: 0.1,
	// 			baseURL: 'https://api.openai.com/v1',
	// 			apiKey: c.env.OPENAI_API_KEY,
	// 		},
	// 		{
	// 			name: 'openAI',
	// 			model: 'gpt-4-turbo',
	// 			temperature: 0.1,
	// 			baseURL: 'https://api.openai.com/v1',
	// 			apiKey: c.env.OPENAI_API_KEY,
	// 		},
	// 		{
	// 			name: 'openAI',
	// 			model: 'gpt-4o',
	// 			temperature: 0.1,
	// 			baseURL: 'https://api.openai.com/v1',
	// 			apiKey: c.env.OPENAI_API_KEY,
	// 		},
	// 		{
	// 			name: 'fireworks',
	// 			model: 'accounts/fireworks/models/firefunction-v1',
	// 			temperature: 0.1,
	// 			baseURL: 'https://api.fireworks.ai/inference/v1',
	// 			apiKey: c.env.FIREWORKS_API_KEY,
	// 		},
	// 		{
	// 			name: 'groq',
	// 			model: 'llama3-70b-8192',
	// 			temperature: 0.1,
	// 			baseURL: 'https://api.groq.com/openai/v1',
	// 			apiKey: c.env.GROQ_API_KEY,
	// 		},
	// 	],
	// 	suites: [
	// 		{
	// 			messages: [
	// 				{
	// 					role: 'assistant',
	// 					content: 'Hello, please provide the stock symbol to get the price.',
	// 				},
	// 				{
	// 					role: 'user',
	// 					content: 'I want to know the price of Apple.',
	// 				},
	// 			],
	// 			result: {
	// 				name: 'get_stock_price',
	// 				arguments: {
	// 					symbol: 'AAPL',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			messages: [
	// 				{
	// 					role: 'assistant',
	// 					content: 'Please provide the stock symbol to get the price.',
	// 				},
	// 				{
	// 					role: 'user',
	// 					content: 'Can you get me the price of Tesla?',
	// 				},
	// 			],
	// 			result: {
	// 				name: 'get_stock_price',
	// 				arguments: {
	// 					symbol: 'TSLA',
	// 				},
	// 			},
	// 		},
	// 	],
	// 	tools: [
	// 		{
	// 			type: 'function',
	// 			function: {
	// 				name: 'get_stock_price',
	// 				description: 'Get a stock price',
	// 				parameters: {
	// 					type: 'object',
	// 					properties: {
	// 						symbol: {
	// 							type: 'string',
	// 							description: 'The stock symbol to get the price for',
	// 						},
	// 					},
	// 					required: ['symbol'],
	// 				},
	// 			},
	// 		},
	// 	],
	// 	round: 4,
	// 	reporter: {
	// 		mode: 'json',
	// 	},
	// })) as any;

	return c.html(
		<Layout>
			<h1>Relia Test Report</h1>
			<ReportTable messages={(messages || []).filter((m) => m.type === 'TEST_END') as ITestEndMessage[]} />
			<pre>{JSON.stringify(messages, null, 2)}</pre>
		</Layout>
	);
});

export default app;
