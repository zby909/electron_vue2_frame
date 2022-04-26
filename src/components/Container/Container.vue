<!--
 * @Description:
 * @Author: zby
 * @Date: 2021-12-31 17:52:23
 * @LastEditors: zby
 * @Reference:
-->
<template>
  <div>
    <navbar />
    <div class="app-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navbar from './Navbar';
export default {
  name: 'ContainerPage',
  components: { navbar },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.app-main {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding-top: 68px;
  background-color: #f5f7fa;
}
</style>
