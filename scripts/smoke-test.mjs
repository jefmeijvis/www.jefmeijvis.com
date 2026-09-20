import { access, readFile } from 'node:fs/promises';

const requiredPages = [
  'build/index.html',
  'build/blog.html',
  'build/about.html',
  'build/rss.xml'
];

const articleDirectories = (await import('node:fs/promises')).readdir('content', { withFileTypes: true });
for (const entry of await articleDirectories) {
  if (entry.isDirectory()) requiredPages.push(`build/blog/${entry.name}.html`);
}

for (const page of requiredPages) await access(page);

const article = await readFile('build/blog/001-csharp-extension-methods.html', 'utf8');
if (!article.includes('Csharp extension methods')) throw new Error('Article content was not rendered.');

console.log(`Smoke test passed (${requiredPages.length} generated pages).`);
