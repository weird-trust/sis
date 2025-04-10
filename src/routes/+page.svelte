<script lang="ts">
	import MovingNumbers from '$lib/MovingNumbers.svelte';
	import Impressum from '$lib/Impressum.svelte';
	import FlipDisplay from '$lib/FlipDisplay.svelte';
	import type { Project } from '$lib/projects/projects';

	let showAbout = false;
	let hoveredProject: Project | null = null;
	let animationCompleted = false;
	let showImpressum = false;

	function toggleAbout(): void {
		showAbout = !showAbout;
	}

	function toggleImpressum(): void {
		showImpressum = !showImpressum;
	}

	function handleHover(event: CustomEvent<{ project: Project | null }>): void {
		hoveredProject = event.detail.project;
	}
	function handleAnimationComplete(): void {
		animationCompleted = true;
	}
</script>

<div class="container">
	<button type="button" class="about" on:click={toggleAbout} aria-label="Toggle About Section"
		>ABOUT</button
	>
	<div>
		<h1>
			{#if hoveredProject}
				{hoveredProject.title.toUpperCase()}
			{:else}
				<FlipDisplay finalText="MADELEINE HAHN" />
			{/if}
		</h1>
		<h2>
			{#if hoveredProject && hoveredProject.subtitle}
				{hoveredProject.subtitle}
			{:else}
				Editorial und Graphic Design
			{/if}
		</h2>
	</div>
	<p class="impressum" on:click={toggleImpressum}>IMPRESSUM</p>

	<MovingNumbers on:hover={handleHover} />
	<Impressum bind:showImpressum />

	{#if showAbout}
		<button
			class="overlay"
			on:click={toggleAbout}
			on:keydown={(e) => e.key === 'Enter' && toggleAbout()}
			aria-label="Close About Section"
		>
			<div class="overlay-content" on:click|stopPropagation>
				<h3>Madeleine Hahn - Editorial & Graphic Design</h3>
				<p>
					Madeleine Hahn ist eine freiberufliche Designerin aus Nürnberg mit dem Fokus auf
					Editorial- und Grafikdesign. Ihre Gestaltung basiert auf klaren Konzepten, durchdachter
					Typografie und dem gezielten Einsatz von Weißraum. Sie entwickelt Designs, die sowohl
					ästhetisch ansprechend als auch funktional sind und Inhalte präzise kommunizieren.
				</p>
				<p class="contact">
					Sag <a href="mailto:hallo@madeleinehahn.com">hallo@madeleinehahn.com</a>!
				</p>
			</div>
		</button>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 98vh;
		text-align: center;
		position: relative;
	}

	button {
		background: none;
		border: none;
		color: inherit;
		font: inherit;
		cursor: pointer;
		padding: 0;
		margin: 0;
		font-family: 'AlteHaas';
		z-index: 1000;
	}

	.about {
		padding: 1rem;
	}

	h1 {
		font-size: 3em;
		margin: 0;
		letter-spacing: -0.05em;
		transition: all 0.3s ease;
	}

	h2,
	h3 {
		font-size: 2.5em;
		margin: 0;
		font-weight: normal;
		font-family: 'FreightBook';
	}

	h2 {
		font-style: italic;
	}

	p {
		font-size: 1.5em;
		margin: 0;
		font-family: 'AlteHaas';
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		color: black;
		display: flex;
		justify-content: left;
		align-items: flex-start;
		text-align: left;
		padding: 20px;
		box-sizing: border-box;
		z-index: 1000;
	}

	.overlay-content {
		max-width: 900px;
	}

	.overlay h3 {
		font-family: 'AlteHaas', 'Arial', sans-serif;
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	.overlay p {
		font-family: 'AlteHaas', 'Arial', sans-serif;
		font-size: 1.0625rem; /* 17px */
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.overlay .contact {
		margin-top: 2rem;
	}

	.overlay a {
		color: inherit;
		text-decoration: underline;
	}

	.impressum {
		font-size: 1em;
		cursor: pointer;
		font-style: normal;
	}
</style>
