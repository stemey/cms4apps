define([
    'dojo/when',
    'dojo/Deferred',
    "dojo/_base/declare"
], function (when, Deferred, declare) {
// module:
//		gform/controller/SchemaRegistry


    return declare([], {
        // summary:
        //		A registry for stores. Makes it easy to reuse and mock stores.

        // id2store: object
        //		id (probably url) to store mapping
        url2schema: {},

        name2Store: {},

        templateTransformer: null,
        pageTransformer: null,

        get: function (url) {
            // summary:
            //		get the schema for the id.
            // url: String
            //		the url of the schema
            // return: object | dojo/Promise
            var cached = this.url2schema[url];
            if (cached) {
                return cached;
            } else {
                // TODO is this still necessaryy
                if (!url.match(/^\/template\//)) {
                    url="/template/"+url;
                }

                var transformer = this.pageTransformer;
                var p;
                var id = url.substr("/template/".length);
                var store = this.name2Store["/template"];
                if (store) {
                    p = store.get(id);
                }

                var transformedSchema = new Deferred();
                var me = this;
                when(p).then(function (schema) {
                    if (transformer) {
                        var t = transformer.transform(schema);
                        when(t).then(function (transformed) {
                            transformedSchema.resolve(transformed);
                        }).otherwise(function (e) {
                                transformedSchema.reject(e);
                            });
                    } else {
                        transformedSchema.resolve(schema);
                    }
                }).otherwise(transformedSchema);
                return transformedSchema;
            }

        },
        register: function (url, schema) {
            // summary:
            //		register a store with the id
            // url: String
            //		the url
            // schema: Object
            //		the schema instance
            this.url2schema[url] = schema;
        },
        registerStore: function (name, store) {
            // summary:
            //		register a store with the id
            // url: String
            //		the url
            // schema: Object
            //		the schema instance
            this.name2Store[name] = store;
        }
    });


});
