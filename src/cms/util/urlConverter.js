define([
	"dojo/_base/declare",//
	"gform/util/restHelper"
], function (declare, restHelper) {
// module:
//		gform/converter/urlToIdConverter


	return  declare([], {
		// attribute: object
		//		the attribute meta data. url property is used to create ref value.
		attribute: null,

		// ctx: gform/Context
		//		the context provides the storeRegistry. It can be used to lookup the actual url from an id.
		ctx: null,
		constructor: function (attribute, ctx) {
			this.ctx = ctx;
			this.attribute = attribute;
		},
		format: function (value) {
			if (value == null) {
				return "";
			} else {
				return restHelper.decompose(value).id;
			}
		},
		parse: function (value) {
			if (value == "" || value == null) {
				return null;
			} else {
				if (this.ctx != null) {
					var url = this.ctx.getUrl(this.attribute.url);
					return restHelper.compose(url, value);
				} else {
					return restHelper.compose(this.attribute.url, value);
				}
			}
		}
	});


});
