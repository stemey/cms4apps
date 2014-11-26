define([
	'./GformSchema2TableConverter',
	'dojo/aspect',
	'gridx/core/model/cache/Sync',
	'dojo/_base/Deferred',
	'dojo/topic',
	"dojo/_base/declare",
	"gridx/Grid",
	'gridx/core/model/cache/Async',
	"gridx/modules/VirtualVScroller",
	"gridx/modules/ColumnResizer",
	"gridx/modules/SingleSort",
	"gridx/modules/Filter",
	'gridx/modules/filter/FilterBar',
	'gridx/modules/RowHeader',
	'gridx/modules/select/Row'

], function (GformSchema2TableConverter, aspect, Sync, Deferred, topic, declare, Grid, Async, VirtualVScroller, ColumnResizer, SingleSort, Filter, FilterBar, RowHeader, RowSelect) {


	var allFilterConditions = {
		"string": ["contain", "equal", "startWith", "endWith", "notEqual", "notContain", "notStartWith", "notEndWith", "isEmpty"],
		"number": ["equal", "greater", "less", "greaterEqual", "lessEqual", "notEqual", "isEmpty"],
		"date": ["equal", "before", "after", "range", "isEmpty"],
		"time": ["equal", "before", "after", "range", "isEmpty"],
		"enum": ["equal", "notEqual", "isEmpty"],
		"boolean": ["equal", "isEmpty"]
	}

	return declare([], {
		constructor: function() {
			this.tableConverter = new GformSchema2TableConverter();
		},
		convertSchemaToTableStructure: function (ctx, config, storeId) {
			var store = ctx.getStore(storeId);
			var deferred = new Deferred();
			var schema;
			if (config.schema) {
				schema = config.schema;
			} else {
				schema = ctx.schemaRegistry.get(store.template);
			}
			var tableStructure = this.tableConverter.convert(schema);
			return tableStructure;
		},
		create: function (ctx, config) {



			var store = ctx.getStore(config.storeId);

			var tableStructure = this.convertSchemaToTableStructure(ctx, config, store.name);

			var id2Converter ={};
			tableStructure.forEach(function(column) {
				if (column.parser) {
					id2Converter[column.id]=column.parser;
				}
			});

			var props = {width: "100%", height: "100%"};
			props.title = store.name;
			props.cacheClass = config.sync ? Sync : Async;
			props.storeId = store.name;
			var conditions = config.conditions || allFilterConditions;

			var filterModule = {
				moduleClass: FilterBar,
				type: "all"
			}

			if (config.conditions) {
				filterModule.conditions = conditions;
			}

			props.store = store;
			props.filterServerMode=true;
			props.modules = [
				VirtualVScroller,
				{
					moduleClass: Filter,
					serverMode: true,
					setupQuery: function(query) {
						if (query && query.data) {
						query.data = query.data.map(function(criterion) {
							var parser = id2Converter[criterion.data[0].data];
							if (parser) {
								criterion.data[1].data=parser(criterion.data[1].data);
							}
							return criterion;
						});
						}
						return query;
					}
				},
				filterModule,
				{
					moduleClass: RowSelect,
					multiple: false,
					triggerOnCell: true


				},
				RowHeader,
				SingleSort,
				ColumnResizer
			];


			props.structure = tableStructure;
			var grid = new Grid(props);
			var selected = function (e) {
				topic.publish("/focus", {store: store.name, id: e.id, source: this})
			}
			aspect.after(grid, "startup", function () {
				grid.select.row.connect(grid.select.row, "onSelected", selected);
				grid.connect(grid, 'onRowClick', function (e) {
					var id = grid.select.row.getSelected();
					topic.publish("/focus", {store: store.name, id: id, source: this})
				});
			});
			return grid;

		}
	});
});



