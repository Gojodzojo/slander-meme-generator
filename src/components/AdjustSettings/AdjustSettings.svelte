<script lang="ts">
	import {
		type MusicSettings,
		type OutputFileFormatsType,
		OUTPUT_FILE_FORMATS
	} from '../../types/FilmData';
	import { Select, SelectItem, TextInput, Tile } from 'carbon-components-svelte';
	import AdjustMusicSettings from './AdjustMusicSettings.svelte';

	export let fileName: string;
	export let outputFileFormat: OutputFileFormatsType;
	export let musicSettings: MusicSettings;
</script>

<div class="adjust-settings">
	<Tile light>
		<div class="output-file-settings">
			<TextInput bind:value={fileName} labelText="File name" placeholder="Enter file name..." />
			<div class="extension-input-container">
				<Select bind:value={outputFileFormat} labelText="File extension">
					{#each OUTPUT_FILE_FORMATS as format}
						<SelectItem text={format} value={format} />
					{/each}
				</Select>
			</div>
		</div>
		<AdjustMusicSettings
			bind:music={musicSettings.music}
			bind:startTime={musicSettings.startTime}
			bind:endTime={musicSettings.endTime}
		/>
	</Tile>
</div>

<style>
	.adjust-settings {
		width: 100%;
		height: 100%;
	}
</style>
