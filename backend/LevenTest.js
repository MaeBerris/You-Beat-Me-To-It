const leven = require("leven");

const calculateDistance = (searchTerm, artistName, value) => {
  const artist = artistName.toLowerCase();
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
      searchingFor: value,
      distance: leven(item, `${artist}`),
    };
  });
  ArtistResultMap = ArtistResultMap.sort((a, b) => {
    return a.distance - b.distance;
  });
  return ArtistResultMap;
};

module.exports = { calculateDistance };
