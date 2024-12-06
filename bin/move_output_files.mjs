import { opendir, rename, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';

try {
  const old_root_path = resolve(import.meta.dirname, '..', 'client', 'build');
  const new_root_path = resolve(import.meta.dirname, '..', 'public');

  const dir = await opendir(old_root_path, { recursive: true });
  for await (const dirent of dir) {
    if (dirent.isDirectory()) continue;
    console.log('Moving', `${dirent.name}...`);
    const old_file_path = join(dirent.parentPath, dirent.name);
    const new_path = old_file_path.replace(old_root_path, new_root_path);
    await rm(new_path, { force: true });
    await rename(old_file_path, new_path);
  }
} catch (err) {
  console.error('Failed to copy the output files:');
  console.error(err.message || err);
}
