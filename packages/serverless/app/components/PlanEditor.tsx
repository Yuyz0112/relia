import type { TestPlan } from '@relia/core';
import { useState } from 'hono/jsx';
import { load } from 'js-yaml';

type Path = Array<string | number>;

const TestPlanEditor = ({ yamlPlan }: { yamlPlan: string }) => {
	const [testPlan, setTestPlan] = useState<TestPlan>(() => {
		try {
			return load(yamlPlan) as TestPlan;
		} catch {
			return {
				providers: [],
				suites: [],
				tools: [],
				round: 1,
			};
		}
	});

	const handleInputChange = (event: Event, path: Path) => {
		const newValue = (event.target as HTMLInputElement).value;
		const newTestPlan = { ...testPlan };
		let current: any = newTestPlan;

		path.slice(0, -1).forEach((key) => {
			current = current[key];
		});

		current[path[path.length - 1]] = newValue;
		setTestPlan(newTestPlan);
	};

	const renderInput = (label: string, value: string, path: Path) => (
		<div class="form-group">
			<label>{label}:</label>
			<input type="text" value={value} onChange={(e) => handleInputChange(e, path)} />
		</div>
	);

	const renderProvider = (provider: TestPlan['providers'][0], index: number) => (
		<fieldset key={index}>
			<legend>provider {index + 1}</legend>
			{renderInput('name', provider.name, ['providers', index, 'name'])}
			{renderInput('model', provider.model, ['providers', index, 'model'])}
			{renderInput('base URL', provider.baseURL, ['providers', index, 'baseURL'])}
			{renderInput('API Key', provider.apiKey, ['providers', index, 'apiKey'])}
		</fieldset>
	);

	const renderSuiteMessage = (message: TestPlan['suites'][0]['messages'][0], suiteIndex: number, messageIndex: number) => (
		<fieldset key={messageIndex}>
			<legend>message {messageIndex + 1}</legend>
			{renderInput('role', message.role, ['suites', suiteIndex, 'messages', messageIndex, 'role'])}
			{renderInput('content', message.content as string, ['suites', suiteIndex, 'messages', messageIndex, 'content'])}
		</fieldset>
	);

	const renderSuiteResult = (result: TestPlan['suites'][0]['result'][0], suiteIndex: number, resultIndex: number) => (
		<fieldset key={resultIndex}>
			<legend>Result {resultIndex + 1}</legend>
			{renderInput('name', result.name, ['suites', suiteIndex, 'result', resultIndex, 'name'])}
			<div class="form-group">
				<label>arguments:</label>
				<textarea
					cols={30}
					rows={3}
					value={JSON.stringify(result.arguments, null, 2)}
					onChange={(event) => handleInputChange(event, ['suites', suiteIndex, 'result', resultIndex, 'arguments'])}
				/>
			</div>
		</fieldset>
	);

	const renderSuite = (suite: TestPlan['suites'][0], index: number) => (
		<fieldset key={index}>
			<legend>suite {index + 1}</legend>
			{suite.messages.map((message, messageIndex) => renderSuiteMessage(message, index, messageIndex))}
			{suite.result.map((result, resultIndex) => renderSuiteResult(result, index, resultIndex))}
		</fieldset>
	);

	const renderTool = (tool: TestPlan['tools'][0], index: number) => (
		<fieldset key={index}>
			<legend>tool {index + 1}</legend>
			<div>
				{renderInput('name', tool.function.name, ['tools', index, 'function', 'name'])}
				{renderInput('description', tool.function.description || '', ['tools', index, 'function', 'description'])}
				<div class="form-group">
					<label>parameters:</label>
					<textarea
						cols={30}
						rows={3}
						value={JSON.stringify(tool.function.parameters, null, 2)}
						onChange={(event) => handleInputChange(event, ['tools', index, 'function', 'parameters'])}
					/>
				</div>
			</div>
		</fieldset>
	);

	return (
		<>
			<fieldset>
				<legend>providers</legend>
				{testPlan.providers.map((provider, index) => renderProvider(provider, index))}
			</fieldset>
			<fieldset>
				<legend>suites</legend>
				{testPlan.suites.map((suite, index) => renderSuite(suite, index))}
			</fieldset>
			<fieldset>
				<legend>tools</legend>
				{testPlan.tools.map((tool, index) => renderTool(tool, index))}
			</fieldset>
			<fieldset>
				<legend>options</legend>
				{renderInput('round', String(testPlan.round), ['round'])}
			</fieldset>
		</>
	);
};

export default TestPlanEditor;
