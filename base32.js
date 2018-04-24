// Crockford's Base32
const base32Chars = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "j",
  "k",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z"
];

function get8() {
  let key = "";
  for (let i = 0; i < 8; i++) {
    let idx = Math.floor(Math.random() * 32.0);
    key += base32Chars[idx];
  }
  return key;
}

module.exports = {
  get8: get8,
};