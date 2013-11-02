define([ 
"dojo/_base/lang",//
"../../EditorFactory", //
"../../AttributeFactoryFinder",//
"../../group/GroupFactory",//
"../../group/ListPaneGroupFactory",//
"../../group/TabGroupFactory",//
"../../group/TitlePaneGroupFactory",//
"../../group/ListGroupFactory",//
"../../list_primitive/RefListAttributeFactory",//
"../../list_primitive/PrimitiveListAttributeFactory",//
"../../map_primitive/PrimitiveMapAttributeFactory",//
"../../primitive/StringAttributeFactory",//
"../../primitive/BooleanAttributeFactory",//
"../../primitive/SelectAttributeFactory",//
"../../primitive/CheckedSelectAttributeFactory",//
"../../primitive/MappedCheckedMultiSelectAttributeFactory",//
"../../primitive/CheckedMultiSelectAttributeFactory",//
"../../primitive/MappedSelectAttributeFactory",//
"../../primitive/DateAttributeFactory",//
"../../primitive/TimeAttributeFactory",//
"../../embedded/EmbeddedAttributeFactory",//
"../../primitive/TextareaAttributeFactory",//
"../../primitive/ReferenceAttributeFactory",//
"../../primitive/SimpleTextareaAttributeFactory",//
"../../primitive/NumberAttributeFactory",//
"../../primitive/CurrencyAmountAttributeFactory",//
"../../primitive/MappedContentPaneFactory",//
"../../group/AttributeListWidget",//
"../../list_embedded/RepeatedEmbeddedAttributeFactory",//,
"../../map_embedded/RepeatedEmbeddedAttributeFactory",//,
"../../list_table/RepeatedEmbeddedAttributeFactory"

], function(lang,EditorFactory,AttributeFactoryFinder, GroupFactory, ListPaneGroupFactory, TabGroupFactory, //
		TitlePaneGroupFactory, ListGroupFactory, RefListAttributeFactory, PrimitiveListAttributeFactory, PrimitiveMapAttributeFactory, StringAttributeFactory,
		BooleanAttributeFactory, SelectAttributeFactory, CheckedSelectAttributeFactory, 
		MappedCheckedMultiSelectAttributeFactory,
		CheckedMultiSelectAttributeFactory, MappedSelectAttributeFactory, DateAttributeFactory, 
		TimeAttributeFactory, EmbeddedAttributeFactory, TextareaAttributeFactory, ReferenceAttributeFactory, SimpleTextareaAttributeFactory, NumberAttributeFactory, 
		CurrencyAmountAttributeFactory, MappedContentPaneFactory,
		AttributeListWidget, RepeatedEmbeddedAttributeFactory, MapAttributeFactory, TableListAttributeFactory) {

			var editorFactory = new EditorFactory();
			editorFactory.addGroupFactory("list", new GroupFactory({editorFactory:editorFactory}));
			editorFactory.addGroupFactory("listpane", new ListPaneGroupFactory({editorFactory:editorFactory}));
			editorFactory.addGroupFactory("listgroup", new ListGroupFactory({editorFactory:editorFactory}));
			editorFactory.addGroupFactory("tab", new TabGroupFactory({editorFactory:editorFactory}));
			editorFactory.addGroupFactory("titlepane", new TitlePaneGroupFactory({editorFactory:editorFactory}));
			editorFactory.set("defaultGroupFactory",new ListPaneGroupFactory({editorFactory:editorFactory}));

			var attributeFactoryFinder = new AttributeFactoryFinder({
				editorFactory : editorFactory
			});

			var attributeFactories = [ //
			       				new RepeatedEmbeddedAttributeFactory({editorFactory:editorFactory}),//
			       				new MapAttributeFactory({editorFactory:editorFactory}),//
			       				new EmbeddedAttributeFactory({editorFactory:editorFactory}),//
			       				//new MappedCheckedMultiSelectAttributeFactory({editorFactory:editorFactory}), // 
			       				//new CheckedMultiSelectAttributeFactory({editorFactory:editorFactory}), // 
			       				//new MappedSelectAttributeFactory({editorFactory:editorFactory}),//
			       				new PrimitiveListAttributeFactory({editorFactory:editorFactory}),//
			       				new PrimitiveMapAttributeFactory({editorFactory:editorFactory}),//
			       				new NumberAttributeFactory({editorFactory:editorFactory}),//
			       				new SelectAttributeFactory({editorFactory:editorFactory}), // 
			       				new BooleanAttributeFactory({editorFactory:editorFactory}), // 
			       				new StringAttributeFactory({editorFactory:editorFactory}), //
			       				new DateAttributeFactory({editorFactory:editorFactory}), //
			       				new ReferenceAttributeFactory({editorFactory:editorFactory}), //
			       				new TimeAttributeFactory({editorFactory:editorFactory}), //
			       				new MappedContentPaneFactory({editorFactory:editorFactory}) //
			       				];
			attributeFactoryFinder.addAttributeFactory("table", new TableListAttributeFactory({editorFactory:editorFactory}));
			attributeFactoryFinder.addAttributeFactory("primitive_list", new PrimitiveListAttributeFactory({editorFactory:editorFactory}));
			attributeFactoryFinder.addAttributeFactory("ref_list", new RefListAttributeFactory({editorFactory:editorFactory}));
			attributeFactoryFinder.addAttributeFactory("mapped_contentpane", new MappedContentPaneFactory({editorFactory:editorFactory}));
			attributeFactoryFinder.addAttributeFactory("currencyamount", new CurrencyAmountAttributeFactory({editorFactory:editorFactory}));
			attributeFactoryFinder.addAttributeFactory("textarea", new TextareaAttributeFactory({editorFactory:editorFactory}));
			attributeFactoryFinder.addAttributeFactory("simpletextarea", new SimpleTextareaAttributeFactory({editorFactory:editorFactory}));
			attributeFactoryFinder.set("attributeFactories",attributeFactories);

			editorFactory.set("attributeFactoryFinder",attributeFactoryFinder);
		
			return function() {
				return editorFactory;
			}				

});
