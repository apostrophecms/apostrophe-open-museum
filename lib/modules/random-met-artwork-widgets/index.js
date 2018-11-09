const request = require('request');
const _ = require('lodash');

module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Random Met Artwork',
  contextualOnly: true,
  construct: function (self, options) {
    self.route('post', 'get', function (req, res) {
      const maxRetries = 10;
      let retried = 0;
      async function finish () {
        try {
          let data = await getData();
          return res.json(data);
        } catch (error) {
          retried++;
          if (retried === maxRetries) {
            return res.json({error: 'Try again later'});
          } else {
            finish();
          }
        }
      }

      function getData () {
        return new Promise((resolve, reject) => {
          let id = _.random(0, 400000); // sort of cheating but I know the MET has objectIds in numerical order increasing by 1, saves a request
          let endpoint = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id;
          request(endpoint, function (err, data) {
            if (err) {
              return err;
            }
            let body = JSON.parse(data.body);
            if (data.statusCode === 404 || body.primaryImage === '') {
              reject(new Error('404 or no image'));
            } else {
              resolve(body);
            }
          });
        });
      }
      finish();
    });
  }
};
