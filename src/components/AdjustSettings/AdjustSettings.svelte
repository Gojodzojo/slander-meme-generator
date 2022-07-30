<script lang="ts">
	import { Button, Tile } from 'carbon-components-svelte';
	import AdjustMusicSettings from './AdjustMusicSettings.svelte';
	import StepHeader from '../StepHeader.svelte';
	import { currentStep, Step } from '../../stores/stepStore';
	import AdjustFilmSettings from './AdjustFilmSettings.svelte';
	import { filmSettings } from '../../stores/filmSettingsStore';
	import { musicSettings } from '../../stores/musicSettingsStore';

	$: canGoToNextStep =
		$filmSettings.filmWidth !== null &&
		$filmSettings.filmWidth > 0 &&
		$filmSettings.filmHeight !== null &&
		$filmSettings.filmHeight > 0 &&
		$musicSettings.speed !== null &&
		$musicSettings.speed > 0 &&
		$filmSettings.outputFileName !== '';

	function previousStep() {
		$currentStep = Step.EditScenes;
	}

	function nextStep() {
		$currentStep = Step.RenderTheVideo;
	}
</script>

<div class="adjust-settings">
	<StepHeader>Adjust video settings</StepHeader>

	<Tile light class="settings-container">
		<AdjustFilmSettings />
		<AdjustMusicSettings />
	</Tile>

	<div class="step-buttons">
		<Button kind="secondary" on:click={previousStep}>Go back</Button>
		<Button disabled={!canGoToNextStep} on:click={nextStep}>Next step</Button>
	</div>
</div>

<style>
	.adjust-settings {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.adjust-settings :global(.bx--form-item) {
		margin-bottom: 16px;
	}

	.adjust-settings :global(.settings-container) {
		flex-grow: 1;
		overflow: auto;
	}

	.adjust-settings :global(.settings-container::-webkit-scrollbar) {
		width: 10px;
	}

	.adjust-settings :global(.settings-container::-webkit-scrollbar-thumb) {
		background-color: #aaaaaa;
	}

	.step-buttons {
		margin-top: 16px;
		width: 100%;
		height: 64px;
	}

	.step-buttons :global(.bx--btn) {
		height: calc(100% - 2px);
		width: calc(50% - 2px);
		max-width: none;
	}
</style>
