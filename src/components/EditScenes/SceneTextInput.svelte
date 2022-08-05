<script lang="ts">
	import { TextInput, NumberInput } from 'carbon-components-svelte';

	export let fontSize: number;
	export let text: string;
	export let labelText: string;
	export let placeholder: string;
  export let borderWidth: number
</script>

<div class="scene-text-input">
	<TextInput bind:value={text} {labelText} {placeholder} />
	<NumberInput label="{labelText} font size" bind:value={fontSize} min={1} />
	<NumberInput label="{labelText} border width" bind:value={borderWidth} min={1} />
</div>

<style>
	/*.scene-text-input {
		margin-top: 16px;
	}
  */
</style>
