interface $ {
  exit(n: number): never;
  NSWorkspace: {
    sharedWorkspace: {
      runningApplications: {
        bundleIdentifier: {
          isEqualToString?(x: string): boolean;
        };
      }[];
    };
  };
}

interface Application {
  exists(x: string): boolean;
  sources(): {
    name(): string;
    tracks(): {
      delete(): void;
      location(): string | undefined;
      name(): string;
    }[];
  }[];
}

interface ObjC {
  ["import"]: (x: string) => void;
  unwrap<T>(x: T): T;
}

declare var $: $;
declare var Application: (x: string | number) => Application;
declare var ObjC: ObjC;

ObjC["import"]("AppKit");
ObjC["import"]("stdlib");

const appIsRunning = (xs: string) => {
  for (const app of ObjC.unwrap(
    $.NSWorkspace.sharedWorkspace.runningApplications
  )) {
    if (
      app.bundleIdentifier.isEqualToString &&
      app.bundleIdentifier.isEqualToString(xs)
    ) {
      return true;
    }
  }
  return false;
};

const main = () => {
  const finder = Application("Finder");
  const iTunesApp = Application("Music");
  const library = iTunesApp.sources().find(x => x.name() === "Library");

  if (!library) {
    return 1;
  }

  for (const track of library.tracks()) {
    try {
      track.name();
    } catch (e) {
      continue;
    }
    const loc = track.location();
    if (!loc || !finder.exists(loc)) {
      console.log(`Removing ${name}`);
      track.delete();
    }
  }

  return 0;
};

$.exit(main());
