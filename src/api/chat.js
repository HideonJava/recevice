import Service from "../utils/request";
import { config } from '../utils/config';

// 聊天室token
export function getChatToken(data) {
  return Service({
    url: "/live/v3/channel/common/get-chat-token",
    params: {...data},
    method: "get"
  });
}
// 互动token
export function getApiToken(data) {
  return Service({
    url: "/live/v3/channel/watch/get-api-token",
    data,
    method: "post"
  });
}

// 频道详情
export function getChannelDetail(data) {
  return Service({
    url: "/live/v3/applet/sdk/get-channel-token-detail",
    params: {...data},
    method: "get"
  });
}