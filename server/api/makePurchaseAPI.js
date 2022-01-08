
const filter = { name: 'Luke Skywalker' };
const update = { receipt: {'receiptID': 1, 'item': 'itemName', 'price': 10} };
// If you set the `upsert` option, Mongoose will insert
// a new document if one isn't found.
const opts = { new: true, upsert: true };

let doc = await Character.findOneAndUpdate(filter, update, opts);
doc.name; // 'Luke Skywalker'
doc.receipt; // 'Jedi Knight'

// If `new` is `false` and an upsert happened,
// `findOneAndUpdate()` will return `null`
await Character.deleteMany({});

opts.new = false;
doc = await Character.findOneAndUpdate(filter, update, opts);
doc; // null