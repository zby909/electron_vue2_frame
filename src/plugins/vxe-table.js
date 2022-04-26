import Vue from 'vue';
import 'xe-utils';
import {
  // 功能模块
  Icon,
  Filter,
  // Menu,
  Edit,
  // Export,
  Keyboard,
  // Validator,
  Header,
  // Footer,

  // 可选组件
  Column,
  // Colgroup,
  // Grid,
  // Toolbar,
  // Pager,
  // Checkbox,
  // CheckboxGroup,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Input,
  // Textarea,
  // Button,
  // Modal,
  // Tooltip,
  // Form,
  // FormItem,
  // FormGather,
  // Select,
  // Optgroup,
  // Option,
  // Switch,
  // List,
  // Pulldown,

  // 表格
  Table,
} from 'vxe-table';

// 表格功能
Vue.use(Header)
  // .use(Footer)
  .use(Icon)
  .use(Filter)
  .use(Edit)
  // .use(Menu)
  // .use(Export)
  .use(Keyboard)
  // .use(Validator)

  // 可选组件
  .use(Column)
  // .use(Colgroup)
  // .use(Grid)
  // .use(Toolbar)
  // .use(Pager)
  // .use(Checkbox)
  // .use(CheckboxGroup)
  // .use(Radio)
  // .use(RadioGroup)
  // .use(RadioButton)
  // .use(Input)
  // .use(Textarea)
  // .use(Button)
  // .use(Modal)
  // .use(Tooltip)
  // .use(Form)
  // .use(FormItem)
  // .use(FormGather)
  // .use(Select)
  // .use(Optgroup)
  // .use(Option)
  // .use(Switch)
  // .use(List)
  // .use(Pulldown)

  // 安装表格
  .use(Table);

// 给 vue 实例挂载内部对象，例如：
// Vue.prototype.$XModal = VXETable.modal
// Vue.prototype.$XPrint = VXETable.print
// Vue.prototype.$XSaveFile = VXETable.saveFile
// Vue.prototype.$XReadFile = VXETable.readFile
