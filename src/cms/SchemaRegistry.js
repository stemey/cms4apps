define([
    "dojo/_base/declare"
], function (declare) {
// module:
//		gform/controller/SchemaRegistry


    return declare([], {
        // summary:
        //		A registry for stores. Makes it easy to reuse and mock stores.

        // id2store: object
        //		id (probably url) to store mapping
        url2schema: {},

        name2Store: {},

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
                var matches = url.match(/^(\/[^\/]+)\/(.*)/);
                if (matches==null) {
                	throw "no schema "+url;
                }
				if (matches.length==3) {
					var p;
					var id = matches[2];
					var store = this.name2Store[matches[1]];
					if (store) {
						var p = store.get(id);
						return p;
					}else{
						throw "cannot find schema "+url;
					}
				} else {
					throw "cannot find schema "+url;
				}

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
