<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import { projects, type Project } from '$lib/projects/projects';
	import { browser } from '$app/environment';

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
	let isAnimating = true; // Flag zum Steuern der Animation
	let isMobile = false; // Flag für mobile Ansicht
	let showMobileList = false; // Flag für mobile Liste

	// Erstellt einen Punkt mit einfachen Positionswerten
	const createPoint = (project: Project): PointPosition => {
		return {
			project,
			x: Math.random() * 80 + 10, // 10-90% der Breite
			y: Math.random() * 60 + 20, // 20-80% der Höhe
			// Zufällige Geschwindigkeit und Richtung
			vx: (Math.random() - 0.5) * 0.05, // Etwas schneller für bessere Bewegung
			vy: (Math.random() - 0.5) * 0.05 // Etwas schneller für bessere Bewegung
		};
	};

	onMount(() => {
		// Prüfen, ob es sich um ein mobiles Gerät handelt
		if (browser) {
			checkMobile();
			window.addEventListener('resize', checkMobile);
		}

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
		if (browser) {
			window.removeEventListener('resize', checkMobile);
		}
	});

	function checkMobile() {
		isMobile = window.innerWidth < 768;
	}

	// Animation der Punkte
	function startAnimation(): void {
		const animate = () => {
			// Nur animieren, wenn isAnimating true ist
			if (isAnimating) {
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
			}

			// Immer den nächsten Frame anfordern, auch wenn die Animation pausiert ist
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
		isAnimating = false; // Animation bei Hover stoppen
		preloadImage(project); // Bild vorladen
		dispatch('hover', { project });
	}

	function handleHoverEnd(): void {
		hoveredProject = null;
		isAnimating = true; // Animation wieder starten
		dispatch('hover', { project: null });
	}

	function navigateToProject(projectId: number): void {
		goto(`/project/${projectId}`);
	}

	function toggleMobileList(): void {
		showMobileList = !showMobileList;
	}
</script>

<div class="numbers-container" bind:this={container}>
	{#if isMobile}
		<!-- Mobile Layout mit Button und Liste -->
		<div class="mobile-controls">
			<button class="toggle-projects-btn" on:click={toggleMobileList}>
				{showMobileList ? 'Schließen' : 'Projekte anzeigen'}
			</button>

			{#if showMobileList}
				<div class="mobile-projects-overlay">
					<div class="mobile-projects-list">
						{#each projects as project (project.id)}
							<div class="mobile-project-item" on:click={() => navigateToProject(project.id)}>
								<span class="project-number">{project.number}</span>
								<span class="project-title">{project.title}</span>
								<span class="project-subtitle">{project.subtitle}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Desktop/Standard Layout mit bewegten Zahlen -->
	<div class="number-points-container" class:hidden-mobile={isMobile}>
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
	</div>

	<div class="preview-image-container" class:visible={hoveredProject !== null}>
		{#if hoveredProject}
			<div class="preview-image" style="background-image: url('{hoveredProject.images[0]}')"></div>
		{/if}
	</div>
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

	.number-points-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.number-points-container.hidden-mobile {
		display: none;
	}

	.number-point {
		position: absolute;
		font-size: 28px;
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
		opacity: 0; /* Startet unsichtbar */
		transition: opacity 0.5s ease; /* Transition für das Einblenden */
	}

	.preview-image-container.visible {
		opacity: 1; /* Wird sichtbar */
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
		filter: blur(20px); /* Starker Blur-Effekt */
		transform: scale(1); /* Leicht vergrößert, um Blur-Kanten zu vermeiden */
		transition: all 0.4s ease; /* Sanfte Übergänge */
	}

	/* Mobile Styling */
	.mobile-controls {
		position: fixed;
		bottom: 20px;
		left: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 20;
	}

	.toggle-projects-btn {
		background-color: white;
		border: 1px solid black;
		border-radius: 30px;
		padding: 12px 20px;
		font-family: 'AlteHaas', 'Arial', sans-serif;
		font-size: 16px;
		cursor: pointer;
		margin-bottom: 50%;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		z-index: 1001;
		position: relative;
	}

	.mobile-projects-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.95);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.mobile-projects-list {
		background-color: white;
		width: 90%;
		max-width: 400px;
		border-radius: 10px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		max-height: 80vh;
		overflow-y: auto;
		animation: slideUp 0.3s ease-out;
		z-index: 1001;
		padding: 20px 0;
	}

	@keyframes slideUp {
		from {
			transform: translateY(50px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.mobile-project-item {
		padding: 16px 20px;
		border-bottom: 1px solid #eee;
		display: flex;
		flex-direction: column;
		cursor: pointer;
	}

	.mobile-project-item:last-child {
		border-bottom: none;
	}

	.mobile-project-item:active {
		background-color: #f9f9f9;
	}

	.project-number {
		font-family: 'Freight', 'Times New Roman', Times, serif;
		font-style: italic;
		font-size: 24px;
		margin-bottom: 4px;
	}

	.project-title {
		font-family: 'AlteHaas', 'Arial', sans-serif;
		font-size: 18px;
		margin-bottom: 2px;
	}

	.project-subtitle {
		font-family: 'Freight', 'Times New Roman', Times, serif;
		font-style: italic;
		font-size: 16px;
		color: #000;
	}
</style>
