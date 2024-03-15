import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		prerender : 
		{
			entries : 
			[
				// Error page as required by Vercel
				"/404",

				// List of all old blogposts before migration to the new content system. 
				// Theses links still exist in the open internet so they are created for backward compatibility
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
