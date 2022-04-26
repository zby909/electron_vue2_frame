const IS_PROD = ['production'].includes(process.env.VUE_APP_MODE);
module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  productionSourceMap: IS_PROD ? false : true,
  assetsDir: 'static',
  lintOnSave: 'default', //default,warning,error,boolean
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
    open: false, // 是否打开浏览器
    host: '0.0.0.0',
    port: '8080',
    proxy: {
      '/': {
        target: 'https://zby909.top:3001', // 要代理的域名
        changeOrigin: true, //允许跨域
        // pathRewrite: {
        //   '^/': '',
        // },
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/variables.scss";`,
      },
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000, // 提取出的新chunk在两次压缩(打包压缩和服务器压缩)之前要大于30kb
        minChunks: 1, //当一个包至少被用了多少次的时候才进行代码分割 ，默认1
        maxAsyncRequests: 10,
        maxInitialRequests: 10,
        cacheGroups: {
          // 后续需要拆分的在最后加上
          default: {
            reuseExistingChunk: true, // 可设置是否重用已用chunk 不再创建新的chunk
            priority: 1, // 缓存组优先级
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
          },
          vue: {
            name: 'vue',
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            priority: 3,
          },
          vuex: {
            name: 'vuex',
            test: /[\\/]node_modules[\\/]vuex[\\/]/,
            priority: 4,
          },
          'vue-router': {
            name: 'vue-router',
            test: /[\\/]node_modules[\\/]vue-router[\\/]/,
            priority: 5,
          },
          elementUI: {
            name: 'chunk-elementui',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            priority: 6,
          },
          echarts: {
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            priority: 6,
          },
          vxeTable: {
            name: 'chunk-vxeTable',
            test: /[\\/]node_modules[\\/]vxe-table[\\/]/,
            priority: 7,
          },
        },
      },
    },
  },

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'TFL v' + process.env.npm_package_version;
      return args;
    });
  },

  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true, // 此处设为true即可
      builderOptions: {
        productName: 'TFL',
        asar: true, //是否使用asar压缩
        compression: 'store', //压缩率
        //复制指定文件到指定位置
        extraResources: [
          {
            from: './define_server',
            to: '../define_server', //默认打包到resources目录下  所以这里使用了../ ，以打包到根目录
          },
        ],
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          // installerIcon: './build/icons/aaa.ico', // 安装图标
          // uninstallerIcon: './build/icons/bbb.ico', //卸载图标
          // installerHeaderIcon: './build/icons/aaa.ico', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          // shortcutName: 'xxxx', // 图标名称
          // "include": "build/script/installer.nsh", // 包含的自定义nsis脚本
        },
      },
    },
  },
};
