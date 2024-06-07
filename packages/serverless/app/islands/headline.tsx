import { css, cx } from 'hono/css';
import { useEffect, useRef, useState } from 'hono/jsx';

const texts = ['Find the Best LLM for Your Needs.', 'The E2E Testing Framework for LLM.', 'Optimize Your AI Apps with Precise Benchmarks.'];

const heading = css`
	white-space: normal;

	&:before {
		display: none;
	}
`;

export default function Headline() {
	const speed = 1;
	const [round, setRound] = useState(0);
	const [displayedText, setDisplayedText] = useState('');
	const [index, setIndex] = useState(0);

	const [isVisible, setIsVisible] = useState(true);
	const headlineRef = useRef(null);

	const text = texts[round % texts.length];

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.1 }
		);

		if (headlineRef.current) {
			observer.observe(headlineRef.current);
		}

		return () => {
			if (headlineRef.current) {
				observer.unobserve(headlineRef.current);
			}
		};
	}, []);

	useEffect(() => {
		let timer: ReturnType<typeof setInterval> | null = null;
		if (isVisible) {
			timer = setInterval(() => {
				setRound((round) => round + 1);
				setIndex(0);
				setDisplayedText('');
			}, 3_000);
		}

		return () => timer && clearInterval(timer);
	}, [isVisible]);

	useEffect(() => {
		if (index < text.length) {
			const timeout = setTimeout(() => {
				setDisplayedText(displayedText + text[index]);
				setIndex(index + 1);
			}, speed);
			return () => clearTimeout(timeout);
		}
	}, [index, displayedText, text, speed]);

	return (
		<h1 ref={headlineRef} class={cx('terminal-prompt', heading)}>
			Relia: {displayedText}
		</h1>
	);
}
