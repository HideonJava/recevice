<template>
  <div class="plv-demo-lottery-default" v-show="false">
    <button @click="setLotteryRecordVisible">查看中奖记录</button>

    <div class="plv-demo-lottery-default__lottery">
      <!-- 抽奖中 -->
      <on-lottery
        v-if="lotterySdk"
        v-show="isLotteryShowing"
        :lottery-sdk="lotterySdk"
        :lang="lang"
        @lottery-status-changed="onLotteryStatusChange"
        @is-show-changed="onLotteryShowChange"
      />
    </div>

    <!-- 中奖记录 -->
    <div
      no-bg
      draggable
      title="中奖记录"
      :visible="isShowRecord"
      :close-on-click-modal="false"
      @close="isShowRecord = false"
    >
      <lottery-record
        v-if="lotterySdk"
        :lottery-sdk="lotterySdk"
        :lang="lang"
        :delay-time="3000"
        @lottery-list="onLotteryRecord"
        @submit-info="onClickRecord"
        @check-info="onClickRecord"
      />
    </div>

    <!-- 中奖结果 -->
    <div
      no-bg
      draggable
      title="中奖结果"
      :visible="isShowResult"
      :close-on-click-modal="false"
      :lang="lang"
      @close="isShowResult = false"
    >
      <lottery-end
        v-if="lotterySdk"
        ref="lotteryEnd"
        :lottery-sdk="lotterySdk"
        :lottery-list="lotteryList"
        :lang="lang"
        @to-show="setLotteryResultShow"
        @to-hide="setLotteryResultHide"
      />
    </div>
  </div>
</template>

<script>
import OnLottery from '@polyv/interactions-receive-sdk-ui-default/lib/PcOnLottery';
import LotteryEnd from '@polyv/interactions-receive-sdk-ui-default/lib/PcLotteryEnd';
import LotteryRecord from '@polyv/interactions-receive-sdk-ui-default/lib/PcLotteryRecord';
import { Lottery } from '@polyv/interactions-receive-sdk';

export default {
  components: {
    OnLottery,
    LotteryEnd,
    LotteryRecord,
  },

  data() {
    return {
      // 抽奖 SDK 实例 
      lotterySdk: null,
      // 是否展示结果
      isShowResult: false,
      // 中奖记录数据
      lotteryList: [],
      // 是否展示抽奖盒子
      isLotteryShowing: false,
      // 是否展示抽奖记录
      isShowRecord: false,
      // 语言
      lang: 'zh_CN'
    };
  },

  created() {
    this.lotterySdk = new Lottery();
  },

  beforeDestroy() {
    this.lotterySdk.destroy();
    this.lotterySdk = null;
  },

  methods: {
    onLotteryStatusChange(status) {
      if (status === 'running') {
        this.isLotteryShowing = true;
      } else if (status === 'over') {
        this.isLotteryShowing = false;
      }
    },

    onLotteryShowChange(isShowing) {
      this.isLotteryShowing = isShowing;
    },

    // 展示抽奖结果
    setLotteryResultShow() {
      this.isShowResult = true;
    },

    // 隐藏抽奖结果
    setLotteryResultHide() {
      this.isShowResult = false;
      this.$refs.lotteryEnd && this.$refs.lotteryEnd.toBack();
    },

    // 切换中奖记录列表组件可见性
    setLotteryRecordVisible() {
      this.isShowRecord = !this.isShowRecord;
    },

    // 中奖记录数据更新
    onLotteryRecord(lotteryList = []) {
      if (lotteryList.length) {
        this.lotteryList = lotteryList;
      }
    },

    // 点击查看中奖结果详情
    onClickRecord(record = {}) {
      this.isShowRecord = false;
      const { prize, lotteryId, collectInfo, winnerCode, sessionId, received } = record;
      this.$refs.lotteryEnd.setLottery({
        received,
        prize,
        lotteryId,
        collectInfo,
        winnerCode,
        sessionId,
        isWinner: true,
      });
    },
  }
};
</script>

<style>
.plv-demo-lottery-default__lottery {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
