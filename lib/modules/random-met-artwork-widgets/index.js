const request = require('request-promise');
const _ = require('lodash');

module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Random Met Artwork',
  contextualOnly: true,
  construct: function (self, options) {
    self.route('post', 'get', async function (req, res) {
      for (let i = 0; i < 10; i++) {
        try {
          let id = _.random(0, 400000); // sort of cheating but I know the MET has objectIds in numerical order increasing by 1, saves a request
          let endpoint = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id;
          let data = await request(endpoint, { json: true });
          if (data.primaryImage !== '') {
            return res.json(data);
          }
        } catch (error) {
          // this will happen
        }
      }
    });
  }
};
