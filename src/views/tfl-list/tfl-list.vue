<!--
 * @Description:tfl列表
 * @Author: zby
 * @Date: 2021-12-28 15:00:28
 * @LastEditors: zby
 * @Reference:
-->
<template>
  <div class="tfl_list_page">
    <div class="tfl_list_box">
      <div class="btns">
        <el-button @click="openChildWin" class="btns_add" type="primary" size="medium">Open childWin</el-button>
        <el-button class="btns_load" size="medium">RunAll</el-button>
      </div>
      <div class="table">
        <!-- 表格区域 -->
        <vxe-table
          ref="xTable"
          border
          round
          keep-source
          show-overflow
          max-height="100%"
          :row-config="{ isHover: true, isCurrent: true }"
          :sort-config="{ trigger: 'cell' }"
          :keyboard-config="{ isArrow: true }"
          :data="tableData"
          :scroll-y="{ gt: 100 }"
          @filter-visible="filterVisibleEvent"
          @filter-change="filterChangeEvent"
          :edit-config="{ trigger: 'manual', mode: 'row', autoClear: false }"
          :loading="loading"
        >
          <!-- max-height="100%" -->
          <vxe-column field="id" title="ID" sortable width="60"></vxe-column>

          <vxe-column title="TFL No" sortable :filters="[{ data: '' }]" :filter-method="filterTflNoMethod" min-width="110">
            <template #filter="{ $panel, column }">
              <vxe-input
                v-for="(option, index) in column.filters"
                :key="index"
                v-model="option.data"
                @input="$panel.changeOption($event, !!option.data, option)"
                @keyup.enter="$panel.confirmFilter()"
                clearable
              ></vxe-input>
            </template>
            <template #default="{ row }">
              <el-button type="text">{{ row.tflNo }}</el-button>
            </template>
          </vxe-column>

          <vxe-column
            field="title"
            title="Title"
            sortable
            :filters="[{ data: '' }]"
            :filter-method="filterTitleMethod"
            :edit-render="{ name: 'textarea' }"
            min-width="110"
          >
            <template #filter="{ $panel, column }">
              <vxe-input
                v-for="(option, index) in column.filters"
                :key="index"
                v-model="option.data"
                @input="$panel.changeOption($event, !!option.data, option)"
                @keyup.enter="$panel.confirmFilter()"
                clearable
              />
            </template>
          </vxe-column>

          <vxe-column field="status" title="Status" sortable width="155"></vxe-column>

          <vxe-column
            field="location"
            title="Location"
            sortable
            :filters="[
              { label: 'Origin', value: 'Origin' },
              { label: 'Local', value: 'Local' },
            ]"
            :filter-multiple="true"
            width="120"
          ></vxe-column>

          <vxe-column title="Label" width="300">
            <template #default="{ row }">
              <div class="tag_box">
                <el-tag v-for="(i, idx) in [...row.label, ...row.label]" :key="idx">{{ i }}</el-tag>
              </div>
            </template>
          </vxe-column>

          <vxe-column :title="$t('home.Lang_projectOperation')" width="200">
            <template #default="{ row }">
              <el-button type="text">{{ $t('home.Lang_copyfb') }}</el-button>
              <el-button class="delete_btn" type="text">{{ $t('commonVariables.Lang_delete') }}</el-button>
              <template v-if="$refs.xTable.isActiveByRow(row)">
                <el-button class="save_btn" @click="saveRowEvent(row)" type="text">{{ $t('commonVariables.Lang_save') }}</el-button>
                <el-button class="cancel_btn" @click="cancelRowEvent(row)" type="text">{{ $t('commonVariables.Lang_cancel') }}</el-button>
              </template>
              <template v-else>
                <el-button @click="editRowEvent(row)" type="text">{{ $t('commonVariables.Lang_edit') }}</el-button>
              </template>
            </template>
          </vxe-column>
        </vxe-table>
      </div>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron');
