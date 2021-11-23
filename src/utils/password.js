/*
 * @Author: chengxinyu
 * @Date: 2021-11-23 14:40:37
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-23 14:48:47
 */
import CryptoJS from 'crypto-js';

export const encrypt = (plaintText) => {
  const CRYPTOJSKEY = 'cmbCampus0722000';
  const options = { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 };
  const key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
  const encryptedData = CryptoJS.AES.encrypt(plaintText, key, options);
  const encryptedBase64Str = encryptedData.toString();
  return encryptedBase64Str;
};
