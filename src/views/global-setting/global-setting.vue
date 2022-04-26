<!--
 * @Description:全局设置
 * @Author: zby
 * @Date: 2022-01-18 10:01:00
 * @LastEditors: zby
 * @Reference:
-->
<template>
  <div class="global_setting_page">
    <div class="global_setting_box" :class="{ isglobalSettingPage }">
      <div class="header">
        <div class="project_name">
          <GLIcon v-if="!showNextBtn" icon="icon-wenjian" />
          <i v-else class="el-icon-s-flag"></i>
          <span v-if="!showNextBtn">Study：janus-001</span>
          <span v-else>{{ $t('home.Lang_createNewProject') }}</span>
        </div>
        <div v-if="showNextBtn" class="project_status">
          <el-button @click="toBack" class="back" size="medium">{{ $t('home.Lang_giveUp') }}</el-button>
          <el-button @click="nextStep" class="next" size="medium" type="primary" :loading="nextLoading">{{ $t('home.Lang_nextStep') }}</el-button>
        </div>
      </div>
      <div class="con">
        <div class="project_information">
          <div class="tit">
            <div class="informationsvg"><GLIcon icon="icon-informationsvg" /></div>
            {{ $t('home.Lang_projectInformation') }}
          </div>
          <div class="information_info">
            <div class="item">
              <div class="item_name">Project</div>
              <el-select v-model="projectValue" :placeholder="`${$t('commonVariables.Lang_pleaseSelect')} Project`">
                <el-option v-for="item in projectOptions" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </div>
            <div class="item">
              <div class="item_name">Drug</div>
              <el-input v-model="drugValue" :placeholder="`${$t('commonVariables.Lang_pleaseInput')} Drug`"></el-input>
            </div>
            <div class="item">
              <div class="item_name">Phase</div>
              <el-select v-model="phaseValue" :placeholder="`${$t('commonVariables.Lang_pleaseSelect')} Phase`">
                <el-option v-for="item in phaseOptions" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </div>
            <div class="item">
              <div class="item_name">Type</div>
              <el-select v-model="typeValue" :placeholder="`${$t('commonVariables.Lang_pleaseSelect')} Type`">
                <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </div>
            <div class="item">
              <div class="item_name">Version</div>
              <el-input v-model="versionValue" :placeholder="`${$t('commonVariables.Lang_pleaseInput')} Version`"></el-input>
            </div>
            <div class="item">
              <div class="item_name">PM</div>
              <el-input v-model="PMValue" :placeholder="`${$t('commonVariables.Lang_pleaseInput')} PM`"></el-input>
            </div>
            <div class="item">
              <div class="item_name">Sponspr</div>
              <el-input v-model="sponsprValue" :placeholder="`${$t('commonVariables.Lang_pleaseInput')} Sponspr`"></el-input>
            </div>
            <div class="item">
              <div class="item_name">BO</div>
              <el-input v-model="BOValue" :placeholder="`${$t('commonVariables.Lang_pleaseInput')} BO`"></el-input>
            </div>
            <div class="item">
              <div class="item_name">Title</div>
              <el-input v-model="titleValue" :placeholder="`${$t('commonVariables.Lang_pleaseInput')} Title`"></el-input>
            </div>
          </div>
        </div>

        <div class="project_libname">
          <div class="tit">
            <div class="libnameshezhi"><GLIcon icon="icon-libnameshezhi" /></div>
            {{ $t('home.Lang_libNameSet') }}
          </div>
          <div class="libname_info">
            <div class="from_tit">
              <span class="name">{{ $t('home.Lang_name') }}</span>
              <span class="main_path">{{ $t('home.Lang_sasPath') }}</span>
              <span class="spec_path">{{ $t('home.Lang_specPath') }}</span>
              <div class="operation"></div>
            </div>
            <div class="from_item" v-for="(i, index) in libNameConfigArr" :key="index">
              <el-input class="item_name" v-model="i.name" :placeholder="`${$t('commonVariables.Lang_pleaseInput')} Name`"></el-input>
              <el-tooltip class="item" effect="dark" :content="i.sasPath" placement="bottom" :open-delay="1000">
                <div @click="selectSasPath(index)" class="item_main_path" :class="{ gray: !i.sasPath }">
                  {{ i.sasPath || 'select sas folder path' }}
                </div>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="i.specPath" placement="bottom" :open-delay="1000">
                <div @click="selectSpecPath(index)" class="item_spec_path" :class="{ gray: !i.specPath }">
                  {{ i.specPath || 'select spec file path' }}
                </div>
              </el-tooltip>
              <div class="close_btn"><i @click="delAddLib(index)" v-show="i.temporary" class="el-icon-close"></i></div>
            </div>
          </div>
          <div @click="addLibname" class="add_libname">
            <GLIcon class="tianjia" icon="icon-tianjia" />{{ $t('commonVariables.Lang_add') }} Libname
          </div>
        </div>

        <el-date-picker v-model="value1" type="date" placeholder="选择日期"> </el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron');
