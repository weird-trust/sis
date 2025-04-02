import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { projects } from '$lib/projects/projects';

export const load: PageLoad = ({ params }) => {
	const id = parseInt(params.id);
	const project = projects.find((p) => p.id === id);

	if (!project) {
		throw error(404, 'Projekt nicht gefunden');
	}

	return {
		project
	};
};
