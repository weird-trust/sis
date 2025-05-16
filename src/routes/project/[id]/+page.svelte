<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { projects, type Project } from '$lib/projects/projects';
	import Impressum from '$lib/Impressum.svelte';
	import About from '$lib/About.svelte';

	// Projekt basierend auf der ID aus der URL abrufen
	$: projectId = parseInt($page.params.id);
	$: project = projects.find((p) => p.id === projectId);

	// Berechne die nächste Projekt-ID
	$: nextProjectId = getNextProjectId(projectId);

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

	function goToNextProject(): void {
		goto(`/project/${nextProjectId}`);
	}

	function getNextProjectId(currentId: number): number {
		const sortedProjects = [...projects].sort((a, b) => a.id - b.id);
		const currentIndex = sortedProjects.findIndex((p) => p.id === currentId);

		// Wenn aktuelles Projekt das letzte ist, gehe zum ersten zurück
		if (currentIndex === sortedProjects.length - 1 || currentIndex === -1) {
			return sortedProjects[0].id;
		}

		// Sonst gehe zum nächsten Projekt
		return sortedProjects[currentIndex + 1].id;
	}
</script>

<div class="container">
	<div class="header">
		<button type="button" class="header-button back-button" on:click={goBack}>Close</button>
		<button
			type="button"
			class="header-button about-btn"
			on:click={toggleAbout}
			aria-label="Toggle About Section">ABOUT</button
		>
		<button type="button" class="header-button next-button" on:click={goToNextProject}>Next</button>
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
	<About bind:showAbout />
</div>

<style>
	.container {
		min-height: 98vh;
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden; /* Verhindert Scrollen auf Containerebene */
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		padding: 1rem 2rem;
		z-index: 100; /* Höherer z-index, um sicherzustellen, dass er immer oben bleibt */
		background-color: #fff;
	}

	.header-button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		padding: 0;
		font-family: 'AlteHaas', 'Arial', sans-serif;
		text-transform: uppercase;
		z-index: 20;
	}

	.back-button {
		text-align: left;
	}

	.about-btn {
		text-align: center;
	}

	.next-button {
		text-align: right;
	}

	.footer {
		position: fixed; /* Wirklich fixiert, unabhängig vom Scrollen */
		bottom: 1rem;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		z-index: 100; /* Höher als andere Elemente */
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
		height: calc(100vh - 5rem); /* Platz für Header und Footer */
		max-width: 100%;
		overflow: hidden; /* Kein Overflow für den Container selbst */
	}

	.project-info {
		padding: 2rem;
		position: sticky; /* Sticky positionieren */
		top: 4rem; /* Abstand vom Header */
		height: calc(100vh - 8rem); /* Volle Höhe minus Header und Footer */
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow-y: hidden; /* Verhindert vertikales Scrollen */
		max-height: calc(100vh - 8rem); /* Maximale Höhe begrenzen */
	}

	.about-btn {
		font-family: 'AlteHaas', 'Arial', sans-serif;
	}

	.back-button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		text-align: left;
		padding: 0;
		z-index: 20;
		font-family: 'alteHaas', 'Arial', sans-serif;
		text-transform: uppercase;
	}

	.next-button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		text-align: right;
		padding: 0;
		z-index: 20;
		font-family: 'alteHaas', 'Arial', sans-serif;
		text-transform: uppercase;
	}

	.project-number {
		position: relative;
		font-size: 28px;
		font-family: 'Freight', serif;
		font-style: italic;
		font-weight: normal;
		padding-top: 6px;
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
		font-family: 'AlteHaas', 'Arial', sans-serif;
		letter-spacing: -0.02em;
	}

	.project-subtitle {
		font-size: 1.6rem;
		margin: -0.5rem 0 0rem;
		line-height: 1;
		font-family: 'FreightBook', 'Arial', sans-serif;
		/* letter-spacing: -0.01em; */
		font-weight: normal;
		font-style: italic;
	}

	.project-description p {
		font-size: 1.0625rem; /* 17px */
		line-height: 1.2;
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
		font-family: 'FreightBook', 'Arial', sans-serif;
		font-size: 1rem;
		background-color: #f2f2f2;
		padding: 0.25rem 0.5rem;
		border-radius: 3px;
		display: inline-block;
	}

	.project-images {
		overflow-y: auto; /* Nur hier Scrollbar erlauben */
		height: calc(100vh - 6rem); /* Anpassen an verfügbaren Platz */
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

	/* Responsive Design */
	@media (max-width: 768px) {
		.project-container {
			grid-template-columns: 1fr;
			height: auto; /* Wichtig: Auto-Höhe statt fester Höhe */
			overflow: visible; /* Erlaubt normales Scrollen */
			margin-bottom: 50px;
		}

		.project-info {
			position: relative; /* Statt sticky */
			height: auto;
			padding: 2rem 1rem;
			top: 0;
			max-height: none; /* Entferne Höhenbegrenzung */
			overflow-y: visible; /* Erlaube normales Scrollen */
		}

		.project-images {
			height: auto; /* Auto-Höhe statt fester Höhe */
			overflow-y: visible; /* Kein separates Scrollverhalten mehr */
			padding: 1.5rem;
		}

		.container {
			overflow-y: auto; /* Erlaube scrollen am Haupt-Container */
		}

		/* Header fixiert lassen */
		.header {
			position: fixed; /* Statt sticky */
			padding: 0.75rem 1.5rem;
			background-color: #fff;
		}
	}
</style>
