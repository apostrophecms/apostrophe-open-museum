# pluck-keys

  pick keys of object

## Installation

    // component
    $ component install karlbohlmark/pluck-keys
    
    // npm
    $ npm install pluck-keys


## API

  ```javascript
  pluckKeys = require('pluck-keys')

  var user = {
    email: "user@domain.com",
    firstname: "Azealia",
    lastname: "Banks",
    password: "yungrapunxel"
  }

  var nameProps = pluckKeys(['firstname', 'lastname'], user) // { firstname: "Azealia", lastname: "Banks" }
  ```

## License

  MIT
