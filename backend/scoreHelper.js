function scoreHelper(time) {
  if (time <= 6) {
    return 5;
  }
  if (time > 6 && time <= 12) {
    return 4;
  }
  if (time > 12 && time <= 18) {
    return 3;
  }
  if (time > 18 && time <= 24) {
    return 2;
  }
  if (time > 24 && time <= 30) {
    return 1;
  }
}

module.exports = { scoreHelper };
