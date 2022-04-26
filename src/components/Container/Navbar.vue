<!--
 * @Description:
 * @Author: zby
 * @Date: 2022-01-04 10:01:16
 * @LastEditors: zby
 * @Reference:
-->
<template>
  <div class="navbar">
    <div class="navbar_box">
      <div class="navbar_left">
        <GLBgIcon @click.native="toHome('globalSetting')" class="navbar_left-logo" :img="require('@/assets/logo.png')" />
        <div class="navbar_left-menubox">
          <el-menu :default-active="activeIndex" class="navbar_left-menu" mode="horizontal" @select="handleSelect" text-color="#222D3C">
            <el-menu-item v-for="item in menuList" :key="item.nameIndex" :index="item.nameIndex">{{
              $t('navbar.Lang_' + item.nameIndex)
            }}</el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="navbar_right">
        <div class="navbar_right-Lang">
          <LangSelect svgClass="svg" />
        </div>
        <div class="navbar_right-user">
          <el-dropdown>
            <div class="avatar-wrapper">
              <img src="https://zby909.top:9443/img/m10.jpg" class="user-avatar" />
              <span class="user-name">Tumour</span>
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LangSelect from '../LangSelect';
import { camelTolineSplit } from '@/utils/camel-tools';
export default {
  name: 'NavbarPage',
  components: { LangSelect },
  props: {},
  data() {
    return {
      activeIndex: 'tflList',
      menuList: [
        { nameIndex: 'globalSetting' },
        { nameIndex: 'statisticalVariables' },
        { nameIndex: 'statistic' },
        { nameIndex: 'master' },
        { nameIndex: 'tflList' },
      ],
    };
  },
  computed: {},
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        console.log('---navbar路由watch：----', to, from);
        this.activeIndex = to.name.charAt(0).toLowerCase() + to.name.slice(1);
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.toHome(key);
    },

    toHome(path) {
      this.$router.push({ path: '/project/' + camelTolineSplit(path) });
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 68px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(151, 151, 151, 0.15);
  padding: 0 44px 0 40px;
  background-color: #fff;
  z-index: 4;
  .navbar_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    .navbar_left {
      height: 100%;
      display: flex;
      align-items: center;
      .navbar_left-logo {
        width: 90px;
        height: 36px;
        cursor: pointer;
      }
      .navbar_left-menubox {
        height: 100%;
        ::v-deep .navbar_left-menu {
          margin-left: 46px;
          height: 100%;
          &.el-menu.el-menu--horizontal {
            border-bottom: none;
          }
          .el-menu-item {
            font-size: 16px;
            height: 100%;
            line-height: 65px;
            &.is-active {
              color: #222d3c;
              font-weight: 700;
            }
          }
        }
      }
    }

    .navbar_right {
      display: flex;
      align-items: center;
      ::v-deep .navbar_right-Lang {
        margin: 0 30px;
        cursor: pointer;
        .svg {
          width: 20px;
          height: 20px;
        }
      }
      .navbar_right-user {
        cursor: pointer;
        .avatar-wrapper {
          display: flex;
          align-items: center;
          .user-avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            object-fit: cover;
            box-shadow: 0 0 4px #979797;
          }
          .user-name {
            padding: 0 14px 0 8px;
            color: #222d3c;
            font-weight: 700;
          }
          i {
            color: #8897a9;
          }
        }
      }
    }
  }
}
</style>
