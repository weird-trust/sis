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

			<p><strong>Kontakt</strong></p>
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

			<p><strong>Website-Entwicklung</strong></p>
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
		z-index: 500;
	}

	.overlay-content {
		max-width: 900px;
	}

	h3 {
		font-family: 'Freight', 'Arial', sans-serif;
		font-size: 2rem;
		line-height: 0.9;
		margin-bottom: 1rem;
		font-weight: normal;
		font-style: italic;
	}

	p {
		font-family: 'AlteHaas', 'Arial', sans-serif;
		font-size: 1.0625rem; /* 17px */
		line-height: 1.2;
		margin-bottom: 1rem;
	}

	p strong {
		font-weight: normal;
		font-size: 1.0625rem;
		display: block;
		margin-bottom: 0.5rem;
	}

	a {
		color: inherit;
		text-decoration: underline;
	}

	.disclaimer {
		margin: 2rem 0;
	}

	.disclaimer p {
		font-size: 1.0625rem;
		margin-bottom: 1rem;
	}
</style>
