(function () {
  var request = new XMLHttpRequest();
  request.open('GET', 'bundle.js.gz');
  // request.responseType = 'arraybuffer';
  request.onload = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        // var inflate = pako.inflate(this.response, { to: 'string' });
        try {
          // inflate = inflate.replace('/*! For license information please see bundle.js.LICENSE.txt */','').replace(/\r?\n/g, "");
          // var file = JSON.parse(inflate);
          // eval(inflate);
          eval(this.response);
        } catch (e) {
          debugger;
        }
      }
    }
  };
  request.send(null);
})();
