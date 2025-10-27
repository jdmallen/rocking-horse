export default ({ filter }, { services, getSchema }) => {
  filter('items.update', async (payload, meta, context) => {
    const { collection, keys } = meta;
    
    if (collection !== 'news' || !payload.status || payload.status !== 'published') {
      return payload;
    }
    
    try {
      const schema = await getSchema();
      const itemsService = new services.ItemsService('news', {
        schema,
        accountability: context.accountability
      });
      
      const existingItems = await itemsService.readMany(keys);
      const items = Array.isArray(existingItems) ? existingItems : [existingItems];
      
      for (const item of items) {
        if (!item) continue;
        
        if (item.status === 'draft' && !item.published_datetime && !payload.published_datetime) {
          payload.published_datetime = new Date().toISOString();
        }
      }
    } catch (error) {
      console.error('Error in news publish hook:', error);
    }
    
    return payload;
  });
};
