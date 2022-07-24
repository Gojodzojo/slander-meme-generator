<script lang="ts">
	import {
		type MusicSettings,
		type OutputFileFormatsType,
		OUTPUT_FILE_FORMATS
	} from '../../types/FilmData';
	import { NumberInput, Select, SelectItem, TextInput, Tile } from 'carbon-components-svelte';
	import AdjustMusicSettings from './AdjustMusicSettings.svelte';

	export let fileName: string;
	export let outputFileFormat: OutputFileFormatsType;
	export let musicSettings: MusicSettings;
	export let filmWidth: number;
	export let filmHeight: number;
</script>

<div class="adjust-settings">
	<Tile light>
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
</div>

<style>
	.adjust-settings {
		width: 100%;
		height: 100%;
	}

	.adjust-settings :global(.bx--form-item) {
		margin-bottom: 16px;
	}
</style>
