const leven = require("leven");

const calculateDistance = (searchTerm, artistOrSongName, valueToSearch) => {
  const artistOrSong = artistOrSongName.toLowerCase();
  const wordsArray = searchTerm.toLowerCase().split(" ");
  let allSubStrings = [...wordsArray];

  wordsArray.forEach((word, index) => {
    let string = "";
    for (i = 0; i <= index; i++) {
      string = string + " " + wordsArray[i];
    }
    allSubStrings.push(string.trim());
  });

  wordsArray.forEach((word, index) => {
    let newArray = wordsArray.slice(index);
    allSubStrings.push(newArray.join(" ").trim());
  });
  let ArtistResultMap = allSubStrings.map((item) => {
    return {
      searchTerm: item,
      searchingFor: valueToSearch,
      distance: leven(item, `${artistOrSong}`),
    };
  });
  ArtistResultMap = ArtistResultMap.sort((a, b) => {
    return a.distance - b.distance;
  });

  if (ArtistResultMap[0].distance <= 4) {
    return {
      [`${valueToSearch}`]: true,
      distance: ArtistResultMap[0].distance,
    };
  } else {
    return {
      [`${valueToSearch}`]: false,
      distance: ArtistResultMap[0].distance,
    };
  }
};

const levenTestResult = calculateDistance(
  "The Beach boys eight day a weak",
  "Eight Days a week",
  "songName"
);

console.log(levenTestResult);

module.exports = { calculateDistance };
