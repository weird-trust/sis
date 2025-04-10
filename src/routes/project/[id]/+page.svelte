<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { projects, type Project } from '$lib/projects/projects';
	import Impressum from '$lib/Impressum.svelte';

	// Projekt basierend auf der ID aus der URL abrufen
	$: projectId = parseInt($page.params.id);
	$: project = projects.find((p) => p.id === projectId);

	let showAbout = false;
	let showImpressum = false;

	function toggleAbout(): void {
		showAbout = !showAbout;
	}

	function toggleImpressum(): void {
		showImpressum = !showImpressum;
	}

	function goBack(): void {
		goto('/');
	}
</script>

<div class="container">
	<div class="header">
		<button type="button" class="back-button" on:click={goBack}>Close</button>
		<button type="button" class="about-btn" on:click={toggleAbout} aria-label="Toggle About Section"
			>ABOUT</button
		>
	</div>

	{#if project}
		<div class="project-container">
			<div class="project-info">
				<div class="project-number">{project.number}</div>
				<h1 class="project-title">{project.title}</h1>
				{#if project.subtitle}
					<h2 class="project-subtitle">{project.subtitle}</h2>
				{/if}
				<div class="project-description">
					{#each project.description.split('\n') as paragraph}
						<p>{paragraph}</p>
					{/each}
				</div>
				{#if project.details && project.details.length > 0}
					<div class="project-details">
						{#each project.details as detail}
							<span class="detail-item">{detail}</span>
						{/each}
					</div>
				{/if}
			</div>

			<div class="project-images">
				{#each project.images as image, index}
					<div class="image-container">
						<img src={image} alt="{project.title} - Bild {index + 1}" />
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class="error">
			<h1>Projekt nicht gefunden</h1>
			<button on:click={goBack}>Zurück zur Startseite</button>
		</div>
	{/if}

	<div class="footer">
		<p class="impressum" on:click={toggleImpressum}>IMPRESSUM</p>
	</div>

	<Impressum bind:showImpressum />

	{#if showAbout}
		<div
			class="overlay"
			role="button"
			tabindex="0"
			on:click={toggleAbout}
			on:keydown={(e) => e.key === 'Enter' && toggleAbout()}
		>
			<div class="overlay-content" on:click|stopPropagation>
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
		min-height: 100vh;
		position: relative;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
	}

	.footer {
		position: fixed;
		bottom: 1rem;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		z-index: 10;
	}

	.about-btn {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-family: 'AlteHaas', 'Arial', sans-serif;
	}

	button {
		background: none;
		border: none;
		color: inherit;
		font: inherit;
		cursor: pointer;
		padding: 0;
		margin: 0;
	}

	.impressum {
		font-size: 1rem;
		font-family: 'AlteHaas', 'Arial', sans-serif;
		cursor: pointer;
		font-style: normal;
		margin: 0;
	}

	.project-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		min-height: 100vh;
		max-width: 100%;
		overflow: hidden;
		padding-top: 3rem; /* Space for header */
		padding-bottom: 3rem; /* Space for footer */
	}

	.project-info {
		padding: 2rem;
		position: sticky;
		top: 3rem; /* Account for header */
		height: calc(100vh - 6rem); /* Account for header and footer */
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-top: 4rem; /* Extra space for back button */
	}

	.back-button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		text-align: left;
		padding: 0;
		position: absolute;
		top: 1rem;
		left: 1rem;
		z-index: 20;
	}

	.project-number {
		position: relative;
		font-size: 28px;
		font-family: 'Freight', serif;
		font-style: italic;
		font-weight: normal;
		padding-top: 15px;
	}

	.project-number::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 6px;
		height: 6px;
		background-color: black;
		border-radius: 50%;
	}

	.project-title {
		font-size: 2rem;
		margin: 0;
		font-family: 'Helvetica', 'Arial', sans-serif;
		letter-spacing: -0.02em;
	}

	.project-subtitle {
		font-size: 1.2rem;
		margin: 0.5rem 0 1rem;
		font-family: 'Helvetica', 'Arial', sans-serif;
		letter-spacing: -0.01em;
		font-weight: normal;
		font-style: italic;
	}

	.project-description p {
		font-size: 1.0625rem; /* 17px */
		line-height: 1.6;
		margin-bottom: 1rem;
		font-family: 'Helvetica', 'Arial', sans-serif;
		letter-spacing: -0.01em;
	}

	.project-details {
		margin-top: 2rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.detail-item {
		font-family: 'Helvetica', 'Arial', sans-serif;
		font-size: 0.875rem;
		background-color: #f2f2f2;
		padding: 0.25rem 0.5rem;
		border-radius: 3px;
		display: inline-block;
	}

	.project-images {
		overflow-y: auto;
		height: calc(100vh - 6rem); /* Account for header and footer */
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.image-container {
		width: 100%;
	}

	.image-container img {
		width: 100%;
		height: auto;
		display: block;
	}

	.error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		text-align: center;
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

	/* Responsive Design */
	@media (max-width: 768px) {
		.project-container {
			grid-template-columns: 1fr;
			padding-top: 4rem; /* More space for header */
		}

		.project-info {
			position: relative;
			height: auto;
			padding: 1.5rem;
			top: 0;
			padding-top: 3.5rem; /* Adjust for mobile */
		}

		.project-images {
			height: auto;
			padding: 1.5rem;
		}

		.project-description {
			font-size: 1rem; /* Slightly smaller on mobile */
			line-height: 1.5;
		}

		.header {
			padding: 0.75rem;
		}

		.back-button {
			top: 0.75rem;
			left: 0.75rem;
			font-family: 'AlteHaas', 'Arial', sans-serif;
		}
	}
</style>
