export const config = {
    appId: '',
    appSecret: '',
    channelId: '',
    user: {
      userId: 'polye123',
      nick: '保利威',
      avatar: 'http://livestatic.videocc.net/assets/wimages/missing_face.png',
      role: 'viewer'
    }
  };
  
  export const updateConfig = (key, value) => {
    if (typeof key === 'object') {
      for (const k in key) {
        config[k] = key[k];
      }
      return;
    }
    config[key] = value;
  };