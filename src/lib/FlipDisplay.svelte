<script lang="ts">
	import { onMount } from 'svelte';
	import { projects } from '$lib/projects/projects';

	export let finalText = 'Madeleine Hahn';
	let displayText = '';
	let isAnimating = true;

	// Speichern, ob die Animation bereits ausgeführt wurde
	// Verwenden einer sessionStorage Variable, damit die Animation
	// nur einmal pro Browsersitzung läuft
	const animationKey = 'flipAnimationCompleted';
	let skipAnimation = false;

	const chars =
		'ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyzZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';

	// Projektitel vorbereiten (alle in Großbuchstaben)
	const projectTitles = projects.map((p) => p.title.toUpperCase());
	// Wir fügen den finalen Text am Ende hinzu
	projectTitles.push(finalText);

	onMount(() => {
		// Prüfen, ob die Animation bereits abgeschlossen wurde
		if (typeof window !== 'undefined') {
			skipAnimation = sessionStorage.getItem(animationKey) === 'true';

			if (skipAnimation) {
				// Animation überspringen und sofort finalen Text anzeigen
				displayText = finalText;
				isAnimating = false;
			} else {
				// Animation nur beim ersten Laden starten
				startAnimation();
			}
		} else {
			// Fallback für SSR
			startAnimation();
		}
	});

	async function startAnimation() {
		// Starttext setzen
		displayText = createRandomText(finalText.length);

		// Jeden Projekttitel durchlaufen und anzeigen
		for (let projectIndex = 0; projectIndex < projectTitles.length; projectIndex++) {
			const targetText = projectTitles[projectIndex];

			// Text animieren
			await animateToText(targetText);

			// Pause zwischen den Titeln (verkürzt für schnellere Animation)
			if (projectIndex < projectTitles.length - 1) {
				await new Promise((resolve) => setTimeout(resolve, 400));
			}
		}

		// Animation beenden und als abgeschlossen markieren
		isAnimating = false;

		// In sessionStorage speichern, dass die Animation abgeschlossen wurde
		if (typeof window !== 'undefined') {
			sessionStorage.setItem(animationKey, 'true');
		}
	}

	// Generiert zufälligen Text mit der angegebenen Länge
	function createRandomText(length: number): string {
		return Array(length)
			.fill(0)
			.map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
			.join('');
	}

	// Animiert den aktuellen Text zum Zieltext
	async function animateToText(targetText: string): Promise<void> {
		// Maximale Länge bestimmen und mit Leerzeichen auffüllen
		const maxLength = Math.max(displayText.length, targetText.length);
		let currentText = displayText.padEnd(maxLength, ' ');
		let target = targetText.padEnd(maxLength, ' ');

		// Startpunkt für die Animation in der Mitte
		const middle = Math.floor(maxLength / 2);
		const animationSequence = createAnimationSequence(maxLength, middle);

		// Jedes Zeichen gemäß der Sequenz animieren
		for (const position of animationSequence) {
			// Wenn das aktuelle Zeichen bereits dem Ziel entspricht, überspringen
			if (currentText[position] === target[position]) continue;

			// Zeichen animieren
			await spinCharacter(position, target[position]);
		}

		// Sicherstellen, dass am Ende der exakte Zieltext angezeigt wird
		displayText = targetText;
	}

	// Erstellt eine Sequenz, die von der Mitte nach außen geht
	function createAnimationSequence(length: number, middle: number): number[] {
		const sequence = [];

		// Zuerst die Mitte
		sequence.push(middle);

		// Dann abwechselnd links und rechts von der Mitte
		for (let i = 1; i <= middle; i++) {
			if (middle - i >= 0) sequence.push(middle - i);
			if (middle + i < length) sequence.push(middle + i);
		}

		return sequence;
	}

	// Dreht ein einzelnes Zeichen an Position i zum Zielzeichen
	async function spinCharacter(position: number, targetChar: string): Promise<void> {
		// Zeichen an dieser Position extrahieren
		let currentChar = displayText[position];

		// Wenn bereits das Zielzeichen, nichts tun
		if (currentChar === targetChar) return;

		// Geschwindigkeit des Flipping-Effekts
		const flipsPerChar = 2; // Reduziert für schnellere Animation
		const flipTime = 30; // in Millisekunden, schneller als zuvor

		for (let flip = 0; flip < flipsPerChar; flip++) {
			// Zufälliges Zeichen wählen (für den Flip-Effekt)
			const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));

			// Text aktualisieren
			displayText =
				displayText.substring(0, position) + randomChar + displayText.substring(position + 1);

			// Kurze Pause
			await new Promise((resolve) => setTimeout(resolve, flipTime));
		}

		// Final das Zielzeichen setzen
		displayText =
			displayText.substring(0, position) + targetChar + displayText.substring(position + 1);
	}
</script>

{#if isAnimating}
	<span class="flip-display">{displayText}</span>
{:else}
	<slot>{finalText}</slot>
{/if}

<style>
	.flip-display {
		font-family: 'AlteHaas', 'Arial', sans-serif;
		letter-spacing: -0.05em;
	}
</style>
