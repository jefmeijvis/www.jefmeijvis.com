import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		prerender : 
		{
			entries : [
				"/api/posts", 
				"/demo", 
				"/api/github", 
				"/post/001-csharp-extension-methods",
				"/post/002-multiple-teams-instances",
				"/post/003-azure-functions-getting-started",
				"/post/004-azure-functions-triggers-and-bindings",
				"/post/005-chat-application",
				"/post/006-sveltekit-api-endpoints",
				"/blog/001-csharp-extension-methods", 
				"/blog/002-managing-multiple-teams-instances",
				"/blog/003-azure-functions-part-1-getting-started",
				"/blog/004-azure-functions-part-2-triggers-and-bindings", 
				"/blog/005-creating-a-chat-component-with-svelte",
				"/blog/006-sveltekit-api-endpoints",
				"/blog/007-azure-application-insights",
			]
		}
	}
};

export default config;