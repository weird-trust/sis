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

	// Variablen für die mobile Slideshow
	let mobileSlideIndex = 0;
	let mobileSlideInterval: ReturnType<typeof setInterval> | null = null;

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

	// Prüft, ob es sich um ein mobiles Gerät handelt
	function checkMobile(): void {
		if (browser) {
			// Einfache Methode zur Erkennung von Mobilgeräten basierend auf Bildschirmbreite
			isMobile = window.innerWidth < 768; // 768px ist ein üblicher Breakpoint für Tablets/Mobile
		}
	}

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

		// Starte die mobile Slideshow nach dem Mounten
		startMobileSlideshow();
	});

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

	// Funktion zum Starten der mobilen Slideshow
	function startMobileSlideshow() {
		if (isMobile && browser) {
			// Starte die Slideshow nur, wenn das Menü nicht geöffnet ist
			if (!showMobileList) {
				mobileSlideInterval = setInterval(() => {
					// Rotiere durch die Projekte
					mobileSlideIndex = (mobileSlideIndex + 1) % projects.length;
				}, 2000); // Alle 3 Sekunden wechseln
			}
		}
	}

	// Stoppe die Slideshow
	function stopMobileSlideshow() {
		if (mobileSlideInterval) {
			clearInterval(mobileSlideInterval);
			mobileSlideInterval = null;
		}
	}

	// Modifiziere die toggleMobileList Funktion
	function toggleMobileList(): void {
		showMobileList = !showMobileList;
		// Wenn das Menü geschlossen wird, starte die Slideshow erneut
		if (!showMobileList) {
			startMobileSlideshow();
		} else {
			stopMobileSlideshow();
		}
	}

	onDestroy(() => {
		// Animation aufräumen
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}
		// Slideshow aufräumen
		stopMobileSlideshow();

		if (browser) {
			window.removeEventListener('resize', checkMobile);
		}
	});
</script>

<div class="numbers-container" bind:this={container}>
	{#if isMobile}
		<!-- Mobile Background Image -->
		<div class="mobile-background-container">
			{#each projects as project, i}
				<div
					class="mobile-background-image"
					class:active={i === mobileSlideIndex}
					style="background-image: url('{project.images[0]}')"
				></div>
			{/each}
		</div>

		<!-- Mobile Layout mit Button und Liste -->
		<div class="mobile-controls">
			{#if !showMobileList}
				<button class="toggle-projects-btn" on:click={toggleMobileList}> Projekte anzeigen</button>
			{/if}

			{#if showMobileList}
				<div class="mobile-projects-overlay">
					<div class="mobile-projects-list">
						<button class="close-btn" on:click={toggleMobileList}>×</button>
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
		z-index: 100; /* Erhöhter z-index, höher als andere Elemente */
	}

	.toggle-projects-btn {
		background-color: rgba(255, 255, 255, 0.9); /* Leicht transparenter weißer Hintergrund */
		border: 1px solid black;
		border-radius: 30px;
		padding: 12px 20px;
		font-family: 'AlteHaas', 'Arial', sans-serif;
		font-size: 16px;
		cursor: pointer;
		margin-bottom: 50%;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Stärkerer Schatten für bessere Sichtbarkeit */
		z-index: 1001;
		position: relative;
		animation: fadeIn 0.3s ease-out;
	}

	.mobile-projects-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.5); /* Heller Hintergrund wie im Impressum */
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		display: flex;
		justify-content: left; /* Linksbündig wie im Impressum */
		align-items: flex-start; /* Oben ausgerichtet wie im Impressum */
		text-align: center;
		padding: 3rem;
		box-sizing: border-box;
		z-index: 1000;
		animation: fadeIn 0.2s ease-out;
	}

	.mobile-projects-list {
		background-color: transparent; /* Kein Hintergrund, da der Overlay bereits einen hat */
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		animation: fadeIn 0.3s ease-out; /* Einfachere Animation */
		z-index: 1001;
		position: relative;
	}

	/* Globaler Stil, der im <style> Tag definiert werden kann */
	:global(.no-scroll) {
		overflow: hidden !important;
		position: fixed;
		width: 100%;
		height: 100%;
	}

	/* Verhindert das "Springen" beim Ein-/Ausblenden der Scrollbar */
	:global(html) {
		overflow-y: scroll; /* Immer eine vertikale Scrollbar anzeigen */
		scrollbar-width: thin; /* Firefox */
	}

	:global(body) {
		padding-right: 0 !important; /* Kein Padding, auch wenn die Scrollbar versteckt ist */
		margin-right: calc(100vw - 100%); /* Kompensiert den Platz der Scrollbar */
	}

	/* Für Webkit-basierte Browser (Chrome, Safari, neue Edge-Versionen) */
	:global(::-webkit-scrollbar) {
		width: 8px; /* Schmale Scrollbar */
	}

	:global(::-webkit-scrollbar-track) {
		background: transparent;
	}

	:global(::-webkit-scrollbar-thumb) {
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 20px;
	}

	.mobile-project-item {
		padding: 16px 0;

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
		font-size: 2rem;
		line-height: 0.9;
		margin-bottom: 0.5rem;
		font-weight: normal;

		@media screen and (max-width: 768px) {
			font-size: 1.4rem;
			line-height: 0.9;
			margin-bottom: 0.2rem;
			font-weight: normal;
		}
	}

	.project-title {
		font-family: 'AlteHaas', 'Arial', sans-serif;
		font-size: 1.0625rem; /* 17px wie im Impressum */
		margin-bottom: 0.25rem;

		@media screen and (max-width: 768px) {
			font-size: 1.4rem;
			line-height: 0.9;
			margin-bottom: 0.5rem;
			font-weight: normal;
		}
	}

	.project-subtitle {
		font-family: 'Freight', 'Times New Roman', Times, serif;
		font-size: 1.0625rem;
	}

	.close-btn {
		position: fixed;
		top: 10px;
		right: 10px;
		background: none;
		border: none;
		font-size: 28px;
		cursor: pointer;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: black; /* Schwarz statt weiß für das X */
		z-index: 1002;
	}

	/* Mobile Background Slideshow */
	.mobile-background-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 3; /* Unter den Punkten, aber über dem normalen Hintergrund */
		pointer-events: none; /* Keine Interaktionen mit dem Container */
	}

	.mobile-background-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		opacity: 0;
		filter: blur(20px); /* Starker Blur-Effekt */
		transition: opacity 1.5s ease; /* Sanfte Übergänge */
		transform: scale(1.1); /* Leicht vergrößert, um Blur-Kanten zu vermeiden */
	}

	.mobile-background-image.active {
		opacity: 0.5; /* Transparenter als Desktop, damit die UI lesbar bleibt */
	}
</style>
