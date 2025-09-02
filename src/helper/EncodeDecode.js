// const crypto = require("crypto");
import { AES, enc } from 'crypto-js';
const secret_key = 'TXTVIEWSsk-aaa';
const secret_iv = 'TXTVIEWSsiv25';
const eMethod = 'AES-256-CBC';

const hashSHA512 = async (secretKey, h) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(secretKey);
  const hashBuffer = await window.crypto.subtle.digest('SHA-512', data);
  // Convert ArrayBuffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex.substring(0, h);
}

const osk = "5c17b49b7832537a4f954241ac3c26fe";
const oiv = "b7224ae8f85af173";
const sk = await hashSHA512(secret_key, 32);
const iv = await hashSHA512(secret_iv, 16);

const encrypt_string = async (plain_text) => {
  var encryptor = crypto.createCipheriv(eMethod, seccretKey, sectretIV);
  var aes_encrypted = encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64');
  return Buffer.from(aes_encrypted).toString('base64');
};

const decrypt_string = async (encryptedMessage) => {
  const buff = Buffer.from(encryptedMessage, 'base64');
  encryptedMessage = buff.toString('utf-8');
  var decryptor = crypto.createDecipheriv(eMethod, seccretKey, sectretIV);
  return decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8');
};


async function decryptAESCBC(encryptedBase64) {
  try {
    if (encryptedBase64 == undefined || encryptedBase64 == null || encryptedBase64?.length < 1)
      return '';
    function base64ToUint8Array(base64, blockSize = 16) {
      const binary = atob(base64);
      const padLength = blockSize - (binary.length % blockSize);
      // const bytes = new Uint8Array(binary.length);
      const len = binary.length + padLength;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        if (i < binary.length) {
          bytes[i] = binary.charCodeAt(i);
        } else {
          bytes[i] = padLength;
        }
      }
      return bytes;
    }
    const encryptedBytes = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
    const keyBytes = Uint8Array.from(atob(sk), c => c.charCodeAt(0));
    const ivBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0));

    const eBytes = base64ToUint8Array(encryptedBase64);
    const eKey = base64ToUint8Array(osk);
    const eIV = base64ToUint8Array(oiv);


    let bytes;

    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      eKey,
      { name: 'AES-CBC' },
      false,
      ['encrypt', 'decrypt']
    );

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'AES-CBC',
        iv: eIV,
      },
      cryptoKey,
      eBytes
    );

var texts;
  } catch (e) {
    console.log('decrypt exception error', e);
  }
}


export {
  encrypt_string,
  decrypt_string,
  decryptAESCBC
};
