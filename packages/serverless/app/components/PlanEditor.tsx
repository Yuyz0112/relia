import type { TestPlan } from '@relia/core';
import { css, cx } from 'hono/css';
import { useEffect, useState } from 'hono/jsx';
import { dump, load } from 'js-yaml';
import YamlEditor from './YamlEditor';

type Path = Array<string | number>;
type Props = { value: string; onChange: (value: string) => void };

const PlanEditorStyle = css`
	hr {
		&:first-child {
			margin-top: 0;
		}

		margin: calc(var(--global-space) * 2) 0;
		text-align: center;
	}

	.form-group {
		margin-bottom: var(--global-space);
	}

	fieldset {
		position: relative;
	}
`;

const TwoColumnFields = css`
	display: flex;
	flex-wrap: wrap;
	gap: var(--global-space);

	> .form-group {
		width: calc(50% - var(--global-space));
	}
`;

const MessageField = css`
	display: flex;

	select {
		width: 30%;
	}

	gap: var(--global-space);
	margin-top: var(--global-space);
`;

const AddOneButton = cx(
	'btn btn-primary btn-block btn-ghost',
	css`
		margin: var(--global-space) auto 0;
		width: 30%;
	`
);

const RemoveButton = cx(
	'btn btn-error btn-ghost',
	css`
		position: absolute;
		top: -0.5em;
		right: 2px;
		padding: 0.25em 0.5em;
	`
);

const YamlSwitch = css`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: var(--global-space);

	label {
		display: block;
		width: auto;
	}
`;

