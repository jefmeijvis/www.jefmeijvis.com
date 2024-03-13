import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender : 
		{
			entries : 
			[
				"/post/001-csharp-extension-methods",
				"/post/002-multiple-teams-instances",
				"/post/003-azure-functions-getting-started",
				"/post/004-azure-functions-triggers-and-bindings",
				"/post/005-chat-application",
				"/post/006-sveltekit-api-endpoints"
			]
			}
	}
};

export default config;
