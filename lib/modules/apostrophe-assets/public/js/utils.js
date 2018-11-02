window.omUtils = {
  parseParams: function (query) {
    var re = /([^&=]+)=?([^&]*)/g;
    var decode = function (str) {
      return decodeURIComponent(str.replace(/\+/g, ' '));
    };
    var params = {};
    var e, k, v;

    if (query) {
      if (query.substr(0, 1) === '?') {
        query = query.substr(1);
      }
      while (true) {
        e = re.exec(query);
        if (!e) {
          break;
        }
        k = decode(e[1]);
        v = decode(e[2]);
        if (params[k] !== undefined) {
          if (!$.isArray(params[k])) {
            params[k] = [params[k]];
          }
          params[k].push(v);
        } else {
          params[k] = v;
        }
      }
    }
    return params;
  }
};
