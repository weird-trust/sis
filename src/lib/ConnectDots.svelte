<script>
	import { onMount } from 'svelte';

	let points = [
		{ x: 100, y: 100 },
		{ x: 200, y: 150 },
		{ x: 300, y: 200 },
		{ x: 400, y: 250 }
	];

	let lines = [];
	let isDrawing = false;

	function startDrawing(event) {
		isDrawing = true;
		lines = [{ x: event.clientX, y: event.clientY }];
	}

	function draw(event) {
		if (!isDrawing) return;
		const point = { x: event.clientX, y: event.clientY };
		lines = [...lines, point];
	}

	function stopDrawing() {
		isDrawing = false;
		checkCompletion();
	}

	function checkCompletion() {
		// Hier kannst du die Logik hinzufügen, um zu überprüfen, ob die Punkte korrekt verbunden sind.
		if (lines.length >= points.length) {
			console.log('Bild anzeigen!');
			showImage = true;
		}
	}

	let showImage = false;
	let canvas;
	let ctx;

	onMount(() => {
		ctx = canvas.getContext('2d');
	});

	$: if (lines.length > 1) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.moveTo(lines[0].x, lines[0].y);
		lines.forEach((point) => ctx.lineTo(point.x, point.y));
		ctx.stroke();
	}
</script>

<div class="container" on:mousedown={startDrawing} on:mousemove={draw} on:mouseup={stopDrawing}>
	{#each points as { x, y }}
		<div class="point" style="left: {x}px; top: {y}px;"></div>
	{/each}
	<canvas width="1000" height="1000" bind:this={canvas}></canvas>
	<img src="your-image-url.jpg" alt="Hidden Image" class:image={showImage} />
</div>

<style>
	.container {
		position: relative;
		width: 100vw;
		height: 100vh;
		background-color: #f0f0f0;
		overflow: hidden;
	}

	.point {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: black;
		border-radius: 50%;
	}

	canvas {
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
	}

	.image {
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.image.show {
		display: block;
	}
</style>
