var WebUtil = (function () {
    function WebUtil(target) {
      this.ee = document.querySelector(target);
    }

    WebUtil.prototype.back = function () {
      this.ee.goBack();
    };

    return WebUtil;
}());
