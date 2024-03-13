import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import VitePluginRestart from 'vite-plugin-restart';
import { viteStaticCopy } from 'vite-plugin-static-copy'

let vitePluginRestartOptions = {restart: ['./content/**']}

// This copies the content from the filesystem data folder to the static file location under '/data/' available at runtime.
let viteStaticCopyTargets = [{src: './content/*',dest: './content/'}]
let viteStaticCopyOptions = { targets: viteStaticCopyTargets}

export default defineConfig({
	plugins: [
		sveltekit(),		
		VitePluginRestart(vitePluginRestartOptions),
		viteStaticCopy(viteStaticCopyOptions)
	],

	// https://stackoverflow.com/questions/69260715/skipping-larger-chunks-while-running-npm-run-build
	build: {
        rollupOptions: {
            output:{
                manualChunks(id) {
					if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        },
		chunkSizeWarningLimit : 10_000

    }
});
