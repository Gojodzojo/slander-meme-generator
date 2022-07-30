<script lang="ts">
	import { createDefaultScene, scenes, type Scene } from '../../stores/scenesStore';
	import ScenesListElement from './ScenesListElement.svelte';
	import { Button } from 'carbon-components-svelte';
	import StepHeader from '../StepHeader.svelte';
	import { currentStep, Step } from '../../stores/stepStore';

  $: validScenes = $scenes.map(({speed, startTime, endTime}) => {
    return speed !== null && speed !== 0 && startTime !== null && endTime !== null
  })
  $: areAllScenesValid = !validScenes.some(s => !s)
	$: canGoToNextStep = $scenes.length !== 0 && areAllScenesValid;

	function addScene() {
		$scenes = [...$scenes, createDefaultScene()];
	}

	function deleteScene(scene: Scene) {
		return () => ($scenes = $scenes.filter((s) => s !== scene));
	}

	function nextStep() {
		$currentStep = Step.AdjustSettings;
	}
</script>

<div class="edit-scenes">
	<StepHeader>Add and edit scenes</StepHeader>
	<div class="scenes-list">
		{#each $scenes as scene, sceneIndex (scene)}
			<ScenesListElement
				bind:video={scene.video}
				bind:videoSpeed={scene.speed}
				bind:videoStartTime={scene.startTime}
				bind:videoEndTime={scene.endTime}
				bind:topTextSettings={scene.topTextSettings}
				bind:bottomTextSettings={scene.bottomTextSettings}
				sceneNumber={sceneIndex + 1}
				deleteScene={deleteScene(scene)}
        hasError={!validScenes[sceneIndex]}
			/>
		{/each}

		<Button kind="secondary" class="full-width-button" on:click={addScene}>Add scene</Button>
	</div>
	<Button class="full-width-button" on:click={nextStep} disabled={!canGoToNextStep}>Next</Button>
</div>

<style>
	.edit-scenes {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.edit-scenes :global(.full-width-button) {
		width: 100%;
		max-width: none;
		height: 64px;
	}

	.scenes-list {
		flex-grow: 1;
		overflow: auto;
		margin-bottom: 16px;
	}

	.scenes-list::-webkit-scrollbar {
		width: 20px;
	}

	.scenes-list::-webkit-scrollbar-thumb {
		border-left: 10px #262626 solid;
		background-color: #aaaaaa;
	}
</style>
