import md5 from "md5";

/**
 * 参数排序，按字典顺序排序，详细请看sign生成规则
 * https://dev.polyv.net/2018/liveproduct/l-api/notice/sign/
 * @param {Object} params 待排序的参数
 *
 */
function sortParams(params) {
  var keys = Object.keys(params).sort();
  var paramsString = '';
  for (var i = 0; i < keys.length; i++) {
    paramsString += keys[i] + params[keys[i]];
  }
  return paramsString;
}

/**
* 简单的对象深拷贝, 有些情况的深拷贝可能不支持
* @param obj {Object} 对象
*/
function deepCopy(obj) {
  var rs;
  try {
    rs = JSON.parse(JSON.stringify(obj));
  } catch (e) {
    rs = {};
    console.warn('JSON parse error');
  }
  return rs;
}


export function getSign(params) {
  
  var paramString = sortParams(params);
  var signString = appSecret + paramString + appSecret;
  return md5(signString).toUpperCase();
}

/**
  * 判断是否是微信环境
  */
export function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.indexOf('micromessenger') > -1) {
    return true // 是微信端
  } else {
    return false
  }
}

/**
 * 判断是否是移动端环境
 */
export function isMobile() {
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return true // 手机端
  } else {
    return false // alert('PC端')
  }
}
