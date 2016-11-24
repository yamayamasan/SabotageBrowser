var fs     = require('fs');
var crypto = require('crypto');
const Util = (function(){
  function Util() {
    if (Util._instance) throw new Error('use getInstance function');
    Util._instance = this;
    this.ee = {
      start: document.querySelector('#start'),
      main: document.querySelector('#main'),
      mainweb: document.querySelector('#mainweb'),
      sub: document.querySelector('#sub'),
      subweb: document.querySelector('#subweb'),
    };
    this.cls = {
      hd: 'hide_block'
    };
  }

  Util.getInstance = function() {
    if (Util._instance === null) {
      Util._instance = new Util();
    }
    return Util._instance;
  };

  Util.prototype.toggleSubWindow = function(show) {
    var self = this;
    if (!show) {
      if (this.hasClass(this.ee.sub, this.cls.hd)) {
        show = true;
      } else {
        show = false;
      }
    }
    this.ee.start.classList.add(this.cls.hd);
    if (show) {
      this.ee.main.classList.add(this.cls.hd);
      this.ee.sub.classList.remove(this.cls.hd);
    } else {
      this.ee.main.classList.remove(this.cls.hd);
      this.ee.sub.classList.add(this.cls.hd);
    }
  }

  Util.prototype.click = function(t) {
    document.querySelector(t).click();
  };

  Util.prototype.saveFile = function(file, data) {
    fs.writeFileSync(file, JSON.stringify(data));
  };

  Util.prototype.generateKey = function(t, s) {
    const hash = crypto.createHmac('sha256', s).update(t).digest('hex');
    return hash;
  };

  Util.prototype.hasClass = function (e, c) {
    return (' ' + e.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + c + ' ') !== -1;
  };

  Util._instance = null;
  return Util;
}());

const UtilMenus = (function(){
  function UtilMenus() {
    if (UtilMenus._instance) throw new Error('use getInstance function');

    this.menus = {};
    UtilMenus._instance = this;
    this.loadJson();
  };

  UtilMenus.getInstance = function() {
    if (UtilMenus._instance === null) {
      UtilMenus._instance = new UtilMenus();
    }
    return UtilMenus._instance;
  };

  UtilMenus.prototype.updateJson = function() {
    evt.emit('menuUpdate');
  };

  UtilMenus.prototype.loadJson = function() {
    this.menus = require('./datas/menus.json');
    if (!this.menus.radio) {
      this.menus = {
        radio: {}
      }
    }
  };

  UtilMenus.prototype.setMenus = function() {

  };

  UtilMenus.prototype.getMenus = function(all) {
    if (all) {
      return this.menus;
    }
    return this.menus[Object.keys(this.menus)[0]];
  };
  UtilMenus._instance = null;
  return UtilMenus;
}());
