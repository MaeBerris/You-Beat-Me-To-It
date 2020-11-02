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

  let marginOfError = Math.floor((artistOrSong.length / 10) * 4);
  if (marginOfError > 5) {
    marginOfError = 5;
  }

  if (ArtistResultMap[0].distance < marginOfError) {
    return {
      [`${valueToSearch}`]: true,
      distance: ArtistResultMap[0].distance,
      marginOfError: marginOfError,
    };
  } else {
    return {
      [`${valueToSearch}`]: false,
      distance: ArtistResultMap[0].distance,
      marginOfError: marginOfError,
    };
  }
};

module.exports = { calculateDistance };
