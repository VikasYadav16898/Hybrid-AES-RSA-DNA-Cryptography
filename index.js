// const data = require("./data");
// console.log(data);

const { aes, DNAAlgorithm, rsa } = require("./algorgtihms/AES");

const data = {
  key: "1234567890",
  message: "abcdefghijklmnopdfshsghiu",
};
let subStringOdd = "";
let subStringEven = "";

console.time("start");

for (let i = 0; i < data.message.length; i++) {
  if (i % 2 === 0) {
    subStringEven = subStringEven + data.message[i];
  } else {
    subStringOdd = subStringOdd + data.message[i];
  }
}

// console.time("calc");

let subcipherA = aes.encrypt(subStringEven, data.key);
let subcipherB = DNAAlgorithm(subStringOdd, data.key);
// console.timeEnd("calc");

// console.log(subcipherA);
// console.log(subcipherB);
let cipherText = "";
baseInterval =
  subcipherA.length >= subcipherB.length
    ? subcipherA.length
    : subcipherB.length;

for (let i = 0; i < baseInterval - 1; i++) {
  if (i % 2 === 0) {
    // console.log("A");
    if (subcipherA[i] == null || subcipherA[i] == undefined) {
      cipherText = cipherText + "0";
      // console.log(cipherText, "0000000AAAA");
    } else {
      cipherText = cipherText + subcipherA[i];
      // console.log(cipherText, "AAAAA");
    }
  } else {
    // console.log("B");
    if (subcipherB[i] == null || subcipherB[i] == undefined) {
      cipherText = cipherText + "0";
      // console.log(cipherText, "0000000BBBBB");
      return;
    } else {
      cipherText = cipherText + subcipherB[i];
      // console.log(cipherText, "BBBBB");
    }
  }
}

// console.log(cipherText, "Cipher");
const cipherA = cipherText.substring(0, Math.floor(cipherText.length / 2));
const cipherB = cipherText.substring(Math.floor(cipherText.length / 2));

// console.log("Cipher A", cipherA);
// console.log("Cipher B", cipherB);

const cipherKey = rsa.encrypt(data.key);
const keyA = cipherKey.substring(0, Math.floor(cipherKey.length / 2));
const keyB = cipherKey.substring(Math.floor(cipherKey.length / 2));
// console.log(cipherA, cipherB, keyA, keyB);

console.timeEnd("start");
