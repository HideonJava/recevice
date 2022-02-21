<template>
  <div class="login" :style="'background-image:url(' + Background + ');'">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
    >
      <h3 class="title">demo</h3>
      <el-form-item prop="channelId">
        <el-input
          v-model="loginForm.channelId"
          type="text"
          auto-complete="off"
          placeholder="channelId"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="appId">
        <el-input
          v-model="loginForm.appId"
          type="text"
          auto-complete="off"
          placeholder="AppId"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="appSecret">
        <el-input
          v-model="loginForm.appSecret"
          type="password"
          auto-complete="off"
          placeholder="AppSecret"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="timestamp" style="margin-bottom: 0">
        <el-input
          v-model="loginForm.timestamp"
          type="text"
          auto-complete="off"
          v-show="false"
        >
        </el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div id="el-login-footer"></div>
    
    <announcement />
    <answer-card />
    <check-in />
    <lottery />
    <push-card-comp />
    <questionnaire />
  </div>
</template>

<script>
import { getChatToken, getApiToken, getChannelDetail } from "../api/chat";
import qs from "qs";
import { config } from "../utils/config";
import { getSign } from "../utils/sign";
import Background from "../assets/1209425.png";
import { updateConfig as updateInteractiveSdkV2Config } from "@polyv/interactions-receive-sdk";
import Announcement from "./announcement.vue";
import AnswerCard from "./answerCard.vue";
import CheckIn from './checkIn.vue';
import Lottery from './lottery.vue';
import Questionnaire from './questionnaire.vue';

export default {
  components: { Announcement, AnswerCard, CheckIn, Lottery, Questionnaire },
  name: "Index",
  data() {
    return {
      Background: Background,
      loginForm: {
        channelId: "",
        appId: "",
        appSecret: "",
        timestamp: +new Date().getTime(),
      },
      loginRules: {
        channelId: [
          { required: true, trigger: "blur", message: "channelId不能为空" },
        ],
        appId: [{ required: true, trigger: "blur", message: "appid不能为空" }],
        appSecret: [
          { required: true, trigger: "blur", message: "appSecret不能为空" },
        ],
      },
      chatData: {
        roomId: "",
        token: "",
        mediaChannelKey: "",
      },
      detailData: "",
      loading: false
    };
  },
  watch: {},
  created() {
    this.handleLogin();
  },
  methods: {
    async handleLogin() {
      let data = {
        channelId: config.channelId,
        userId: config.user.userId,
        role: config.user.role,
        origin: "web",
      };
      const signData = await getSign(data);
      Object.assign(data, signData);

      getChatToken(data).then((res) => {
        this.chatData = Object.assign(res.data);
        this.initChatRoom();
      });
    },

    async getViewerApiToken(cb) {
      let data = {
        channelId: config.channelId,
      };
      const signData = await getSign(data);
      Object.assign(data, signData);
      const { data: detailData } = await getChannelDetail(data);
      this.detailData = detailData;

      try {
        const requestData = {
          channelId: config.channelId,
          viewerId: config.user.userId,
        };
        const signData = await getSign(requestData);
        Object.assign(requestData, signData);
        const res = await getApiToken(qs.stringify(requestData));
      
        if (res.data) {
          const token = res.data.token;
          cb && cb({ channelToken: token });
        }
      } catch (e) {}
    },

    initChatRoom() {
      const { userId, avatar, nick } = config.user;
      const { roomId, token, mediaChannelKey } = this.chatData;
      var chatroom = new PolyvChatRoom({
        roomId: roomId,
        userId: userId,
        nick: nick,
        pic: avatar,
        token: token,
        mediaChannelKey: mediaChannelKey,
        version: "2.0",
        roomMessage: function (data) {
          // TODO
          // data为聊天室socket消息，当有聊天室消息时会触发此方法
        },
      });

      updateInteractiveSdkV2Config({
        getViewerApiToken: this.getViewerApiToken,
        socket: chatroom.chat.socket,
        userInfo: {
          nick: "",
          pic: "",
          userId: userId,
        },
        channelInfo: {
          channelId: config.channelId,
          roomId: roomId,
          sessionId: this.detailData.sessionId,
        },
      });
    },
  },
};
</script>

<style>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background-size: cover;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}
</style>
