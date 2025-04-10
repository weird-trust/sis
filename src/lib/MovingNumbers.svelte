<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import { projects, type Project } from '$lib/projects/projects';

	const dispatch = createEventDispatcher<{
		hover: { project: Project | null };
	}>();

	interface PointPosition {
		project: Project;
		x: number;
		y: number;
		vx: number;
		vy: number;
	}

	let hoveredProject: Project | null = null;
	let container: HTMLDivElement;
	let points: PointPosition[] = [];
	let animationFrame: number;

	// Erstellt einen Punkt mit einfachen Positionswerten
	const createPoint = (project: Project): PointPosition => {
		return {
			project,
			x: Math.random() * 80 + 10, // 10-90% der Breite
			y: Math.random() * 60 + 20, // 20-80% der Höhe
			// Zufällige Geschwindigkeit und Richtung
			vx: (Math.random() - 0.5) * 0.02,
			vy: (Math.random() - 0.5) * 0.02
		};
	};

	onMount(() => {
		// Punkte für jedes Projekt erstellen
		projects.forEach((project) => {
			points.push(createPoint(project));
		});

		// Animation starten
		startAnimation();
	});

	onDestroy(() => {
		// Animation aufräumen
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}
	});

	// Animation der Punkte
	function startAnimation(): void {
		const animate = () => {
			// Wir erstellen eine neue Array-Instanz, damit Svelte die Änderungen erkennt
			points = points.map((point) => {
				// Neue Position berechnen
				let newX = point.x + point.vx;
				let newY = point.y + point.vy;

				// Rand-Kollision prüfen und umkehren
				if (newX < 10 || newX > 90) {
					point.vx *= -1;
					newX = point.x + point.vx;
				}

				if (newY < 20 || newY > 80) {
					point.vy *= -1;
					newY = point.y + point.vy;
				}

				// Aktualisierte Position zurückgeben
				return {
					...point,
					x: newX,
					y: newY
				};
			});

			animationFrame = requestAnimationFrame(animate);
		};

		animationFrame = requestAnimationFrame(animate);
	}

	function handleHover(project: Project): void {
		hoveredProject = project;
		dispatch('hover', { project });
	}

	function handleHoverEnd(): void {
		hoveredProject = null;
		dispatch('hover', { project: null });
	}

	function navigateToProject(projectId: number): void {
		goto(`/project/${projectId}`);
	}
</script>

<div class="numbers-container" bind:this={container}>
	{#each points as point (point.project.id)}
		<div
			class="number-point"
			style="left: {point.x}%; top: {point.y}%;"
			on:mouseenter={() => handleHover(point.project)}
			on:mouseleave={handleHoverEnd}
			on:click={() => navigateToProject(point.project.id)}
		>
			{point.project.number}
		</div>
	{/each}

	{#if hoveredProject}
		<div class="preview-image" style="background-image: url('{hoveredProject.images[0]}')"></div>
	{/if}
</div>

<style>
	.numbers-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.number-point {
		position: absolute;
		font-size: 28px;
		font-family: 'Freight', 'Times New Roman', Times, serif;
		font-style: italic;
		font-weight: normal;
		cursor: pointer;
		transition: transform 0.2s ease;
		z-index: 2;
		padding-top: 15px;
	}

	.number-point::before {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 6px;
		height: 6px;
		background-color: black;
		border-radius: 50%;
	}

	.number-point:hover {
		transform: scale(1.5);
	}

	.preview-image {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 40vw;
		height: 40vh;
		background-size: cover;
		background-position: center;
		opacity: 0.5;
		z-index: 0;
		transition: opacity 0.3s ease;
	}
</style>
