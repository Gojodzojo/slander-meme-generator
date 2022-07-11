<script lang="ts">
	import { createDefaultScene, type Scene } from '../../types/FilmData';
	import ScenesListElement from './ScenesListElement.svelte';
	import { Button } from 'carbon-components-svelte';

	export let scenes: Scene[];

	function addScene() {
		scenes = [...scenes, createDefaultScene()];
	}

	function deleteScene(scene: Scene) {
		return () => (scenes = scenes.filter((s) => s !== scene));
	}
</script>

<div class="edit-scenes">
	{#each scenes as scene, sceneIndex (scene)}
		<ScenesListElement
			bind:video={scene.video}
			bind:videoSpeed={scene.speed}
			bind:videoStartTime={scene.startTime}
			bind:videoEndTime={scene.endTime}
			bind:topTextSettings={scene.topTextSettings}
			bind:bottomTextSettings={scene.bottomTextSettings}
			sceneNumber={sceneIndex + 1}
			deleteScene={deleteScene(scene)}
		/>
	{/each}
	<Button class="add-scene-button" on:click={addScene}>Add scene</Button>
</div>

<style>
	.edit-scenes {
		width: 100%;
		height: 100%;
	}

	.edit-scenes :global(.add-scene-button) {
		width: 100%;
		max-width: none;
		margin-bottom: 16px;
	}
</style>
