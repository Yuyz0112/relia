import type { ITestEndMessage, TestMessage } from '@relia/core';
import { useState } from 'hono/jsx';
import ReportTable from '../components/ReportTable';
import { css, cx } from 'hono/css';
import basicYaml from '../../../../examples/basic.yaml?raw';
import exampleResult from './example-result.json';

const tryBtn = css`
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

export default function CreateForm() {
	const [yamlPlan, setYamlPlan] = useState('');
	const [messages, setMessages] = useState<ITestEndMessage[] | null>(null);

	const handleSubmit = async () => {
		if (yamlPlan.trim() === basicYaml.trim()) {
			setMessages(exampleResult.filter((m) => m.type === 'TEST_END') as ITestEndMessage[]);
			return;
		}

		const response = await fetch('/api/reports', {
			method: 'POST',
			body: JSON.stringify({ yamlPlan }),
		});
		const messages = await response.json();

		setMessages((messages as TestMessage[]).filter((m) => m.type === 'TEST_END') as ITestEndMessage[]);
	};

	if (messages) {
		return (
			<div>
				<button
					class={cx('btn btn-default btn-ghost', tryBtn)}
					onClick={() => {
						setYamlPlan('');
						setMessages(null);
					}}
				>
					try again
				</button>
				<ReportTable messages={messages} />
			</div>
		);
	}

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<blockquote>
				You can try the example plan by clicking the button below.
				<br />
				Once you submit the example plan, it will display a previous recorded test result.
				<br />
				<button
					class={cx('btn btn-default btn-ghost', tryBtn)}
					onClick={() => {
						setYamlPlan(basicYaml);
					}}
				>
					try example plan template
				</button>
				<br />
				Or you can create your own test plan by filling the textarea below.
			</blockquote>

			<hr />

			<fieldset>
				<legend>create test plan</legend>

				<div class="form-group">
					<label for="textarea">test plan</label>
					<textarea
						cols={30}
						rows={15}
						name="yamlPlan"
						placeholder="YAML format test plan"
						value={yamlPlan}
						onChange={(evt) => setYamlPlan((evt.currentTarget as HTMLTextAreaElement).value)}
					/>
				</div>

				<div class="form-group flex justify-end">
					<button class="btn btn-default" type="submit" role="button" name="submit" id="submit" onClick={handleSubmit}>
						Submit
					</button>
				</div>
			</fieldset>
		</form>
	);
}
