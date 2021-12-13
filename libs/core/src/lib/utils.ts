export const compilerOptions = () => ({
  moduleResolution: 'node',
  target: 'es2017',
  baseUrl: '.',
  experimentalDecorators: true,
  paths: {
    '@ngrx-ducks/core': ['./libs/core/src'],
  },
});
