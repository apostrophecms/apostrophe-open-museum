var pluckKeys = require('./')
var test = require('tap').test;

test("pluck-keys", function (t) {
    t.plan(1);

    var o = {
      firstname: "Fat",
      lastname: "Mike",
      email: "info@domain.com"
    }

    var p = pluckKeys(['firstname', 'lastname'], o)

    t.deepEqual(p, {
      firstname: "Fat",
      lastname: "Mike"
    })
});