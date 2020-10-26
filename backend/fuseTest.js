const Fuse = require("fuse.js");

function search(searchTerm) {
  const options = {
    includeScore: true,
    keys: ["artist", "songName", "artistAndSong", "songAndArtist"],
  };
  const list = [
    { artist: "The Beatles" },
    { songName: "Can't buy me love" },
    { artistAndSong: "The Beatles Can't Buy me Love" },
    { songAndArtist: "Can't buy me Love The Beatles" },
  ];

  const fuse = new Fuse(list, options);

  const result = fuse.search(searchTerm);
  console.log(result);
  return result;
}

search("can't buy me love");
