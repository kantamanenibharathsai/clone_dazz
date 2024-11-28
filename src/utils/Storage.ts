import { encryptionSalt } from "../config/config";

const encryption = (text: string) => {
  const textToChars = (text: string) =>
    text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n: string) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code: any) =>
    textToChars(encryptionSalt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

const decryption = (encoded: string) => {
  const textToChars = (text: string) =>
    text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code: any) =>
    textToChars(encryptionSalt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    ?.map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};

const get = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    const decryptedData = data && decryption(data);
    return decryptedData && JSON.parse(decryptedData);
  } catch (error) {
    return undefined;
  }
};

const set = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, encryption(JSON.stringify(value)));
    return value;
  } catch (error) {
    return false;
  }
};

const remove = (key: string) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

const clearAll = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
};

const Storage = {
  get,
  set,
  remove,
  clearAll,
};

export default Storage;
