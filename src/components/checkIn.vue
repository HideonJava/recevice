<template>
  <div v-show="isShowCheckIn">
    <h2>签到</h2>
    <!-- 签到组件主体 -->
    <check-in
      :check-in-sdk="checkInSdk"
      @to-show="onSetCheckInVisible(true)"
      @to-hide="onSetCheckInVisible(false)"
    />
  </div>
</template>

<script>
import { CheckIn as CheckInSDK } from '@polyv/interactions-receive-sdk';
import CheckIn from '@polyv/interactions-receive-sdk-ui-default/lib/PcCheckIn';   

export default {
  components: {
    CheckIn,
  },

  data() {
    return {
      // 签到SDK实例
      checkInSdk: null,
      // 是否显示签到
      isShowCheckIn: false,
    };
  },

  created() {
    this.checkInSdk = new CheckInSDK();
  },

  beforeDestroy() {
    this.checkInSdk.destroy();
  },

  methods: {
    onSetCheckInVisible(visible) {
      this.isShowCheckIn = visible;
    },
  },
};
</script>