export default {
  name: 'global-setting',
  components: {},
  props: {
    showNextBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value1: '',
      projectOptions: [],
      projectValue: '',
      drugValue: '',
      phaseOptions: [],
      phaseValue: '',
      typeOptions: [],
      typeValue: '',
      versionValue: '',
      PMValue: '',
      sponsprValue: '',
      BOValue: '',
      titleValue: '',
      libNameConfigArr: [
        {
          name: '',
          sasPath: '',
          specPath: '',
          temporary: true,
        },
      ],

      isglobalSettingPage: false,
      nextLoading: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    if (this.$route.path === '/project/global-setting') {
      this.isglobalSettingPage = true;
    }
  },
  mounted() {},
  methods: {
    async selectSasPath(idx) {
      if (!this.libNameConfigArr[idx]?.temporary) return;
      const res = await ipcRenderer.invoke(
        'ipcDialog',
        'showOpenDialog',
        {
          properties: ['openDirectory'],
        },
        this.$thisBrowserId,
      );
      if (res.canceled) return;
      res.filePaths && res.filePaths[0] && (this.libNameConfigArr[idx].sasPath = res.filePaths[0]);
    },

    async selectSpecPath(idx) {
      if (!this.libNameConfigArr[idx]?.temporary) return;
      const res = await ipcRenderer.invoke(
        'ipcDialog',
        'showOpenDialog',
        {
          properties: ['openFile'],
        },
        this.$thisBrowserId,
      );
      if (res.canceled) return;
      res.filePaths && res.filePaths[0] && (this.libNameConfigArr[idx].specPath = res.filePaths[0]);
    },

    addLibname() {
      this.libNameConfigArr.push({
        name: '',
        sasPath: '',
        specPath: '',
        temporary: true,
      });
    },

    toBack() {
      this.$emit('clickBackBtn');
    },

    async nextStep() {
      // const suc = this.checkFrom(p);
      // if (!suc) return;
      this.nextLoading = true;
      setTimeout(() => {
        this.$router.push({ path: '/project/tfl-list' });
        this.nextLoading = false;
      }, 1000);
    },

    checkFrom(targetObj) {
      let flag = true;
      for (const i in targetObj) {
        if (!targetObj[i]) {
          flag = false;
          this.$g_message.error(`${i} is empty`);
          break;
        }
      }
      return flag;
    },

    delAddLib(idx) {
      if (this.libNameConfigArr.length === 1) return this.$g_message.warning(this.$t('home.Lang_minOne'));
      this.libNameConfigArr.splice(idx, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.global_setting_page {
  padding: 20px 40px;
  .global_setting_box {
    height: calc(100vh - 22px - 22px);
    box-sizing: border-box;
    overflow: scroll;
    background-color: #fff;
    background-color: #fff;
    box-shadow: 4px 5px 16px 0px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    border: 1px solid #eaecf0;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 32px;
      border-bottom: 1px solid #dcdfe6;
      .project_name {
        color: #131414;
        span {
          margin-left: 12px;
        }
      }
      .project_status {
        .next {
          margin-left: 35px;
        }
      }
    }
    .con {
      padding: 16px 32px;
      .tit {
        display: flex;
        align-items: center;
        color: #131414;
        padding-bottom: 11px;
        border-bottom: 1px solid #dcdfe6;
        margin-bottom: 16px;
        .informationsvg,
        .libnameshezhi {
          width: 27px;
          height: 27px;
          background: #116ef9;
          border-radius: 50%;
          color: #fff;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 6px;
        }
      }

      .project_information {
        margin-bottom: 20px;
        .information_info {
          display: flex;
          flex-wrap: wrap;
          .item {
            width: 17.6042vw;
            margin: 0 56px 20px 0;
            .item_name {
              color: #606266;
              margin-bottom: 6px;
            }
            .el-input,
            .el-select {
              width: 100%;
            }
          }
        }
      }

      .project_libname {
        margin-bottom: 25px;
        .libname_info {
          .from_tit,
          .from_item {
            display: flex;
          }
          .name,
          .main_path,
          .spec_path,
          .operation,
          .item_name,
          .item_main_path,
          .item_spec_path,
          .close_btn {
            height: 42px;
            line-height: 42px;
            margin: 0 16px 8px 0;
          }
          .name,
          .item_name {
            flex: 1 400px;
          }
          .main_path,
          .spec_path,
          .item_main_path,
          .item_spec_path {
            flex: 1 667px;
          }
          .operation,
          .close_btn {
            width: 30px;
            margin-right: 0;
            i {
              vertical-align: middle;
              font-size: 20px;
              cursor: pointer;
              &:hover {
                color: #116ef9;
              }
            }
          }
          .from_item {
            .item_main_path,
            .item_spec_path {
              box-sizing: border-box;
              cursor: pointer;
              background: #f8fafb;
              border-radius: 4px;
              border: 1px solid #dcdfe6;
              padding: 0 8px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
          .gray {
            color: #c8c8c8;
          }
        }
        .add_libname {
          width: 100%;
          height: 48px;
          border-radius: 4px;
          border: 1px dashed #dcdfe6;
          line-height: 48px;
          text-align: center;
          color: #45566c;
          margin-top: 24px;
          cursor: pointer;
          &:hover {
            color: #116ef9;
          }
          .tianjia {
            margin-right: 18px;
          }
        }
      }
    }
  }

  .isglobalSettingPage {
    height: calc(100vh - 22px - 22px - 68px);
  }

  ::v-deep input {
    height: 42px;
    background-color: #f8fafb;
  }
}
</style>
