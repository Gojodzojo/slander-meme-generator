<script context="module" lang="ts">
	export enum MediaStatus {
		Ok,
		FileNotSelected
	}
</script>

<script lang="ts">
	import { Select, SelectItem, FileUploaderButton } from 'carbon-components-svelte';

	export let preuploadedFileNames: readonly string[];
	export let media: File | string; // One of preuploadedFileNames or a file
	export let status: MediaStatus = MediaStatus.Ok;
	export let mediaType: 'video' | 'music';
	export let acceptedFileTypes: string[];

	let selectedMediaType = typeof media === 'string' ? media : 'Custom file';

	function handleSelectionChange() {
		if (selectedMediaType === 'Custom file') {
			status = MediaStatus.FileNotSelected;
		} else {
			media = selectedMediaType;
			status = MediaStatus.Ok;
		}
	}

	function handleFileChange(e: CustomEvent<readonly File[]>) {
		media = e.detail[0];
		status = MediaStatus.Ok;
	}
</script>

<div class="file-selector">
	<Select
		labelText="Select {mediaType}"
		bind:selected={selectedMediaType}
		on:change={handleSelectionChange}
	>
		<SelectItem value="Custom file" text="Custom {mediaType}" />
		{#each preuploadedFileNames as fileName}
			<SelectItem value={fileName} text={fileName} />
		{/each}
	</Select>
	{#if selectedMediaType === 'Custom file'}
		<FileUploaderButton
			labelText="Select file"
			accept={acceptedFileTypes}
			on:change={handleFileChange}
		/>
	{/if}
</div>

<style>
	.file-selector {
		display: flex;
		align-items: flex-end;
	}

	.file-selector :global(.bx--btn) {
		margin-top: 24px;
		margin-left: 16px;
		height: 40px;
		max-width: 50%;
		overflow: hidden;
	}
</style>
