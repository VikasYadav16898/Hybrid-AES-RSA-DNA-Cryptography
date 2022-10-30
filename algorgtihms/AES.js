var CryptoJS = require("crypto-js");
const NodeRSA = require("node-rsa");

exports.aes = {
  encrypt: function (plaintext, key) {
    const data = CryptoJS.AES.encrypt(plaintext, key).toString();
    return data;
  },
  decrypt: function (ciphertext) {
    const data = CryptoJS.AES.decrypt(ciphertext, key);
    return data.toString(CryptoJS.enc.Utf8);
  },
};

exports.rsa = {
  key: new NodeRSA({ b: 512 }),
  encrypt: function (plaintext) {
    const data = this.key.encrypt(plaintext, "base64");
    return data;
  },
  decrypt: function (ciphertext) {
    const data = this.key.decrypt(ciphertext, "utf8");
    return data;
  },
};

exports.DNAAlgorithm = (plainText, key) => {
  const DNABaseTable = {};
  //     A(0) –00
  // T(1) –01
  // C(2)–10
  // G(3)–11

  const textToBinary = (str) => {
    let res = "";
    res = str
      .split("")
      .map((char) => {
        return char.charCodeAt(0).toString(2);
      })
      .join("");
    return res;
  };

  const convertToEven = (data) => {
    if (data % 2 === 0) {
      return data;
    }

    return data + "0";
  };
  function reverseString(str) {
    var splitString = str.split("");

    var reverseArray = splitString.reverse();

    var joinArray = reverseArray.join("");

    return joinArray;
  }

  //   console.log(key, `key: ${key.length}`, `message: ${plainText.length}`);

  //   Binary conversion
  text = textToBinary(plainText);
  key = textToBinary(key);
  if (key.length < text.length) {
    key = key.repeat(Math.ceil(text.length / key.length));
  }

  //   Adding padding
  if (key.length != text.length) {
    const padding = "0".repeat(key.length - text.length);
    text = text + padding;
  }

  key = convertToEven(key);
  text = convertToEven(text);
  //   console.log(key);
  //   console.log(text);
  //   console.log(typeof key, `key: ${key.length}`, `message: ${text.length}`);

  //   OR LOGIC
  let orArray = [];
  let cipherText = "";
  for (let i = 0; i < key.length; i++) {
    orArray.push(new Number(key[i]) || new Number(text[i]));
    if (i % 2 != 0) {
      let code = orArray[i - 1] + "" + orArray[i];
      switch (code) {
        case "00":
          cipherText = cipherText + "A";
          break;
        case "01":
          cipherText = cipherText + "T";
          break;
        case "10":
          cipherText = cipherText + "C";
          break;
        case "11":
          cipherText = cipherText + "G";
          break;

        default:
          break;
      }
    }
  }
  orString = orArray.join("");

  //   console.log(orString, "ORSTRING");
  cipherText = reverseString(cipherText);
  // console.log(cipherText, "cipherText");
  return cipherText;
};
