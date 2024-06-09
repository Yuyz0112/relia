export default function Roadmap() {
	return (
		<div class="terminal-timeline">
			<div class="terminal-card">
				<header>core API</header>
				<div>Expand support to include more LLM providers.</div>
			</div>
			<div class="terminal-card done">
				<header>UI/UX</header>
				<div>Develop a form UI for editing test plans, making it easier and more intuitive to create and manage tests.</div>
			</div>
			<div class="terminal-card">
				<header>core API</header>
				<div>Enable customization of provider titles and suite titles in test reports for better organization and clarity.</div>
			</div>
			<div class="terminal-card">
				<header>Cloud Service</header>
				<div>Improve the efficiency and reliability of executing large-scale test plans.</div>
			</div>
			<div class="terminal-card">
				<header>Cloud Service</header>
				<div>Implement persistent storage for test plans and reports.</div>
			</div>
			<div class="terminal-card">
				<header>core API</header>
				<div>Allow custom scoring for different suites to better evaluate and compare the performance of test cases.</div>
			</div>
		</div>
	);
}
