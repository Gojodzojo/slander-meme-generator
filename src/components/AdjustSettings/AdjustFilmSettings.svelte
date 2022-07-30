<script lang="ts">
	import { NumberInput, Select, SelectItem, TextInput } from 'carbon-components-svelte';
	import { filmSettings, OUTPUT_FILE_FORMATS } from '../../stores/filmSettingsStore';
</script>

<TextInput
	bind:value={$filmSettings.outputFileName}
	labelText="File name"
	placeholder="Enter file name..."
	class="file-name-input"
  invalid={!$filmSettings.outputFileName}
/>

<Select bind:selected={$filmSettings.outputFileFormat} labelText="File extension">
	{#each OUTPUT_FILE_FORMATS as format}
		<SelectItem text={format} value={format} />
	{/each}
</Select>

<NumberInput bind:value={$filmSettings.filmWidth} min={1} label={'Film width'} />

<NumberInput bind:value={$filmSettings.filmHeight} min={1} label={'Film height'} />
