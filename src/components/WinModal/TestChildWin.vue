<!--
 * @Description:
 * @Author: zby
 * @Date: 2022-04-26 14:52:14
 * @FilePath: \electron_vue2\src\components\WinModal\TestChildWin.vue
 * @LastEditors: zby
 * @Reference:
-->
<template>
  <div>子窗口</div>
</template>
<script>
const { ipcRenderer } = require('electron');
export default {
  name: 'TestChildWin',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    ipcRenderer.on('initData', (e, v) => {
      console.log('创建时传入的初始值', v);
    });
  },
  mounted() {
    setTimeout(async () => {
      console.log('向父窗口传递信息');
      const pid = await ipcRenderer.invoke('getParentWindowId', this.$thisBrowserId);
      ipcRenderer.send('windowIpc', 'imChildInfo', {
        toBrowserWindowId: pid,
        data: { wy: 999 },
      });
    }, 3000);
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
