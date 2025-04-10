<script lang="ts">
	export let showImpressum = false;

	function closeImpressum() {
		showImpressum = false;
	}
</script>

{#if showImpressum}
	<div
		class="overlay"
		role="button"
		tabindex="0"
		on:click={closeImpressum}
		on:keydown={(e) => e.key === 'Enter' && closeImpressum()}
	>
		<div
			class="overlay-content"
			on:click|stopPropagation
			role="dialog"
			aria-labelledby="impressum-title"
		>
			<h3 id="impressum-title">IMPRESSUM</h3>

			<h5>Kontakt</h5>
			<p>E-Mail: <a href="mailto:hallo@madeleinehahn.com">hallo@madeleinehahn.com</a></p>
			<p>
				Instagram: <a
					href="https://instagram.com/mh.files"
					target="_blank"
					rel="noopener noreferrer">mh.files</a
				>
			</p>

			<div class="disclaimer">
				<p>
					Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für deren Richtigkeit,
					Vollständigkeit und Aktualität übernehme ich jedoch keine Haftung.
				</p>
				<p>
					Alle Inhalte dieser Website unterliegen dem deutschen Urheberrecht. Jegliche Nutzung oder
					Vervielfältigung bedarf meiner schriftlichen Zustimmung.
				</p>
			</div>

			<h5>Website-Entwicklung</h5>
			<p>
				Programmierung: <a
					href="https://robertburtzik.com"
					target="_blank"
					rel="noopener noreferrer">Robert Burtzik</a
				>
			</p>
			<p>Design: Madeleine Hahn</p>
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

	h3 {
		font-family: 'AlteHaas', 'Arial', sans-serif;
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
	}

	h5 {
		font-family: 'AlteHaas', 'Arial', sans-serif;
		font-size: 1rem;
		margin: 1.5rem 0 0.5rem;
		font-weight: bold;
	}

	p {
		font-family: 'AlteHaas', 'Arial', sans-serif;
		font-size: 1.0625rem; /* 17px */
		line-height: 1.6;
		margin-bottom: 0.5rem;
	}

	a {
		color: inherit;
		text-decoration: underline;
	}

	.disclaimer {
		margin: 1.5rem 0;
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.disclaimer p {
		font-size: 0.9rem;
		margin-bottom: 0.75rem;
	}
</style>
