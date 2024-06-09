import type { ITestEndMessage, TestMessage } from '@relia/core';
import { useState } from 'hono/jsx';
import { css, cx } from 'hono/css';
import ReportTable from '../components/ReportTable';
import PlanEditor from '../components/PlanEditor';
import basicYaml from '../../../../examples/basic.yaml?raw';
import exampleResult from '../reports/example.json';

const FormStyle = css`
	margin-bottom: 1em;
`;

const TryBtn = css`
	margin-top: 1em;
	margin-bottom: 1em;
`;

export default function CreateForm() {
	const [yamlPlan, setYamlPlan] = useState('');
	const [messages, setMessages] = useState<ITestEndMessage[] | null>(null);
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async () => {
		if (submitting) {
			return;
		}
		try {
			setSubmitting(true);
			if (yamlPlan.trim() === basicYaml.trim()) {
				setMessages(exampleResult.filter((m) => m.type === 'TEST_END') as ITestEndMessage[]);
				return;
			}

			const response = await fetch('/api/v0/reports', {
				method: 'POST',
				body: JSON.stringify({ yamlPlan }),
			});
			const messages = await response.json();

			setMessages((messages as TestMessage[]).filter((m) => m.type === 'TEST_END') as ITestEndMessage[]);
		} finally {
			setSubmitting(false);
		}
	};

	if (messages) {
		return (
			<div>
				<button
					class={cx('btn btn-default btn-ghost', TryBtn)}
					onClick={() => {
						setMessages(null);
					}}
				>
					edit test plan
				</button>
				<ReportTable messages={messages} />
			</div>
		);
	}

	return (
		<form onSubmit={(e) => e.preventDefault()} class={FormStyle}>
			<blockquote>
				You can try the example plan by clicking the button below.
				<br />
				Once you submit the example plan, it will display a previous recorded test result.
				<br />
				<button
					class={cx('btn btn-default btn-ghost', TryBtn)}
					onClick={() => {
						setYamlPlan(basicYaml);
					}}
				>
					try example plan template
				</button>
				<br />
				Or you can create your own test plan by filling the textarea below.&nbsp;
				<em>
					<a href="https://github.com/Yuyz0112/relia/blob/main/docs/guide.en-US.md" target="_blank">
						How to plan a test?
					</a>
				</em>
				.
			</blockquote>

			<hr />

			<fieldset>
				<legend>create test report</legend>
				<PlanEditor
					value={basicYaml}
					onChange={(value) => {
						setYamlPlan(value);
					}}
				/>

				<div class="form-group flex justify-end">
					<button
						class="btn btn-default"
						type="submit"
						role="button"
						name="submit"
						id="submit"
						onClick={handleSubmit}
						disabled={submitting}
					>
						{submitting ? '...' : 'Submit'}
					</button>
				</div>
			</fieldset>
		</form>
	);
}
