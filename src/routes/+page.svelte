<script lang="ts">
	import MovingNumbers from '$lib/MovingNumbers.svelte';
	import FlipDisplay from '$lib/FlipDisplay.svelte';
	import type { Project } from '$lib/projects/projects';

	let showAbout = false;
	let hoveredProject: Project | null = null;
	let animationCompleted = false;

	function toggleAbout(): void {
		showAbout = !showAbout;
	}

	function handleHover(event: CustomEvent<{ project: Project | null }>): void {
		hoveredProject = event.detail.project;
	}

	function handleAnimationComplete(): void {
		animationCompleted = true;
	}
</script>

<div class="container">
	<button type="button" on:click={toggleAbout} aria-label="Toggle About Section">ABOUT</button>
	<div>
		<h1>
			{#if hoveredProject}
				{hoveredProject.title.toUpperCase()}
			{:else}
				<FlipDisplay finalText="MADELEINE HAHN" />
			{/if}
		</h1>
		<h2>Editorial und Graphic Design</h2>
	</div>
	<p class="impressum">IMPRESSUM</p>

	<MovingNumbers on:hover={handleHover} />

	{#if showAbout}
		<div
			class="overlay"
			role="button"
			tabindex="0"
			on:click={toggleAbout}
			on:keydown={(e) => e.key === 'Enter' && toggleAbout()}
		>
			<div class="overlay-content">
				<h3>Madeleine Hahn - Editorial & Graphic Design</h3>
				<p>
					Madeleine Hahn is a freelance designer based in Nuremberg, specializing in editorial and
					graphic design. With a keen eye for aesthetics and structure, she crafts bespoke design
					solutions tailored to meet the unique needs of her clients. Through creative and
					strategically developed concepts, she creates visual experiences that are both engaging
					and informative. Her work stands out for its precision and leaves a lasting impression
					across print and digital media.
				</p>
			</div>
		</div>
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
		font-family: Arial, sans-serif;
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

	h1 {
		font-size: 3em;
		margin: 0;
		letter-spacing: -0.05em;
		transition: all 0.3s ease;
		font-family: 'AlteHaas';
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

	.impressum {
		font-size: 1em;
		cursor: pointer;
		font-style: normal;
	}
</style>
