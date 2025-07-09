local defaults = import 'defaults.libjsonnet';

defaults {
  local top = self,
  // General settings
  project_type: 'typescript',
  keep_dist: true,
  want_man: true,

  // Shared
  github_username: 'Tatsh',
  security_policy_supported_versions: { '0.0.x': ':white_check_mark:' },
  authors: [
    {
      'family-names': 'Udvare',
      'given-names': 'Andrew',
      email: 'audvare@gmail.com',
      name: '%s %s' % [self['given-names'], self['family-names']],
    },
  ],
  project_name: 'itunes-clear-orphaned',
  version: '0.0.4',
  description: 'Utility to remove orphaned files from iTunes/Music library.',
  keywords: ['applescript', 'facetime', 'jxa', 'macos', 'notifications', 'typescript'],
  copilot: {
    intro: 'itunes-clear-orphaned is a script to remove orphaned files from the library.',
  },
  social+: {
    mastodon+: { id: '109370961877277568' },
  },

  // GitHub
  github+: {
    funding+: {
      ko_fi: 'tatsh2',
      liberapay: 'tatsh2',
      patreon: 'tatsh2',
    },
  },

  // TypeScript only
  package_json+: {
    bin: './dist/index.js',
    devDependencies+: {
      '@types/node': '^24.0.10',
      'jxa-lib': '^0.1.7',
      'jxa-types': '^0.0.6',
      'ts-loader': '^9.5.2',
      'webpack-cli': '^6.0.1',
      'webpack-shebang-plugin': '^1.1.8',
      webpack: '^5.99.9',
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
