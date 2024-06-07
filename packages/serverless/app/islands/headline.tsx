import { css, cx } from 'hono/css';
import { useEffect, useState } from 'hono/jsx';

const texts = [
	'The E2E Testing Framework for LLM.',
	'Optimize Your AI Apps with Precise Benchmarks.',
	'Find the Best LLM for Your Specific Needs.',
];

const heading = css`
	&:before {
		display: none;
	}
`;

export default function Headline() {
	const speed = 1;
	const [round, setRound] = useState(0);
	const [displayedText, setDisplayedText] = useState('');
	const [index, setIndex] = useState(0);

	const text = texts[round % texts.length];

	useEffect(() => {
		const timer = setInterval(() => {
			setRound((round) => round + 1);
			setIndex(0);
			setDisplayedText('');
		}, 5_000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (index < text.length) {
			const timeout = setTimeout(() => {
				setDisplayedText(displayedText + text[index]);
				setIndex(index + 1);
			}, speed);
			return () => clearTimeout(timeout);
		}
	}, [index, displayedText, text, speed]);

	return <h1 class={cx('terminal-prompt', heading)}>Relia: {displayedText}</h1>;
}
