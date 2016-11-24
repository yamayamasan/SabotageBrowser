<menu>
  <div>
    {message}
  </div>
  <li class="collection-item">
    <a href="#!" onclick={openForm}><i class="material-icons">mode_edit</i>ADD</a>
    <div class="row hide_form" id="form-block">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input id="name" type="text" class="validate" maxlength="12">
            <label for="name">名前:12文字まで</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="url" type="text" class="validate">
            <label for="url">URL</label>
          </div>
        </div>
        <div class="row center-align">
          <button type="button" onclick={addItem} class="waves-effect waves-light btn">保存</button>
        </div>
      </form>
    </div>
  </li>
  <li class="collection-item" each={item in items}>
      <a onclick={gotoPage} data-url={item.url} class="side-collection-a" id="item_{item.key}">
        <i class="material-icons">play_arrow</i>
        <span>{item.label}</span>
      </a>
      
      <a href="#!" onclick={removeItem} data-key={item.key} class="secondary-content side-collection-a">
        <i class="material-icons">delete</i>
      </a>
  </li>
       
  <script>
    const um = UtilMenus.getInstance();
    const crypto = require('crypto');
    const fs     = require('fs');
    const json   = um.getMenus(true);
    const _      = require('lodash');
    
    const self = this;
    const webview = $('#mainweb');
    const main = $('#main');
    const sub = $('#sub');
    let form = null;

    const viewList = function(datas) {
      var list = [];
      _.forEach(datas, function(data, idx){
        list.push({
          key: idx,
          label: data.label,
          url: data.url,
        });
      });
      self.items = list;
    };

    this.removeItem = function(e) {
      const key = e.currentTarget.getAttribute('data-key');
      var list = {};
      _.forEach(json.radio, function(data, idx){
        if (idx !== key) {
          list[idx] = data;
        }
      });
      json.radio = list;
      saveFile('./datas/menus.json', json);
      um.updateJson();
      viewList(json.radio);
    };

    this.addItem = function(e) {
      const name = $('#name');
      const url = $('#url');
      const key = generateKey(url.val(), name.val());

      if (!invalid()) {
        return false;
      }
      json.radio[key] = {
        label: name.val(),
        url: url.val()
      };
      saveFile('./datas/menus.json', json);
      viewList(json.radio);
      self.openForm();
      name.val('');
      url.val('');
    };

    this.gotoPage = function(e) {
      const url = e.currentTarget.getAttribute('data-url');
      webview.attr('src', url);
      click("#close-side");
      if (main.hasClass('hide_block')) {
        main.removeClass('hide_block');
        $('#start').addClass('hide_block');
        $('#sub').addClass('hide_block');
      }
    };

    this.openForm = function(e) {
      if (!form) form = $('div#form-block');
      form.toggleClass('hide_form');
    };

    const invalid = function() {
      const name = $('#name').val();
      const url = $('#url').val();

      if (name == '' || url == '') {
        self.message = 'Error';
        return false;
      }
      return true;
    };

    const click = function(target) {
      document.querySelector(target).click();
    };

    const saveFile = function(file, data) {
      fs.writeFileSync(file, JSON.stringify(data));
    };

    const generateKey = function(url, s) {
      const hash = crypto.createHmac('sha256', s).update(url).digest('hex');
      return hash;
    };

    const shortcutChannel = function(e) {
      if (!e.ctrlKey) return;
      var keyInt = parseInt(e.key);
      if (Number.isNaN(keyInt)) return;
      var c = 1;
      self.items.forEach(function(item){
        if (c === keyInt) {
          var id = `#item_${item.key}` 
          click(id);
        }
        c++;
      });
    }

    function keyBind() {
      $(document).keydown(function(e) {
        shortcutChannel(e);
      });
    }
    viewList(json.radio);
    keyBind();
  </script>
</menu>
