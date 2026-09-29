import type { Tree } from '@nx/devkit';
import { migrateRemovedExecutors } from '@nx/devkit/internal';

export default function update(tree: Tree) {
  return migrateRemovedExecutors(
    tree,
    [
      '@nx/remix:build',
      '@nx/remix:serve',
      '@nrwl/remix:build',
      '@nrwl/remix:serve',
    ],
    async (tree, options) => {
      const { convertToInferred } =
        require('../../generators/convert-to-inferred/convert-to-inferred') as typeof import('../../generators/convert-to-inferred/convert-to-inferred');
      // The callback only prints the options the converter could not carry
      // over; migrateRemovedExecutors discards it.
      const flushLogs = await convertToInferred(tree, options);
      flushLogs();
    }
  );
}
