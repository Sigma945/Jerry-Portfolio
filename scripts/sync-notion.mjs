import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;
const OUTPUT_DIR = 'src/content/blog';
const IMAGES_DIR = 'public/images/blog';

if (!NOTION_TOKEN || !DATABASE_ID) {
  console.error('Missing NOTION_TOKEN or NOTION_DATABASE_ID env var');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

const plainText = (prop) => {
  if (!prop) return '';
  const arr = prop.title ?? prop.rich_text ?? [];
  return arr.map((t) => t.plain_text).join('');
};

const safeJson = (v) => JSON.stringify(v ?? '');

const buildFrontmatter = ({ title, description, date, tags }) => {
  const lines = ['---'];
  lines.push(`title: ${safeJson(title)}`);
  if (description) lines.push(`description: ${safeJson(description)}`);
  lines.push(`date: ${date}`);
  if (tags?.length) lines.push(`tags: ${JSON.stringify(tags)}`);
  lines.push('---');
  return lines.join('\n');
};

const guessExt = (url) => {
  const clean = url.split('?')[0].toLowerCase();
  const m = clean.match(/\.(png|jpe?g|gif|webp|svg|avif)$/);
  return m ? `.${m[1]}` : '.png';
};

const downloadImages = async (markdown, slug) => {
  const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const matches = [...markdown.matchAll(regex)].filter(([, , url]) => url.startsWith('http'));
  if (matches.length === 0) return markdown;

  const slugDir = path.join(IMAGES_DIR, slug);
  await fs.mkdir(slugDir, { recursive: true });

  let result = markdown;
  for (let i = 0; i < matches.length; i++) {
    const [full, alt, url] = matches[i];
    const filename = `${String(i + 1).padStart(2, '0')}${guessExt(url)}`;
    const filepath = path.join(slugDir, filename);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await fs.writeFile(filepath, buf);
      const newPath = `/images/blog/${slug}/${filename}`;
      result = result.replace(full, `![${alt}](${newPath})`);
      console.log(`    ↳ image: ${filename}`);
    } catch (err) {
      console.warn(`    ! image download failed (${url}): ${err.message}`);
    }
  }
  return result;
};

const queryAllPages = async () => {
  const pages = [];
  let cursor;
  do {
    const res = await notion.databases.query({
      database_id: DATABASE_ID,
      start_cursor: cursor,
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return pages;
};

const removeIfExists = async (filepath) => {
  try {
    await fs.unlink(filepath);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    throw err;
  }
};

const removeDirIfExists = async (dirpath) => {
  try {
    await fs.rm(dirpath, { recursive: true });
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    throw err;
  }
};

const run = async () => {
  console.log('Querying Notion database...');
  const pages = await queryAllPages();
  console.log(`Found ${pages.length} page(s) total\n`);

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  for (const page of pages) {
    const props = page.properties;
    const title = plainText(props.Title);
    const slug = plainText(props.Slug).trim();
    const status = props.Status?.select?.name;
    const date = props.Date?.date?.start;
    const description = plainText(props.Description);
    const tags = (props.Tags?.multi_select ?? []).map((t) => t.name);

    if (!slug) {
      console.warn(`  ! Skipping "${title}": missing Slug property`);
      continue;
    }

    const filepath = path.join(OUTPUT_DIR, `${slug}.md`);
    const imagesDir = path.join(IMAGES_DIR, slug);

    if (status !== 'Published') {
      const fileRemoved = await removeIfExists(filepath);
      const imagesRemoved = await removeDirIfExists(imagesDir);
      if (fileRemoved || imagesRemoved) {
        console.log(`✗ Unpublished: ${slug}.md  (status=${status ?? 'none'})`);
      }
      continue;
    }

    if (!date) {
      console.warn(`  ! Skipping "${title}": missing Date property`);
      continue;
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      console.warn(`  ! "${title}" has non-standard slug "${slug}" — use only a-z, 0-9, -`);
    }

    console.log(`→ ${slug}.md  (${title})`);
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const md = n2m.toMarkdownString(mdBlocks).parent ?? '';
    const finalMd = await downloadImages(md, slug);
    const fm = buildFrontmatter({ title, description, date, tags });
    await fs.writeFile(filepath, `${fm}\n\n${finalMd}\n`);
  }

  console.log('\nDone.');
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
