local utils = import 'utils.libjsonnet';

{
  project_type: 'typescript',
  keep_dist: true,
  want_man: true,
  project_name: 'itunes-clear-orphaned',
  version: '0.0.5',
  description: 'Utility to remove orphaned files from iTunes/Music library.',
  keywords: ['applescript', 'facetime', 'jxa', 'macos', 'notifications', 'typescript'],
  copilot+: {
    intro: 'itunes-clear-orphaned is a script to remove orphaned files from the library.',
  },
  // TypeScript only
  package_json+: {
    bin: './dist/index.js',
    devDependencies+: {
      'jxa-lib': utils.latestNpmPackageVersionCaret('jxa-lib'),
      'jxa-types': utils.latestNpmPackageVersionCaret('jxa-types'),
      'ts-loader': utils.latestNpmPackageVersionCaret('ts-loader'),
      'webpack-cli': utils.latestNpmPackageVersionCaret('webpack-cli'),
      'webpack-shebang-plugin': utils.latestNpmPackageVersionCaret('webpack-shebang-plugin'),
      webpack: utils.latestNpmPackageVersionCaret('webpack'),
    },
    files+: ['dist/index.js', 'dist/index.js.map'],
    main: 'dist/index.js',
  },
  eslint+: [{ rules: { '@typescript-eslint/no-unused-expressions': 'off' } }],
  tsconfig+: {
    compilerOptions+: {
      emitDecoratorMetadata: true,
      lib: ['es2018'],
      newLine: 'LF',
      noEmitOnError: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      outDir: './dist/',
      strict: true,
      strictBindCallApply: true,
      strictFunctionTypes: false,
      strictNullChecks: true,
      strictPropertyInitialization: true,
      target: 'es2018',
      types: ['jxa-types', 'node'],
    },
    include: ['src'],
  },
}
