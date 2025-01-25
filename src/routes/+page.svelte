<script>
	import ConnectDots from '../lib/ConnectDots.svelte';
	let showAbout = false;

	function toggleAbout() {
		showAbout = !showAbout;
	}
</script>

<div class="container">
	<button type="button" on:click={toggleAbout} aria-label="Toggle About Section">ABOUT</button>
	<div>
		<h1>MADELEINE HAHN</h1>
		<h2>Editorial und Graphic Design</h2>
	</div>
	<p class="impressum">IMPRESSUM</p>

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

<!-- <ConnectDots /> -->

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
	}

	h1 {
		font-size: 3em;
		margin: 0;
		letter-spacing: -0.05em;
	}

	h2,
	h3 {
		font-size: 1.5em;
		margin: 0;
		font-weight: normal;
	}

	h2 {
		font-style: italic;
	}

	p {
		font-size: 1.5em;
		margin: 0;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(12, 124, 210, 0.8);
		color: white;
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
