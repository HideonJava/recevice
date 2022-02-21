<template>
    <div v-show="isShowAnnouncement">
    <h2>公告</h2>
    <!-- 公告组件主体 -->
    <announcement
      :announcement-sdk="announcementSdk"
      @to-show="setAnnouncementVisible(true)"
      @to-hide="setAnnouncementVisible(false)"
    />
  </div>
</template>

<script>
import { Announcement as AnnouncementSDK } from '@polyv/interactions-receive-sdk';
import Announcement from '@polyv/interactions-receive-sdk-ui-default/lib/PcAnnouncement';

export default {
  components: {
    Announcement,
  },

  data() {
    return {
      // 公告SDK实例
      announcementSdk: null,
      // 是否显示公告
      isShowAnnouncement: false,
    };
  },

  created() {
    this.announcementSdk = new AnnouncementSDK();
    this.announcementSdk.on(this.announcementSdk.events.BULLETIN, function(msg) {
      console.log(`收到公告，公告ID：` + msg.id + `，公告内容：` + msg.content);
    });
  },

  beforeDestroy() {
    this.announcementSdk.destroy();
  },

  methods: {
    setAnnouncementVisible(visible) {
      this.isShowAnnouncement = visible;
    },
  },
};

</script>