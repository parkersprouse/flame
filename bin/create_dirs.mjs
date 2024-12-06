import { O_CREAT } from 'node:constants';
import { mkdir, open } from 'node:fs/promises';
import { resolve } from 'node:path';

try {
  const data_path = resolve(import.meta.dirname, '..', 'data');
  await mkdir(data_path);
} catch (err) {
  console.error('Failed to create "data" directory:');
  console.error(err.message || err);
}

const public_path = resolve(import.meta.dirname, '..', 'public');

try {
  const icons_path = resolve(public_path, 'icons');
  await mkdir(icons_path, { recursive: true });
} catch (err) {
  console.error('Failed to create "public/icons" directory:');
  console.error(err.message || err);
}

try {
  const css_path = resolve(public_path, 'static', 'css');
  await mkdir(css_path, { recursive: true });
} catch (err) {
  console.error('Failed to create "public/static/css" directory:');
  console.error(err.message || err);
}

try {
  const js_path = resolve(public_path, 'static', 'js');
  await mkdir(js_path, { recursive: true });
} catch (err) {
  console.error('Failed to create "public/static/js" directory:');
  console.error(err.message || err);
}

try {
  const media_path = resolve(public_path, 'static', 'media');
  await mkdir(media_path, { recursive: true });
} catch (err) {
  console.error('Failed to create "public/static/media" directory:');
  console.error(err.message || err);
}

try {
  const flame_css_file_path = resolve(public_path, 'flame.css');
  const flame_css_file = await open(flame_css_file_path, O_CREAT);
  await flame_css_file.close();
} catch (err) {
  console.error('Failed to touch "public/flame.css" file:');
  console.error(err.message || err);
}

try {
  const custom_queries_file_path = resolve(public_path, 'customQueries.json');
  const custom_queries_file = await open(custom_queries_file_path, O_CREAT);
  await custom_queries_file.close();
} catch (err) {
  console.error('Failed to touch "public/customQueries.json" file:');
  console.error(err.message || err);
}
