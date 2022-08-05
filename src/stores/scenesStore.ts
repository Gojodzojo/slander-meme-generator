import { writable, type Writable } from 'svelte/store';

export const PREUPLOADED_VIDEO_FILES = [
	'Ibai Llanos Explaining Things',      // https://youtu.be/zm3sJzjuJPQ
	'Black Man Crying',                   // https://youtu.be/c-g0ulv04qY
  'Walter White Breaks Down',           // https://youtu.be/tVcq0OyVZ_U
  'Giga Chad',                          // https://youtu.be/LY6YVQr94dE
  'FBI Open Up',                        // https://youtu.be/c46_iL2QqOE
  'Average Fan',                        // https://youtu.be/hILv_9kmRbA
  'Doug Walker Crying On The Computer', // https://youtu.be/ImkShoo_aqo
  'Woo Yeah Baby',                      // https://youtu.be/sAXZbfLzJUg
] as const;

export type PreuploadedVideoFilesType = typeof PREUPLOADED_VIDEO_FILES[number];

export interface TextSettings {
	text: string;
	fontSize: number;
	borderWidth: number;
}

export interface Scene {
	video: File | PreuploadedVideoFilesType;
	startTime: number;
	endTime: number;
	speed: number;
	topTextSettings: TextSettings;
	bottomTextSettings: TextSettings;
}

export const scenes: Writable<Scene[]> = writable([]);

export function createDefaultScene(): Scene {
	return {
		startTime: 0,
		endTime: 10,
		speed: 2,
		video: 'Ibai Llanos Explaining Things',
		topTextSettings: {
			fontSize: 50,
			text: '',
			borderWidth: 5
		},
		bottomTextSettings: {
			fontSize: 50,
			text: '',
			borderWidth: 5
		}
	};
}
