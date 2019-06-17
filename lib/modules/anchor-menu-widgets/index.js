module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Anchor Menu',
  addFields: [
    {
      name: 'items',
      label: 'Items',
      type: 'array',
      titleField: 'label',
      schema: [
        {
          type: 'string',
          name: 'label',
          label: 'Label'
        },
        {
          name: 'itemType',
          label: 'Type',
          type: 'select',
          choices: [
            { label: 'Internal Page', value: 'internal', showFields: ['_page'] },
            { label: 'External Page', value: 'external', showFields: ['url'] },
            { label: 'Internal Page with Anchor', value: 'internalAnchor', showFields: ['_pageAnchor', 'internalAnchor'] }
          ]
        },
        {
          name: '_page',
          label: 'Page to Link',
          type: 'joinByOne',
          withType: 'apostrophe-page',
          filters: {
            projection: {
              _url: 1,
              slug: 1,
              title: 1,
              type: 1
            }
          }
        },
        {
          name: 'url',
          label: 'External URL',
          type: 'url'
        },
        {
          type: 'id',
          name: 'name',
          label: 'Anchor ID',
          // remoteIdsFields: '_page'
          remoteIdsFields: ['_page', 'url']
          // remoteIdsFields: [{
          //   fieldName: '_page',
          //   urlType: 'relative',
          //   fieldType: 'join'
          // }]
          // remoteIds: {
          //   fieldName: '_page',
          //   urlType: 'relative',
          //   fieldType: 'join',
          // },
          // remoteIds: [
          //   {
          //     fieldName: '_page',
          //     urlType: 'relative'
          //   }
          // ]
        }
      ]
    }
  ]
};
