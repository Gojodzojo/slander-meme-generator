<script lang="ts">
	import { Button, Tile } from 'carbon-components-svelte';
	import { defaultMusicSettings, musicSettings } from '../../stores/musicSettingsStore';
	import { scenes } from '../../stores/scenesStore';
	import { currentStep, Step } from '../../stores/stepStore';
	import { defaultFilmSettings, filmSettings } from '../../stores/filmSettingsStore';
	import { videoSrc } from '../../stores/videoSrcStore';
	import StepHeader from '../StepHeader.svelte';

	$: outputFileName = $filmSettings.outputFileName + '.' + $filmSettings.outputFileFormat;

	function previousStep() {
		$currentStep = Step.RenderTheVideo;
	}

	function statFromBeginning() {
		$filmSettings = defaultFilmSettings();
		$musicSettings = defaultMusicSettings();
		$scenes = [];
		$videoSrc = '';
		$currentStep = Step.EditScenes;
	}
</script>

<div class="download-the-video">
	<StepHeader>Download the video</StepHeader>

	<Tile light class="actions">
		<h1>Congratulations!</h1>
		<br />

		<p>You have successfully generated your slander meme video.</p>
		<p>Click the first button to download it.</p>
		<br />

		<p>If you found this app usefull you can support me by clicking the second button.</p>
		<br />

		<div class="action-btns">
			<Button href={$videoSrc} download={outputFileName}>Download the video</Button>
			<Button
				href="https://www.buymeacoffee.com/mateuszgoik"
				target="_blank"
				rel="noopener noreferrer"
			>
				Buy me a coffee
			</Button>
		</div>
	</Tile>
	<div class="step-buttons">
		<Button kind="secondary" on:click={previousStep}>Go back</Button>
		<Button on:click={statFromBeginning}>Start from beginning</Button>
	</div>
</div>

<style>
	.download-the-video {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.download-the-video :global(.actions) {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.action-btns :global(.bx--btn) {
		width: 210px;
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
