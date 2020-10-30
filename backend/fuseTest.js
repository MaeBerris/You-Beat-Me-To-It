const Fuse = require("fuse.js");

//ARTIST AND SONG TOGETHER

// function search(searchTerm) {
//   const options = {
//     includeScore: true,
//     ignoreLocation: true,
//     keys: ["artist", "songName", "artistAndSong", "songAndArtist"],
//   };
//   const list = [
//     { artist: "The Beatles" },
//     { songName: "Can't buy me love" },
//     { artistAndSong: "The Beatles Can't Buy me Love" },
//     { songAndArtist: "Can't buy me Love The Beatles" },
//   ];
//   const wordsArray = searchTerm.split(" ");
//   let allSubStrings = [];

//   wordsArray.forEach((word, index) => {
//     let string = "";
//     for (i = 0; i <= index; i++) {
//       string = string + " " + wordsArray[i];
//     }
//     allSubStrings.push(string.trim());
//   });

//   wordsArray.forEach((word, index) => {
//     let newArray = wordsArray.slice(index);
//     allSubStrings.push(newArray.join(" ").trim());
//   });

//   const fuse = new Fuse(list, options);
//   let resultMap = allSubStrings.map((searchTerm, index) => {
//     const result = fuse.search(searchTerm);
//     console.log(result);
//     if (result.length === 0) {
//       return { correctAnswer: false, searchTerm: searchTerm };
//     }
//     if (result[0].score <= 0.5) {
//       return {
//         correctAnswer: Object.keys(result[0].item)[0],
//         searchTerm: searchTerm,
//         score: result[0].score,
//       };
//     }
//     if (result[0].score > 0.5) {
//       return {
//         correctAnswer: false,
//         searchTerm: searchTerm,
//         score: result[0].score,
//       };
//     }
//   });
//   const sorted = resultMap.sort((a, b) => {
//     return a.score - b.score;
//   });
//   return sorted;
// }

// let searchResult = search("the bleetles");

// console.log(searchResult);

//SEPERATE ARTIST AND SONG

// function searchForArtist(searchTerm) {
//   const options = {
//     includeScore: true,
//     ignoreLocation: true,
//     keys: ["artist"],
//   };
//   const list = [{ artist: "The Beatles" }];

//   const wordsArray = searchTerm.split(" ");
//   let allSubStrings = [];

//   wordsArray.forEach((word, index) => {
//     let string = "";
//     for (i = 0; i <= index; i++) {
//       string = string + " " + wordsArray[i];
//     }
//     allSubStrings.push(string.trim());
//   });

//   wordsArray.forEach((word, index) => {
//     let newArray = wordsArray.slice(index);
//     allSubStrings.push(newArray.join(" ").trim());
//   });

//   const fuse = new Fuse(list, options);

//   let resultMap = allSubStrings.map((searchTerm, index) => {
//     const result = fuse.search(searchTerm);

//     if (result.length === 0) {
//       return { correctAnswer: false, searchTerm: searchTerm, score: 1 };
//     }
//     if (result[0].score <= 0.5 && searchTerm !== "the") {
//       return {
//         correctAnswer: Object.keys(result[0].item)[0],
//         searchTerm: searchTerm,
//         score: result[0].score,
//       };
//     }
//     if (result[0].score > 0.5) {
//       return {
//         correctAnswer: false,
//         searchTerm: searchTerm,
//         score: result[0].score,
//       };
//     }
//   });
//   const sorted = resultMap.sort((a, b) => {
//     return a.score - b.score;
//   });
//   return sorted;
// }

// function searchForSongName(searchTerm) {
//   const options = {
//     includeScore: true,
//     ignoreLocation: true,
//     keys: ["songName"],
//   };
//   const list = [{ songName: "Can't buy me love" }];

//   const wordsArray = searchTerm.split(" ");
//   let allSubStrings = [];

//   wordsArray.forEach((word, index) => {
//     let string = "";
//     for (i = 0; i <= index; i++) {
//       string = string + " " + wordsArray[i];
//     }
//     allSubStrings.push(string.trim());
//   });

//   wordsArray.forEach((word, index) => {
//     let newArray = wordsArray.slice(index);
//     allSubStrings.push(newArray.join(" ").trim());
//   });

//   const fuse = new Fuse(list, options);

//   let resultMap = allSubStrings.map((searchTerm, index) => {
//     const result = fuse.search(searchTerm);

//     if (result.length === 0) {
//       return { correctAnswer: false, searchTerm: searchTerm, score: 1 };
//     }
//     if (result[0].score <= 0.5 && searchTerm !== "the") {
//       return {
//         correctAnswer: Object.keys(result[0].item)[0],
//         searchTerm: searchTerm,
//         score: result[0].score,
//       };
//     }
//     if (result[0].score > 0.5) {
//       return {
//         correctAnswer: false,
//         searchTerm: searchTerm,
//         score: result[0].score,
//       };
//     }
//   });
//   const sorted = resultMap.sort((a, b) => {
//     return a.score - b.score;
//   });
//   return sorted;
// }

// let artistSearch = searchForArtist("the cure");
// let songNameSearch = searchForSongName("Can't dong my dove");
// console.log(songNameSearch);
// console.log(artistSearch);

//SIMPLIFIED VERSION

// function search(searchTerm) {
//   const options = {
//     includeScore: true,
//     ignoreLocation: true,
//     keys: ["artist", "songName", "artistAndSong", "songAndArtist"],
//   };
//   const list = [
//     { artist: "The Beatles" },
//     { songName: "Can't buy me love" },
//     { artistAndSong: "The Beatles Can't Buy me Love" },
//     { songAndArtist: "Can't buy me Love The Beatles" },
//   ];

//   const fuse = new Fuse(list, options);
//   return fuse.search(searchTerm);
// }

// let searchResult = search("the beatles eight days a week");

// console.log(searchResult);

let songName = "slime dogg";

let shortenSongName = songName.split("(")[0];

console.log(shortenSongName === "");

console.log(shortenSongName);
