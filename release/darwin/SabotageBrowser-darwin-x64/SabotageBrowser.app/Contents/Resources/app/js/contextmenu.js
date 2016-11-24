const ContextMenu = (function(){
  function ContextMenu() {
    if (ContextMenu._instance) throw new Error('use getInstance function');
    ContextMenu._instance = this;

  }

  ContextMenu.getInstance = function() {
    if (Util._instance === null) {
      Util._instance = new Util();
    }
    return Util._instance;
  };

  ContextMenu.prototype.set = function() {
    
  }

  ContextMenu.prototype.menus = function(t) {
        this.menus = [
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
      {type: 'separator'},
      {
        label: 'サブウィンドウ',
        type: 'checkbox',
        checked: false,
        click: function(e) {

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
    ]
  };

  ContextMenu._instance = null;
  return ContextMenu;
}());