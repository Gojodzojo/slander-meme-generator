<script lang="ts">
	import {
		type MusicSettings,
		type OutputFileFormatsType,
		OUTPUT_FILE_FORMATS
	} from '../../types/FilmData';
	import {
		Button,
		NumberInput,
		Select,
		SelectItem,
		TextInput,
		Tile
	} from 'carbon-components-svelte';
	import AdjustMusicSettings from './AdjustMusicSettings.svelte';
	import StepHeader from '../StepHeader.svelte';
	import { Step } from '../../routes/index.svelte';

	export let fileName: string;
	export let outputFileFormat: OutputFileFormatsType;
	export let musicSettings: MusicSettings;
	export let filmWidth: number;
	export let filmHeight: number;
	export let setStep: (newStep: Step) => void;
</script>

<div class="adjust-settings">
	<StepHeader>Adjust video settings</StepHeader>
	<Tile light class="settings-container">
		<TextInput
			bind:value={fileName}
			labelText="File name"
			placeholder="Enter file name..."
			class="file-name-input"
		/>
		<Select bind:selected={outputFileFormat} labelText="File extension">
			{#each OUTPUT_FILE_FORMATS as format}
				<SelectItem text={format} value={format} />
			{/each}
		</Select>
		<NumberInput bind:value={filmWidth} min={1} label={'Film width'} />
		<NumberInput bind:value={filmHeight} min={1} label={'Film height'} />
		<AdjustMusicSettings
			bind:music={musicSettings.music}
			bind:musicSpeed={musicSettings.speed}
		/>
	</Tile>
	<div class="step-buttons">
		<Button kind="secondary" on:click={() => setStep(Step.EditScenes)}>Go back</Button>
		<Button on:click={() => setStep(Step.RenderTheVideo)}>Next step</Button>
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
	}

	.step-buttons {
		margin-top: 16px;
		width: 100%;
		height: 64px;
	}

	.step-buttons :global(.bx--btn) {
		height: calc(100% - 2px);
		width: calc(50% - 4px);
		max-width: none;
	}
</style>
