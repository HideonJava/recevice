<template>
  <div v-show="isShowAnswerCard">
    <h2>{{ answerCardTitle }}</h2>
    <answer-card
      :answer-card-sdk="answerCardSdk"
      @to-show="onSetAnswerCardVisible(true)"
      @to-hide="onSetAnswerCardVisible(false)"
      @status-changed="onStatusChanged"
    />
  </div>
</template>

<script>
import { AnswerCard as AnswerCardSDK } from '@polyv/interactions-receive-sdk';
import AnswerCard from '@polyv/interactions-receive-sdk-ui-default/lib/PcAnswerCard/index';   

export default {
  components: {
    AnswerCard,
  },

  data() {
    return {
      // 答题卡SDK实例
      answerCardSdk: null,
      // 是否显示答题卡
      isShowAnswerCard: false,
      // 外部弹窗（容器）标题
      answerCardTitle: '',
    };
  },

  created() {
    this.answerCardSdk = new AnswerCardSDK();
  },

  beforeDestroy() {
    this.answerCardSdk.destroy();
  },

  methods: {
    onSetAnswerCardVisible(visible) {
      this.isShowAnswerCard = visible;
    },

    onStatusChanged(status) {
      if (status === 'isShowResult' || status === 'isShowAnswer') {
        this.answerCardTitle = this.answerCardSdk.curSubmittedAnswer ? '答题结果' : '未作答';
      } else {
        this.answerCardTitle = '答题卡';
      }
    },
  },
};
</script>