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
	let preloadedImages: Record<number, boolean> = {}; // Cache für geladene Bilder

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

	// Bild vorladen
	function preloadImage(project: Project): void {
		if (!preloadedImages[project.id]) {
			const img = new Image();
			img.src = project.images[0];
			preloadedImages[project.id] = true;
		}
	}

	function handleHover(project: Project): void {
		hoveredProject = project;
		preloadImage(project); // Bild vorladen
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
		<div class="preview-image-container">
			<div class="preview-image" style="background-image: url('{hoveredProject.images[0]}')"></div>
		</div>
	{/if}
</div>

<style>
	.numbers-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10; /* Erhöhter z-index für den Container */
	}

	.number-point {
		position: absolute;
		font-size: 2.5rem;
		font-family: 'Freight', 'Times New Roman', Times, serif;
		font-style: italic;
		font-weight: normal;
		cursor: pointer;
		transition: transform 0.2s ease;
		z-index: 12; /* Höherer z-index, um sicher über dem Bild zu sein */
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

	.preview-image-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 5; /* Niedrigerer z-index als die Zahlen */
		pointer-events: none; /* Keine Interaktionen mit dem Container */
	}

	.preview-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		opacity: 0.7; /* Etwas transparent */
		filter: blur(25px); /* Starker Blur-Effekt */
		transform: scale(1.1); /* Leicht vergrößert, um Blur-Kanten zu vermeiden */
		transition: all 0.4s ease; /* Sanfte Übergänge */
	}
</style>
