<!-- markdownlint-configure-file {"MD024": { "siblings_only": true } } -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.7] - 2026-05-02

### Fixed

- Ship the webpack-bundled `dist/index.js` (with the CLI shebang) to NPM and GitHub Releases
  instead of the per-file TypeScript-compiler output produced by an incorrect build step in the
  publish and upload workflows.

## [0.0.6] - 2026-05-02

### Added

- Attach the built CLI as a downloadable `itunes-clear-orphaned` asset on each GitHub Release.

## [0.0.3]

First tagged version.

[unreleased]: https://github.com/Tatsh/itunes-clear-orphaned/compare/v0.0.7...HEAD
[0.0.7]: https://github.com/Tatsh/itunes-clear-orphaned/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/Tatsh/itunes-clear-orphaned/compare/v0.0.5...v0.0.6
[0.0.3]: https://github.com/Tatsh/itunes-clear-orphaned/releases/tag/v0.0.3
