<script lang="ts">
	export let showAbout: boolean = false;

	function toggleAbout(): void {
		showAbout = !showAbout;
	}
</script>

{#if showAbout}
	<div
		class="overlay"
		role="button"
		tabindex="0"
		on:click={toggleAbout}
		on:keydown={(e) => e.key === 'Enter' && toggleAbout()}
		aria-label="Close About Section"
	>
		<div class="overlay-content" on:click|stopPropagation>
			<h3>Madeleine Hahn - Editorial & Graphic Design</h3>
			<p>
				Madeleine Hahn ist eine freiberufliche Designerin aus Nürnberg mit dem Fokus auf Editorial-
				und Grafikdesign. Ihre Gestaltung basiert auf klaren Konzepten, durchdachter Typografie und
				dem gezielten Einsatz von Weißraum. Sie entwickelt Designs, die sowohl ästhetisch
				ansprechend als auch funktional sind und Inhalte präzise kommunizieren.
			</p>
			<p class="contact">
				Sag <a href="mailto:hallo@madeleinehahn.com">hallo@madeleinehahn.com</a>!
			</p>
		</div>
	</div>
{/if}

<style>
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
		font-family: 'Freight', 'Arial', sans-serif;
		font-size: 2rem;
		line-height: 0.9;
		margin-bottom: 1rem;
	}

	.overlay p {
		font-family: 'AlteHaas', 'Arial', sans-serif;
		font-size: 1.0625rem;
		line-height: 1.2;
		margin-bottom: 1rem;
	}

	.overlay .contact {
		margin-top: 2rem;
	}

	.overlay a {
		color: inherit;
		text-decoration: underline;
	}
</style>
