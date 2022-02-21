/**
 * @file 获取签名，主要负责根据appSecret获取签名
 */

 import { config } from './config';
 import md5 from "md5";
 
 function resortParam(params) {
   // 除sign外字母顺序排列的key
   const arr = Object.keys(params).filter((item) => item !== 'sign').sort();
   let query = '';
   arr.forEach((item) => {
     query += `${item}${params[item]}`;
   });
   return query;
 }
 
function getSignStrBySecret(params) {
   const appSecret = config.appSecret;
   let keyString = resortParam(params);
   keyString = `${appSecret}${keyString}${appSecret}`;
   return md5(keyString).toUpperCase();
 }
 
 export async function getSign(sendData) {
    const timestamp = Date.now();
    const appId = config.appId;
  
    const params = Object.assign({
      appId,
      timestamp
    }, sendData);

    return {
      appId,
      timestamp,
      sign: getSignStrBySecret(params)
    };
  }
  