<!--
 * @Description:
 * @Author: zby
 * @Date: 2022-05-07 17:13:35
 * @LastEditors: zby
 * @Reference:
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
const { ipcRenderer } = require('electron');
import { mapState } from 'vuex';

export default {
  components: {},
  props: {},
  data() {
    return {
      timer: 0,
    };
  },
  computed: {
    ...mapState('app/', ['isMainWin']),
  },
  watch: {
    $route(to, from) {
      console.log('---路由watch：----', to, from);
      if (this.$route.path === '/tfl-list' && this.isMainWin) {
        //可以在这开始记录埋点 自动缓存啥的
      }
    },
  },
  created() {
    console.log('app.vue created', this.$parentWinId);
  },
  mounted() {
    console.log('app.vue mounted');
    let eventType = ['click', 'mousewheel', 'mousemove'];
    eventType.forEach(i => {
      document.addEventListener(i, () => {
        if (Date.now() - this.timer < 800) return;
        this.timer = Date.now();
        this.isMainWin && console.log('父窗口活动');
        if (!this.isMainWin) {
          ipcRenderer.send('windowIpc', 'childSetThisTime', { toBrowserWindowId: this.$parentWinId, data: { childClickTime: Date.now() } });
        }
      });
    });

    //子窗口点击也记录操作时间
    ipcRenderer.on('childSetThisTime', (event, v) => {
      console.log('子窗口记录用户活动:', v);
    });

    if (this.isMainWin) {
      //拦截非子窗口的关闭窗口事件 关闭就结束埋点
      ipcRenderer.on('beforeClose', () => {
        this.$confirm('Are you sure to quit?', 'Tips', { cancelButtonText: 'Cancel', confirmButtonText: 'Confirm', type: 'warning' })
          .then(async () => {
            if (this.$route.path !== '/' && this.$route.path !== '/home') {
              console.log('---关闭应用ing---');
            }
            ipcRenderer.send('closeThisWin', { browserWindowId: this.$thisBrowserId, type: 'destroy' });
          })
          .catch(() => {});
      });
    }
  },
  destroyed() {
    ipcRenderer.removeAllListeners('beforeClose');
    ipcRenderer.removeAllListeners('childSetThisTime');
  },
  methods: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
</style>
