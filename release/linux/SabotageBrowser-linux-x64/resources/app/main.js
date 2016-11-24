'use strict';
const {app, BrowserWindow, Menu, globalShortcut} = require('electron');
const os = require('os');

let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});


// set falsh player
app.commandLine.appendSwitch('ppapi-flash-path', __dirname + '/plugins/libpepflashplayer.so');
app.commandLine.appendSwitch('ppapi-flash-version', '22.0.0.209');

// ready
app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  checkMem();
  installMenu();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

});

function checkMem() {
  const totalMem = getTotalMem();
  const startMem = getMemRss();
  setInterval(() => {
    let mem = getMemRss();
    if (mem > (startMem * 4)) {
     let diff = totalMem - mem;
     console.log(toM(totalMem), toM(mem), toM(diff));
    }
  }, 3000);
}

function getTotalMem() {
  return os.totalmem();
}

function getMemRss() {
  const mem = process.memoryUsage();
  return mem.rss;
}

function toM(by) {
  return by / (1000 * 1000);
}

/*
let times = setInterval(() => {
  const pm = process.getProcessMemoryInfo();
  const sm = process.getSystemMemoryInfo();
}, 3000);
*/
function installMenu() {
  let temp;
  temp = [
    {
      label: 'ファイル',
      submenu: [
        {
          label: '再読み込み',
          accelerator: 'CmdOrCtrl+R',
          click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.reload();
          }
        },
        {
          label: '終了',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
      ]
    },
    {
      label: '表示',
      submenu: [
        {
          label: '最小化',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: '全画面表示',
          accelerator: (function() {
            if (process.platform == 'darwin')
              return 'Ctrl+Command+F';
            else
              return 'F11';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
        {
          label: 'DeveloperTools起動',
          accelerator: (function() {
            if (process.platform == 'darwin')
              return 'Alt+Command+I';
            else
              return 'Ctrl+Shift+I';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.toggleDevTools();
          }
        },
      ]
    },
    {
      label:'設定',
      submenu: [
        
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(temp);
  Menu.setApplicationMenu(menu);
}

