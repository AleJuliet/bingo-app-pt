import { useCallback, useEffect, useRef } from "react";

interface ConfettiConfig {
	gravity: number;
}

interface Particle {
	x: number;
	vx: number;
	y: number;
	vy: number;
	gravity: number;
	life: number;
	color: string;
}

const createCanvasElement = (): HTMLCanvasElement => {
	const canvas = document.createElement("canvas");
	canvas.style.position = "fixed";
	canvas.style.top = "0";
	canvas.style.left = "0";
	canvas.style.pointerEvents = "none";
	canvas.style.width = "100%";
	canvas.style.height = "100%";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	return canvas;
}

export const useConfetti = (config: ConfettiConfig) => {
	const canvasRef = useRef<null | HTMLCanvasElement>(null);
	const requestAnimationFrameRef = useRef<null | number>(null);
	const particlesRef = useRef<Array<Particle>>([]);

	useEffect(() => {
		const canvasElement = createCanvasElement();
		document.body.appendChild(canvasElement);
		canvasRef.current = canvasElement;

		function draw() {
			// Clear canvas
			if (!canvasRef.current || particlesRef.current.length < 1) return;

			const canvasContext = canvasElement.getContext("2d");
			if (!canvasContext) return;

			canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

			const updatedParticles = particlesRef.current
																.filter((p) => p.life > 0)
																.map((particle, index) =>
			{
				return {
					...particle,
					x: particle.x + particle.vx,
					y: particle.y + particle.vy,
					vy: particle.vy + particle.gravity,
					life: particle.life - 1,
					color: particle.color,
				}
			});

			particlesRef.current = updatedParticles;

			updatedParticles.forEach((particle) => {
				canvasContext.fillStyle = particle.color;
				canvasContext.fillRect(particle.x, particle.y, 30, 30);
			});

			requestAnimationFrameRef.current = requestAnimationFrame(draw);
		}
		requestAnimationFrameRef.current = requestAnimationFrame(draw);

		return () => {
			if (requestAnimationFrameRef.current !== null) cancelAnimationFrame(requestAnimationFrameRef.current);
			canvasElement.remove();
		}
	}, [config]);

	const throwConfetti = useCallback((count: number, origin?: { x: number; y: number }) => {
		const newConfetti: Array<Particle> = Array.from({ length: count }).map(() => {
			const particle: Particle = {
				x: origin?.x || Math.random() * (canvasRef.current?.width || window.innerWidth),
				vx: (Math.random() * 13) - 5,
				y: origin?.y || Math.random() * (canvasRef.current?.height || window.innerHeight),
				vy: (Math.random() * -10) * 3,
				gravity: config.gravity,
				life: 1000,
				color: `hsl(${Math.random() * 360}, 100%, 50%)`
			}

			return particle;
		});
		particlesRef.current = [...particlesRef.current, ...newConfetti]
	}, [config]);

	return { throwConfetti };
}