import CryptoJS from "crypto-js";
import { JSEncrypt } from "jsencrypt";

// AES
const AES_SECRET = "my_aes_secret";

export function encryptAES(text) {
  return CryptoJS.AES.encrypt(text, AES_SECRET).toString();
}

export function decryptAES(cipher) {
  const bytes = CryptoJS.AES.decrypt(cipher, AES_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// DES
const DES_SECRET = "des_key";

export function encryptDES(text) {
  return CryptoJS.DES.encrypt(text, DES_SECRET).toString();
}

export function decryptDES(cipher) {
  const bytes = CryptoJS.DES.decrypt(cipher, DES_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// RSA
const jsEncrypt = new JSEncrypt({ default_key_size: 512 });
jsEncrypt.getKey();

const PUBLIC_KEY = jsEncrypt.getPublicKey();
const PRIVATE_KEY = jsEncrypt.getPrivateKey();

export const RSA_KEYS = {
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
};

export function encryptRSA(text) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(PUBLIC_KEY);
  return encryptor.encrypt(text);
}

export function decryptRSA(cipher) {
  const decryptor = new JSEncrypt();
  decryptor.setPrivateKey(PRIVATE_KEY);
  return decryptor.decrypt(cipher);
}
