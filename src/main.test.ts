import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import main from './main';
import { ItunesHelper } from 'jxa-lib';

jest.mock('jxa-lib', () => {
  return {
    ItunesHelper: jest.fn(),
  };
});

const mockDelete = jest.fn();
const mockTrack = (name: string | undefined, location: { path: string } | undefined | null) => ({
  name: jest.fn(() => {
    if (name === undefined) throw new Error('No name');
    return name;
  }),
  location: jest.fn(() => location),
  delete: mockDelete,
});

const mockFileTracks = [
  mockTrack('Song 1', { path: '/music/song1.mp3' }),
  mockTrack('Song 2', undefined),
  mockTrack(undefined, { path: '/music/song3.mp3' }),
  mockTrack('Song 4', null),
];

const mockExists = jest.fn(
  (loc: { path?: string } | undefined | null) => loc && loc.path === '/music/song1.mp3',
);

const mockFinder = () => ({
  exists: mockExists,
});

const mockMusicApp = {};

global.Application = jest.fn((name: string) => {
  if (name === 'Finder') return mockFinder();
  if (name === 'Music') return mockMusicApp;
  return {};
}) as unknown as typeof global.Application;

(ItunesHelper as jest.Mock).mockImplementation(() => ({
  fileTracks: mockFileTracks,
}));

describe('main', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.log as jest.Mock).mockRestore();
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
