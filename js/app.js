(function($){
  $('#open').sideNav({
    menuWidth: 380,
    edge: 'rgiht'
  });
  $('#close-side').on('click', function(){
    $('#open').sideNav('hide');
  });
})($);
const mainWeb = new WebUtil('#mainweb');
const _ = require('lodash');
const util = Util.getInstance();
const menus = [
  {
    label: 'チャンネルボタンの表示',
    type: 'checkbox',
    checked: true,
    click: function(e) {
      const open = $('#open');
      if (!e.checked) {
         open.hide();
       } else {
         open.show();
       }
    }
  },
  {
    label: 'チャンネルの追加',
    click: function(e) {
      $('#open').click();
      $('div#form-block').removeClass('hide_form');
    }
  },
  {
    label: 'チャンネル',
    submenu: []
  },
  {
    label: 'チャンネル一覧',
    accelerator: 'Shift+B',
    click: function() {
      $('#open').click();
    }
  },
  {type: 'separator'},
  {
    label: 'サブウィンドウ',
    type: 'checkbox',
    accelerator: 'Ctrl+Shift+S',
    checked: false,
    click: function(e) {
      util.toggleSubWindow();
    }
  },
  {type: 'separator'},
  {
    label: '戻る',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  },
  {
    label: '進む',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  },
  {type: 'separator'},
  {
    label: '切り取り',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  },
  {
    label: 'コピー',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  },
  {
    label: '貼り付け',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  },
  {
    label: '全て選択',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  },
  {type: 'separator'},
  {
    label: 'ページ戻る',
    accelerator: 'Ctrl+Left',
    click: function(e) {
      mainWeb.back();
    }
  },
  {type: 'separator'},
  {
    label: 'スタート画面に戻る',
    click: function(e) {
      $("#mainweb").attr('src', null);
      if ($('#start').hasClass('hide_block')) {
        $('#start').removeClass('hide_block');
        $('#main').addClass('hide_block');
      }
    }
  },
  {
    label: '終了',
    role: 'close'
  }
];

function eMenu() {
  const remote = require('electron').remote;
  const Menu = remote.Menu;
  const MenuItem = remote.MenuItem;

  const menu = new Menu();
  // var _menus = _setChannels(menus);
  menus.forEach(function(m, idx){
    if (m.label == 'チャンネル') {
      m = _setChannel(m);
    }
    menu.append(new MenuItem(m));
  });

  window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    menu.popup(remote.getCurrentWindow());
  }, false);
}

function _setChannel(menu) {
  const utilmenus = UtilMenus.getInstance();
  const channels = utilmenus.getMenus();
  var c = 1;
  _.forEach(channels, function(ch, key){
    menu.submenu.push({
      label: ch.label,
      accelerator: `Ctrl+${c}`,
      click: function() {
        $("#mainweb").attr('src', ch.url);
        if ($('#main').hasClass('hide_block')) {
          $('#main').removeClass('hide_block');
          $('#start').addClass('hide_block');
        }
      }
    });
    c++;
  });
  return menu;
}

evt.on('menuUpdate', function(){
  eMenu();
  console.log("menuUpdate");
});

/**
 * depricate
 */
function _setChannels(menus) {
  _.forEach(menus, function(menu, idx){
    if (menu.label == 'チャンネル'){
      const utilmenus = UtilMenus.getInstance();
      const channels = utilmenus.getMenus();
      var c = 1;
      _.forEach(channels, function(ch, key){
        menu.submenu.push({
          label: ch.label,
          accelerator: `Ctrl+${c}`,
          click: function() {
            $("#mainweb").attr('src', ch.url);
            if ($('#main').hasClass('hide_block')) {
              $('#main').removeClass('hide_block');
              $('#start').addClass('hide_block');
            }
          }
        });
        c++;
      });
    }
  });
  return menus;
}

function webviewEvent() {
  var w = document.getElementById('mainweb');
  const shell = require('electron').shell;
}
eMenu();
webviewEvent();

$(document).keydown((e) => {
  console.log(e)
  // Ctrl+Shift+S
  if (e.shiftKey && e.ctrlKey && e.keyCode === 83) {
    util.toggleSubWindow();
  }
  // Ctrl+←(Left)
  if (e.ctrlKey && e.keyCode === 37) {
    mainWeb.back();
  }
});
