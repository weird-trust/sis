<script lang="ts">
	import MovingNumbers from '$lib/MovingNumbers.svelte';
	import Impressum from '$lib/Impressum.svelte';
	import FlipDisplay from '$lib/FlipDisplay.svelte';
	import About from '$lib/About.svelte';
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
		<h2 class="subtitle">
			{#if hoveredProject && hoveredProject.subtitle}
				{hoveredProject.subtitle}
			{:else}
				Editorial & Graphic Design
			{/if}
		</h2>
	</div>
	<p class="impressum" on:click={toggleImpressum}>IMPRESSUM</p>

	<MovingNumbers on:hover={handleHover} />
	<Impressum bind:showImpressum />
	<About bind:showAbout />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 99dvh;
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
		line-height: 0.9em;
		margin: 0;
		letter-spacing: -0.05em;
		transition: all 0.3s ease;
		font-family: 'AlteHaas';

		@media screen and (max-width: 768px) {
			font-size: 2em;
			line-height: 0.8em;
		}
	}

	h2,
	h3 {
		font-size: 2.5em;
		margin: 0;
		font-weight: normal;
		font-family: 'FreightBook';

		@media screen and (max-width: 768px) {
			font-size: 1.5em;
		}
	}

	h2.subtitle {
		padding-top: 0.5rem;
	}

	h2 {
		font-style: italic;
	}

	p {
		font-size: 1.5em;
		margin: 0;
		font-family: 'AlteHaas';

		@media screen and (max-width: 768px) {
			font-size: 1em;
		}
	}

	.impressum {
		font-size: 1em;
		cursor: pointer;
		font-style: normal;
		padding: 1rem;
		z-index: 1000;
	}
</style>
