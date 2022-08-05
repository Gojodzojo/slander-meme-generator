<script lang="ts">
	import { Loading, NumberInput } from 'carbon-components-svelte';
	import { getMusicFile } from '../../scripts/fileGetters';
	import { PREUPLOADED_MUSIC_FILES, musicSettings } from '../../stores/musicSettingsStore';
	import MediaSelector, { MediaStatus } from '../MediaSelector.svelte';
	import MusicPreview from './MusicPreview.svelte';

	let musicFileStatus: MediaStatus = MediaStatus.Ok;
</script>

<div class="music-settings">
	<MediaSelector
		bind:media={$musicSettings.music}
		bind:status={musicFileStatus}
		mediaType="music"
		acceptedFileTypes={['audio/*']}
		preuploadedFileNames={PREUPLOADED_MUSIC_FILES}
	/>
	<div class="music-controls">
		{#if musicFileStatus === MediaStatus.FileNotSelected}
			Please select a file
		{:else}
			{#await getMusicFile($musicSettings.music)}
				<Loading withOverlay={false} />
			{:then musicFile}
				<div style="width:100%; height: 100%;">
					<MusicPreview {musicFile} />
					<NumberInput
						bind:value={$musicSettings.speed}
						label="Music speed"
						step={0.1}
						min={0.5}
					/>
				</div>
			{/await}
		{/if}
	</div>
</div>

<style>
	.music-controls {
		width: 100%;
		height: 136px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.music-controls :global(.bx--form-item) {
		margin-top: 16px;
		margin-bottom: 0 !important;
	}
</style>
