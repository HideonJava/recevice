<template>
  <div v-show="isShowQuestionnaire">
    <h2>问卷</h2>
    <!-- 问卷组件主体 -->
    <questionnaire
      :questionnaire-sdk="questionnaireSdk"
      @status-changed="onStatusChanged"
      @to-show="onSetQuestionnaireVisible(true)"
      @to-hide="onSetQuestionnaireVisible(false)"
    />
  </div>
</template>

<script>
import { Questionnaire as QuestionnaireSDK } from '@polyv/interactions-receive-sdk';
import Questionnaire from '@polyv/interactions-receive-sdk-ui-default/lib/PcQuestionnarie'; 

export default {
  components: {
    Questionnaire,
  },

  data() {
    return {
      // 问卷SDK实例
      questionnaireSdk: null,
      // 是否显示问卷
      isShowQuestionnaire: false,
    };
  },

  created() {
    this.questionnaireSdk = new QuestionnaireSDK();
  },

  beforeDestroy() {
    this.questionnaireSdk.destroy();
  },

  methods: {
    onSetQuestionnaireVisible(visible) {
      this.isShowQuestionnaire = visible;
    },
    onStatusChanged(a){
        console.log(a);
    }
  },
};
</script>
