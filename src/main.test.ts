import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { ItunesHelper } from 'jxa-lib';
import main from './main';

vi.mock('jxa-lib', () => {
  return {
    ItunesHelper: vi.fn(),
  };
});

const mockDelete = vi.fn();
const mockTrack = (name: string | undefined, location: { path: string } | undefined | null) => ({
  name: vi.fn(() => {
    if (name === undefined) throw new Error('No name');
    return name;
  }),
  location: vi.fn(() => location),
  delete: mockDelete,
});

const mockFileTracks = [
  mockTrack('Song 1', { path: '/music/song1.mp3' }),
  mockTrack('Song 2', undefined),
  mockTrack(undefined, { path: '/music/song3.mp3' }),
  mockTrack('Song 4', null),
];

const mockExists = vi.fn(
  (loc: { path?: string } | undefined | null) => loc && loc.path === '/music/song1.mp3',
);

const mockFinder = () => ({
  exists: mockExists,
});

const mockMusicApp = {};

global.Application = vi.fn((name: string) => {
  if (name === 'Finder') return mockFinder();
  if (name === 'Music') return mockMusicApp;
  return {};
}) as unknown as typeof global.Application;

(ItunesHelper as Mock).mockImplementation(function (this: { fileTracks: typeof mockFileTracks }) {
  this.fileTracks = mockFileTracks;
});

describe('main', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.log as Mock).mockRestore();
  });

  it('removes orphaned tracks and logs removals', () => {
    main();
    expect(mockDelete).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith('Removing Song 2');
    expect(console.log).toHaveBeenCalledWith('Removing Song 4');
  });

  it('returns 0', () => {
    expect(main()).toBe(0);
  });
});
