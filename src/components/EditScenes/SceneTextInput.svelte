<script lang="ts">
	import { TextInput, NumberInput } from 'carbon-components-svelte';
	import type { TextSettings } from '../../types/FilmData';

	export let textSettings: TextSettings;
	export let labelText: string;
	export let placeholder: string;
</script>

<div class="scene-text-input">
	<TextInput {labelText} {placeholder} />
	<div class="font-size-input-container">
		<NumberInput label="Font size" value={textSettings.fontSize} min={1} />
	</div>
</div>

<style>
	.scene-text-input {
		display: flex;
		margin-top: 16px;
	}

	.font-size-input-container {
		margin-left: 16px;
		width: 170px;
	}
</style>
