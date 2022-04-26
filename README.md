## Project setup

```
npm install 安装依赖
```

### Compiles and hot-reloads for development

```
npm run electron:serve 运行本地代理development环境
```

### Compiles and minifies for production

```
npm run electron:build_prod 正式环境打包
npm run electron:build_test 测试环境打包（带控制台）
```

## Tips

如果执行 npm i 后，运行 npm run electron:serve 出现 electron 相关报错，请尝试执行以下步骤:

1. 终端运行： npm config set ELECTRON_MIRROR "https://cdn.npm.taobao.org/dist/electron/"
2. 删除 node_modules 文件夹 重新执行 npm i 后，再次尝试运行项目。

若启动项目需要等待 5 次超时才能进入，请尝试打开项目前挂一次梯子即可。

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
