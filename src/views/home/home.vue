<!--
 * @Description:
 * @Author: zby
 * @Date: 2022-04-19 09:55:37
 * @LastEditors: zby
 * @Reference:
-->
<template>
  <div class="home__page">
    <img class="bg_img" src="@/assets/home_bgc.png" alt="bgc" />
    <div v-show="isInitPage" class="init_page">
      <div class="header">
        <GLBgIcon class="app_logo" :img="require('@/assets/logo.png')" />
      </div>
      <div class="con">
        <p>{{ $t('home.Lang_appName') }}</p>
        <div class="con_btn_group">
          <el-button @click="isInitPage = false" class="open" type="primary">
            <GLIcon class="dakaixiangmu" icon="icon-dakaixiangmu" />
            {{ $t('home.Lang_openProject') }}
          </el-button>
          <el-button @click="createPorject" :loading="cLoading" class="create">
            <GLIcon class="chuangjianxiangmu" icon="icon-chuangjianxiangmu" />
            {{ $t('home.Lang_createProject') }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="global_setting" :class="{ show_global_setting: !isInitPage }">
      <GlobalSetting v-if="!isInitPage" @clickBackBtn="clickBackBtn" :showNextBtn="true" />
    </div>
  </div>
</template>
<script>
const { ipcRenderer } = require('electron');
import GlobalSetting from '@/views/global-setting/global-setting';
import appApi from '@/api/modules/app.api';
export default {
  name: 'home-page',
  components: { GlobalSetting },
  props: {},
  data() {
    return {
      cLoading: false,
      isInitPage: true,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async createPorject() {
      const res = await ipcRenderer.invoke(
        'ipcDialog',
        'showOpenDialog',
        {
          properties: ['openDirectory'],
        },
        this.$thisBrowserId,
      );
      if (res.canceled) return;
      res.filePaths && res.filePaths[0] && this.doCreateProject(res.filePaths[0]);
    },

    async doCreateProject(path) {
      console.log(path);
      this.cLoading = true;
      let [createProjectData] = await appApi.getTest({ id: 423407947 });
      this.cLoading = false;
      console.log(createProjectData);
      // if (!createProjectData) return;
      this.isInitPage = false;
    },

    clickBackBtn() {
      this.isInitPage = !this.isInitPage;
    },
  },
};
</script>
<style lang="scss" scoped>
.home__page {
  position: relative;
  height: 100vh;
  background-image: linear-gradient(134deg, #fffffe 0%, #dcf2ff 100%);
  .bg_img {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 65vw;
    height: 43.75vw;
  }
  .init_page {
    .header {
      padding: 2.1875vw 3.6458vw;
      .app_logo {
        width: 6.5625vw;
        height: 2.6042vw;
      }
    }
    .con {
      position: absolute;
      top: 41%;
      transform: translate(0, -41%);
      padding: 0 9.375vw;
      p {
        margin: 0;
        font-size: 3.5417vw;
        color: #253869;
        line-height: 4.6875vw;
      }
      .con_btn_group {
        margin-top: 3.6458vw;
        .open,
        .create {
          width: 15.5208vw;
          height: 4.0625vw;
          box-shadow: 0 0.3125vw 3.0208vw 0 rgba(121, 145, 173, 0.2);
          border-radius: 0.4167vw;
          font-size: 0.9375vw;
          .dakaixiangmu,
          .chuangjianxiangmu {
            font-size: 1.0417vw;
            margin-right: 0.7813vw;
          }
        }
        .open {
          background-color: #116ef9;
        }
        .create {
          color: #116ef9;
          margin-left: 2.2917vw;
        }
      }
    }
  }
  .global_setting {
    position: fixed;
    left: 0;
    opacity: 0;
    pointer-events: none;
    transition: all 0.35s;
    &.show_global_setting {
      left: 0;
      right: 0;
      opacity: 0.95;
      pointer-events: auto;
    }
  }
}
</style>
