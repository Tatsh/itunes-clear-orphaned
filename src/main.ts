import { ItunesHelper } from 'jxa-lib';

export default function (): number {
  const finder = Application('Finder');
  const helper = new ItunesHelper(Application('Music') as ItunesApplication);
  let name: string | undefined;
  for (const track of helper.fileTracks) {
    try {
      name = track.name();
    } catch (_) {
      continue;
    }
    const loc = track.location();
    if ((!loc || !finder.exists(loc)) && typeof name !== 'undefined') {
      console.log(`Removing ${name}`);
      track.delete();
    }
  }
  return 0;
}