const TestPlanEditor = ({ value, onChange }: Props) => {
	const [testPlan, setTestPlan] = useState<TestPlan>(() => {
		try {
			return load(value) as TestPlan;
		} catch {
			return {
				providers: [],
				suites: [],
				tools: [],
				round: 1,
			};
		}
	});
	const [yamlMode, setYamlMode] = useState(false);
	useEffect(() => {
		onChange(dump(testPlan));
	}, [testPlan]);

	const handleUpdateValue = (newValue: unknown, path: Path) => {
		const newTestPlan = { ...testPlan };
		let current: any = newTestPlan;

		path.slice(0, -1).forEach((key) => {
			current = current[key];
		});

		current[path[path.length - 1]] = newValue;
		setTestPlan(newTestPlan);
	};

	const handleInputChange = (event: Event, path: Path) => {
		const newValue = (event.target as HTMLInputElement).value;
		handleUpdateValue(newValue, path);
	};

	const renderInput = (label: string, value: string, path: Path) => (
		<div class="form-group">
			<label>{label}:</label>
			<input type="text" value={value} onChange={(e) => handleInputChange(e, path)} />
		</div>
	);

	const renderProvider = (provider: TestPlan['providers'][0], index: number) => (
		<fieldset key={index} class={TwoColumnFields}>
			<button
				class={RemoveButton}
				onClick={() => {
					const newProviders = [...testPlan.providers];
					newProviders.splice(index, 1);
					handleUpdateValue(newProviders, ['providers']);
				}}
			>
				x
			</button>
			<legend>provider {index + 1}</legend>
			{renderInput('name', provider.name, ['providers', index, 'name'])}
			{renderInput('model', provider.model, ['providers', index, 'model'])}
			{renderInput('base URL', provider.baseURL, ['providers', index, 'baseURL'])}
			{renderInput('API Key', provider.apiKey, ['providers', index, 'apiKey'])}
		</fieldset>
	);

	const renderSuiteResult = (result: TestPlan['suites'][0]['result'][0], suiteIndex: number, resultIndex: number) => (
		<fieldset key={resultIndex}>
			<button
				class={RemoveButton}
				onClick={() => {
					const newResults = [...testPlan.suites[suiteIndex].result];
					newResults.splice(resultIndex, 1);
					handleUpdateValue(newResults, ['suites', suiteIndex, 'result']);
				}}
			>
				x
			</button>
			<legend>Result {resultIndex + 1}</legend>
			{renderInput('name', result.name, ['suites', suiteIndex, 'result', resultIndex, 'name'])}
			<div class="form-group">
				<label>arguments (YAML):</label>
				<YamlEditor
					initialValue={result.arguments}
					onChange={(newValue) => handleUpdateValue(newValue, ['suites', suiteIndex, 'result', resultIndex, 'arguments'])}
				/>
			</div>
		</fieldset>
	);

	const renderSuite = (suite: TestPlan['suites'][0], index: number) => (
		<fieldset key={index}>
			<button
				class={RemoveButton}
				onClick={() => {
					const newSuites = [...testPlan.suites];
					newSuites.splice(index, 1);
					handleUpdateValue(newSuites, ['suites']);
				}}
			>
				x
			</button>
			<legend>suite {index + 1}</legend>
			<label>messages:</label>
			{suite.messages.map((message, messageIndex) => {
				return (
					<div className={MessageField}>
						<select onChange={(e) => handleInputChange(e, ['suites', index, 'messages', messageIndex, 'role'])}>
							{['user', 'assistant', 'system', 'tool'].map((role) => {
								return (
									<option selected={role === message.role} value={role}>
										{role}
									</option>
								);
							})}
						</select>
						<input
							type="text"
							value={String(message.content)}
							onChange={(e) => handleInputChange(e, ['suites', index, 'messages', messageIndex, 'content'])}
						/>
					</div>
				);
			})}
			<button
				class={AddOneButton}
				onClick={() => {
					handleUpdateValue([...testPlan.suites[index].messages, { role: 'user', content: '' }], ['suites', index, 'messages']);
				}}
			>
				add message
			</button>
			{suite.result.map((result, resultIndex) => renderSuiteResult(result, index, resultIndex))}
			<button
				class={AddOneButton}
				onClick={() => {
					handleUpdateValue([...testPlan.suites[index].result, { name: '' }], ['suites', index, 'result']);
				}}
			>
				add result
			</button>
		</fieldset>
	);

	const renderTool = (tool: TestPlan['tools'][0], index: number) => (
		<fieldset key={index}>
			<button
				class={RemoveButton}
				onClick={() => {
					const newTools = [...testPlan.tools];
					newTools.splice(index, 1);
					handleUpdateValue(newTools, ['tools']);
				}}
			>
				x
			</button>
			<legend>tool {index + 1}</legend>
			<div class={TwoColumnFields}>
				{renderInput('name', tool.function.name, ['tools', index, 'function', 'name'])}
				{renderInput('description', tool.function.description || '', ['tools', index, 'function', 'description'])}
			</div>
			<div class="form-group">
				<label>parameters (YAML):</label>
				<YamlEditor
					initialValue={tool.function.parameters}
					onChange={(newValue) => {
						handleUpdateValue(newValue, ['tools', index, 'function', 'parameters']);
					}}
				/>
			</div>
		</fieldset>
	);

	return (
		<div class={PlanEditorStyle}>
			<div class={YamlSwitch}>
				<input type="checkbox" id="yaml-mode-checkbox" checked={yamlMode} onChange={() => setYamlMode(!yamlMode)} />
				<label for="yaml-mode-checkbox">YAML mode</label>
			</div>

			{yamlMode && (
				<div class="form-group">
					<label>test plan (YAML):</label>
					<YamlEditor
						initialValue={testPlan}
						onChange={(newValue) => {
							setTestPlan(newValue);
						}}
						rows={15}
					/>
				</div>
			)}

			{!yamlMode && (
				<>
					<hr>providers</hr>
					{testPlan.providers.map((provider, index) => renderProvider(provider, index))}
					<button
						class={AddOneButton}
						onClick={() => {
							handleUpdateValue([...testPlan.providers, { name: '', model: '', baseURL: '', apiKey: '' }], ['providers']);
						}}
					>
						add provider
					</button>

					<hr>suites</hr>
					{testPlan.suites.map((suite, index) => renderSuite(suite, index))}
					<button
						class={AddOneButton}
						onClick={() => {
							handleUpdateValue([...testPlan.suites, { messages: [], result: [] }], ['suites']);
						}}
					>
						add suite
					</button>

					<hr>tools</hr>
					{testPlan.tools.map((tool, index) => renderTool(tool, index))}
					<button
						class={AddOneButton}
						onClick={() => {
							handleUpdateValue([...testPlan.tools, { function: { name: '', description: '' } }], ['tools']);
						}}
					>
						add tool
					</button>

					<hr>options</hr>
					<div class={TwoColumnFields}>{renderInput('round', String(testPlan.round), ['round'])}</div>
				</>
			)}
		</div>
	);
};

export default TestPlanEditor;
