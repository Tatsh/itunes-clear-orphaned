#!/usr/bin/env -S osascript -l JavaScript
"use strict";
ObjC["import"]("AppKit");
ObjC["import"]("stdlib");
const appIsRunning = (xs) => {
    for (const app of ObjC.unwrap($.NSWorkspace.sharedWorkspace.runningApplications)) {
        if (app.bundleIdentifier.isEqualToString &&
            app.bundleIdentifier.isEqualToString(xs)) {
            return true;
        }
    }
    return false;
};
const main = () => {
    const finder = Application("Finder");
    const library = Application("Music")
        .sources()
        .find(x => x.name() === "Library");
    if (!library) {
        return 1;
    }
    for (const track of library.tracks()) {
        try {
            track.name();
        }
        catch (e) {
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
