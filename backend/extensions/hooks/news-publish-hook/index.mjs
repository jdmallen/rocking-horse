import { defineHook } from "@directus/extensions-sdk";

export default defineHook(({ filter }, { services, getSchema }) => {
  filter("items.update", async (input, meta, context) => {
    console.log("Hook fired!", {
      collection: meta.collection,
      payload: meta.payload,
    });

    const { collection, keys, payload } = meta;

    if (collection !== "news") {
      console.log("Not news collection, skipping");
      return input;
    }

    console.log("News collection detected", { keys, payload });

    if (payload.status !== "published") {
      console.log("Status not published, skipping");
      return input;
    }

    console.log("Status is published, checking existing items");

    // Get the current state of the items being updated
    const schema = await getSchema();
    const itemsService = new services.ItemsService("news", {
      schema,
      accountability: context.accountability,
    });

    const existingItems = await itemsService.readMany(keys);
    console.log("Existing items:", existingItems);

    // Check if any item is transitioning from draft to published
    for (const item of existingItems) {
      console.log("Checking item:", {
        currentStatus: item.status,
        newStatus: payload.status,
        hasPublishedDate: !!item.published_datetime,
      });

      if (item.status === "draft" && payload.status === "published") {
        console.log("Transition from draft to published detected!");

        if (!item.published_datetime && !payload.published_datetime) {
          console.log("Setting published_datetime");
          payload.published_datetime = new Date().toISOString();
        } else {
          console.log("published_datetime already exists, skipping");
        }
      }
    }

    return input;
  });
});
