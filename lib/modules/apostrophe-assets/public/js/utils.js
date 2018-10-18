omUtils = {
  parseParams: function(query) {
    var re = /([^&=]+)=?([^&]*)/g;
    var decodeRE = /\+/g; // Regex for replacing addition symbol with a space
    var decode = function (str) {
      return decodeURIComponent(str.replace(/\+/g, ' '));
    };
    var params = {},
      e;

    if (query) {
      if (query.substr(0, 1) == '?') {
        query = query.substr(1);
      }
      while (e = re.exec(query)) {
        var k = decode(e[1]);
        var v = decode(e[2]);
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