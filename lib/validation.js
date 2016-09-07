import { PagesCollection } from './pagesCollection.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

var Schemas = {};

Schemas.PagesSchema = new SimpleSchema ({
    title: { type: String },
    component: { type: String },
});

PagesCollection.attachSchema(Schemas.PagesSchema);