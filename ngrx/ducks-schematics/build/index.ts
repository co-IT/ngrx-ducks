import { clean, copy, npmRun } from './lib';

clean('./dist')
  .then(() => npmRun('tsc:prod'))
  .then(() =>
    copy([
      ['./assets/*', './dist'],
      ['./README.md', './dist'],
      ['./src/collection.json', './dist'],
      ['./src/**/schema.json', './dist'],
      ['./src/**/templates/**/*.ts', './dist']
    ])
  )
  .catch(err => {
    console.log(err);
    return process.exit(1);
  });
