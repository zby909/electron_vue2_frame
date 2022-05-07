'use strict';
import { app, protocol, BrowserWindow, ipcMain, Menu, dialog } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';

// Warning! This module has many subtle pitfalls. There is almost always a better way to accomplish your task than using this module. For example, ipcRenderer.invoke can serve many common use cases.
// import * as remoteMain from '@electron/remote/main';
// remoteMain.initialize();

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);
const IS_PROD = ['production'].includes(process.env.VUE_APP_MODE);
import generateUUID from '@/utils/guid';

//只允许打开一个应用实例
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => createWindow());
}

//第一个主窗口
async function createWindow() {
  await createNewWindow({
    browserWindowOpt: {
      useContentSize: true,
      width: 1366,
      height: 768,
      minWidth: 1280,
      minHeight: 720,
    },
    windowId: generateUUID(),
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//关于 window-all-closed 和 will-quit 事件之间的差异, 请参见事件的说明：https://www.electronjs.org/zh/docs/latest/api/app#%E4%BA%8B%E4%BB%B6-window-all-closed
app.on('will-quit', () => {});

// This method will be called when Electron has finished // initialization and is ready to create browser windows. // Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (!IS_PROD) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  //TODO
  createMenu();
  !IS_PROD ? createWindow() : createWindow(); //这里可以在正式环境的时候配置启动本地服务器
});

// Exit cleanly on request from parent process in development mode.
if (!IS_PROD) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

/* -- 自定义渲染进程和主进程的一些通信函数 -- */

//窗口通信中转 eName自定义事件名称 toBrowserWindowId要发送到的窗口id data发送的数据
ipcMain.on('windowIpc', (event, eName = '', { toBrowserWindowId, data = {} } = {}) => {
  toBrowserWindowId && BrowserWindow.fromId(toBrowserWindowId).webContents.send(eName, data);
});

//关闭窗口 browserWindowId需要关闭的窗口id type关闭模式close普通关闭destroy强制关闭（区别请查阅文档）
ipcMain.on('closeThisWin', (event, { browserWindowId, type = 'close' }) => {
  const thisBw = BrowserWindow.fromId(browserWindowId);
  type === 'close' ? thisBw.close() : thisBw.destroy();
});

//打开dialog选路径 eName支持的事件 opt配置 browserWindowId父窗口id  https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowsavedialogbrowserwindow-options
ipcMain.handle('ipcDialog', async (event, eName, opt, browserWindowId = null) => {
  let result;
  if (browserWindowId) result = await dialog[eName](BrowserWindow.fromId(browserWindowId), opt);
  if (!browserWindowId) result = await dialog[eName](opt);
  return result;
});

//获取指定窗口的父窗口id browserWindowId窗口id
ipcMain.handle('getParentWindowId', async (event, browserWindowId) => {
  const result = await BrowserWindow.fromId(browserWindowId).getParentWindow();
  return result ? result.id : null;
});

//创建新窗口
ipcMain.handle('createNewWindow', async (event, opt) => {
  const result = await createNewWindow(opt);
  return result;
});

/**
 * @description: 创建窗口
 * @param {*Object} browserWindowOpt 配置项
 * @param {*Object?} webPreferences
 * @param {*String} windowId 应用单例的token(父子共用)
 * @param {*String?} hashRoute 打开窗口的默认路由位置默认首页
 * @param {*?} initData 初始化数据 用ipcRenderer接收
 */
const createNewWindow = async ({ browserWindowOpt, webPreferences = {}, windowId, hashRoute = '', initData } = {}) => {
  //如果是希望创建子窗口，需具有parentWinId属性说明是想基于哪个窗口创建子窗口
  if (browserWindowOpt.parentWinId) {
    browserWindowOpt.parent = BrowserWindow.fromId(Number(browserWindowOpt.parentWinId));
    delete browserWindowOpt['parentWinId'];
  }
  const initWebPreferences = {
    // preload: preloadFile() + '\\bridge.js', // 在页面运行其他脚本之前预先加载指定的脚本 无论页面是否集成Node, 此脚本都可以访问所有Node API 脚本路径为文件的绝对路径
    nodeIntegration: true, //process.env.ELECTRON_NODE_INTEGRATION
    contextIsolation: false, //!process.env.ELECTRON_NODE_INTEGRATION
    webSecurity: false, //允许跨域
  };
  Object.assign(initWebPreferences, webPreferences);
  let xWindow = new BrowserWindow({
    ...browserWindowOpt,
    webPreferences: initWebPreferences,
  });
  // remoteMain.enable(xWindow.webContents);

  xWindow.on('close', event => {
    if (!browserWindowOpt.parent) {
      event.preventDefault();
      xWindow.webContents.send('beforeClose', '');
    }
  });

  xWindow.on('closed', () => (xWindow = null));

  let pagePath;
  let parentWinId = xWindow.getParentWindow() ? xWindow.getParentWindow().id : null;
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    pagePath = hashRoute ? `${process.env.WEBPACK_DEV_SERVER_URL}${hashRoute}` : `${process.env.WEBPACK_DEV_SERVER_URL}#/`;
    pagePath += `?windowId=${windowId}&port=${4000}&thisBrowserId=${xWindow.id}&parentWinId=${parentWinId}`;
  } else {
    createProtocol('app');
    pagePath = hashRoute ? `app://./index.html${hashRoute.replace('/app:/./', '')}` : `app://./index.html#/`;
    pagePath += `?windowId=${windowId}&port=${4000}&thisBrowserId=${xWindow.id}&parentWinId=${parentWinId}`;
  }
  await xWindow.loadURL(pagePath); //页面已经加载完成
  console.log('准备打开窗口的路由', pagePath);
  if (!IS_PROD) xWindow.webContents.openDevTools();
  xWindow.show();

  initData && xWindow.webContents.send('initData', initData); //自定义初始化参数
  console.log('准备打开窗口的id', xWindow.id);

  return xWindow.id;
};

// 设置菜单栏
function createMenu() {
  // darwin表示macOS，针对macOS的设置
  if (process.platform === 'darwin') {
    const template = [
      {
        label: 'App Demo',
        submenu: [
          {
            role: 'about',
          },
          {
            role: 'quit',
          },
        ],
      },
    ];
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(null);
  }
}
