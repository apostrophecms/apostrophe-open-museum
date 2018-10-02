module.exports = deep;

function deep (obj, path, value) {
  if (arguments.length === 3) return set.apply(null, arguments);
  return get.apply(null, arguments);
}

function get (obj, path) {
  var keys = path.split('.');
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!obj || !hasOwnProperty.call(obj, key)) {
      obj = undefined;
      break;
    }
    obj = obj[key];
  }
  return obj;
}

function set (obj, path, value) {
  var keys = path.split('.');
  for (var i = 0; i < keys.length - 1; i++) {
    var key = keys[i];
    if (deep.p && !hasOwnProperty.call(obj, key)) obj[key] = {};
    obj = obj[key];
  }
  obj[keys[i]] = value;
  return value;
}