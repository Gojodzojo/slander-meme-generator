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
		<div class="output-file-settings">
			<TextInput bind:value={fileName} labelText="File name" placeholder="Enter file name..." />
			<div class="extension-input-container">
				<Select bind:selected={outputFileFormat} labelText="File extension">
					{#each OUTPUT_FILE_FORMATS as format}
						<SelectItem text={format} value={format} />
					{/each}
				</Select>
			</div>
		</div>
		<NumberInput bind:value={filmWidth} min={1} label={'Film width'} />
		<NumberInput bind:value={filmHeight} min={1} label={'Film height'} />
		<AdjustMusicSettings bind:music={musicSettings.music} />
	</Tile>
</div>

<style>
	.adjust-settings {
		width: 100%;
		height: 100%;
	}
</style>
