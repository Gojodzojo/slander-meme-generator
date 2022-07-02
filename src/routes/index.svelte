<script lang="ts">
	import 'carbon-components-svelte/css/g100.css';
	import { Button } from 'carbon-components-svelte';
	import { Tile } from 'carbon-components-svelte';
	import { createDefaultFilmData, type FilmData } from 'src/types/FilmData';

	const filmData: FilmData = createDefaultFilmData();
</script>

<svelte:head>
	<title>Slander meme generator</title>
</svelte:head>

<main>
	<span class="title">Slander meme generator</span>
	<div class="step-buttons">
		<Button>1. Add scenes</Button>
		<Button>2. Pick the music</Button>
		<Button>3. Download the file</Button>
	</div>
	<div class="step-container">
		<Tile class="step" />
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

	:global(body) {
		margin: 0;
		height: 100vh;
		width: 100vw;
	}

	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.title {
		font-family: 'Playfair Display', serif;
		font-size: 8vmin;
		margin: 5vh 0;
		display: block;
	}

	.step-buttons {
		display: flex;
		width: calc(100% - 40px);
		max-width: 700px;
		justify-content: space-between;
	}

	:global(.step-buttons > button) {
		width: calc((100% - 40px) / 3);
	}

	.step-container {
		width: 100vw;
		min-height: 0; /* https://stackoverflow.com/q/36247140/3597276 */
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	:global(.step) {
		height: calc(100% - 40px);
		width: calc(100% - 40px);
		max-width: 700px;
	}
</style>
