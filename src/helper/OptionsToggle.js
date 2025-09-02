import { AES, enc } from 'crypto-js';

const supportMethod = async (plain_text) => {
  var encryptor = crypto.createCipheriv(eMethod, seccretKey, sectretIV);
  var aes_encrypted = encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64');
  return Buffer.from(aes_encrypted).toString('base64');
};

const donateEnable=false;
const donatePageEnable=false;
const salesEnable=true;
const tournamentsEnable=true;
const cryptoDonateEnable=true;
const ccDonateEnable=false;
const cryptoEnable=false;
const sponsoredProductsEnable=false;
const sponsoredAdverts=false;
const webAdvertisementsEnable =false;

export {
  donateEnable,
  donatePageEnable,
  cryptoDonateEnable,
  ccDonateEnable,
  cryptoEnable,
  salesEnable,
  tournamentsEnable,
  sponsoredProductsEnable,
  sponsoredAdverts,
  webAdvertisementsEnable
};