import { getParam } from '@/utils/http-tools';
export default {
  name: 'tfl-list',
  components: {},
  props: {},
  data() {
    return {
      projectId: '',
      loading: false,
      tableData: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    ipcRenderer.on('imChildInfo', (e, v) => {
      console.log('子窗口传递的信息', v);
    });
    this.projectId = getParam('projectId');
    this.findList();
  },
  mounted() {},
  destroyed() {
    ipcRenderer.removeAllListeners('imChildInfo');
  },
  methods: {
    /* mock data */
    findList() {
      this.loading = true;
      setTimeout(() => {
        const list = [
          {
            id: 1,
            tflNo: 'Table 14.1.1.1',
            title: '人口学特征',
            status: 'Ongoing',
            location: 'Local',
            label: ['label1', 'label2'],
          },
          { id: 2, tflNo: 'Table 14.1.1.2', title: '人口学特征', status: 'Alignment inconsiste', location: 'Local', label: ['label1', 'label2'] },
          { id: 3, tflNo: 'Table 14.1.1.3', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 4, tflNo: 'Table 14.1.1.4', title: '人口学特征', status: 'Ongoing', location: 'Local', label: ['label1', 'label2'] },
          { id: 5, tflNo: 'Table 14.1.1.5', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 6, tflNo: 'Table 14.1.1.6', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 7, tflNo: 'Table 14.1.1.7', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 8, tflNo: 'Table 14.1.1.8', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 9, tflNo: 'Table 14.1.1.9', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 10, tflNo: 'Table 14.1.1.10', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 11, tflNo: 'Table 14.1.1.11', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 12, tflNo: 'Table 14.1.1.12', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 13, tflNo: 'Table 14.1.1.13', title: '人口学特征', status: 'Alignment inconsiste', location: 'Origin', label: ['label1', 'label2'] },
          { id: 14, tflNo: 'Table 14.1.1.14', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 15, tflNo: 'Table 14.1.1.15', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 16, tflNo: 'Table 14.1.1.16', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 17, tflNo: 'Table 14.1.1.17', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 18, tflNo: 'Table 14.1.1.18', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 19, tflNo: 'Table 14.1.1.19', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
          { id: 20, tflNo: 'Table 14.1.1.20', title: '人口学特征', status: 'Ongoing', location: 'Origin', label: ['label1', 'label2'] },
        ];
        this.tableData = list;
        this.loading = false;
      }, 300);
    },

    //创建子窗口
    async openChildWin() {
      let cid = await ipcRenderer.invoke('createNewWindow', {
        browserWindowOpt: {
          useContentSize: true,
          width: 1366,
          height: 768,
          minWidth: 1280,
          minHeight: 720,
          parentWinId: this.$thisBrowserId,
        },
        windowId: this.$windowId,
        hashRoute: '#/testChildWin',
        initData: { zby: 123 },
      });
      console.log(cid);
    },

    filterVisibleEvent({ column, visible }) {
      console.log(`${column.property} ${visible ? '打开' : '关闭'}筛选面板`);
    },
    filterChangeEvent({ column }) {
      console.log(`${column.property} 筛选了数据`);
    },

    filterTflNoMethod({ option, row }) {
      console.log(option, row);
      return row.tflNo.indexOf(option.data) !== -1;
    },

    filterTitleMethod({ option, row }) {
      console.log(option, row);
      return row.title.indexOf(option.data) !== -1;
    },

    /* edit row start */
    editRowEvent(row) {
      const $table = this.$refs.xTable;
      $table.setActiveRow(row);
    },
    saveRowEvent() {
      const $table = this.$refs.xTable;
      $table.clearActived().then(() => {
        this.$g_message.success('保存成功！');
      });
    },
    cancelRowEvent(row) {
      const $table = this.$refs.xTable;
      $table.clearActived().then(() => $table.revertData(row));
    },
    /* edit row end */
  },
};
</script>
<style lang="scss" scoped>
.tfl_list_page {
  padding: 20px 40px;
  .tfl_list_box {
    box-sizing: border-box;
    padding: 32px 20px;
    background-color: #fff;
    box-shadow: 4px 5px 16px 0px rgba(0, 0, 0, 0.04);
    border: 1px solid #eaecf0;
    border-radius: 4px;
    .btns {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 15px;
      .btns_add {
        background: #116ef9;
      }
      .btns_load {
        background: #f2f3f5;
        margin-left: 16px;
      }
    }

    ::v-deep .table {
      height: calc(100vh - 68px - 40px - 64px - 2px - 36px - 15px);
      .vxe-table--header-wrapper thead .vxe-header--row .col--last {
        background-size: 0px 100%, 100% 1px;
      }
      .vxe-table--body-wrapper tbody .vxe-body--row .col--last {
        background-size: 0px 100%, 100% 1px;
      }

      .tag_box {
        .el-tag + .el-tag {
          margin-left: 10px;
        }
      }

      .disabled {
        color: #999;
      }

      .delete_btn {
        color: #f56c6c;
      }

      .save_btn {
        color: #67c23a;
      }

      .cancel_btn {
        color: #909399;
      }
    }
  }
}
</style>
