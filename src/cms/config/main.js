define([
    'dojo/store/JsonRest',
    '../factory/HandlebarsCreateFactory',
    'cms/preview/handlebars/Renderer',
    '../factory/ToggleSizeFactory',
    '../factory/FindPageFactory',
    '../factory/CreateFactory',
    '../factory/BrandFactory',
    '../factory/ToolbarFactory',
    '../factory/GridFactory',
    '../factory/TabFactory',
    '../factory/PreviewerFactory',
    '../factory/TreeFactory'
], function (JsonRest) {

        return {
            "storeRegistry": {
                "stores": [
                    {
                        "factoryId": "cms/factory/StoreFactory",
                        "storeClass": "cms/util/JsonRest",
                        "name": "/pagetree",
                        "target": "http://localhost:8080/tree/",
                        "idProperty": "id",
                        "mainStore": "/page"
                    },
                    {
                        "factoryId": "cms/factory/StoreFactory",
                        "name": "/page",
                        "storeClass": "cms/util/JsonRest",
                        "templateStore": "/template",
                        "idProperty": "identifier",
                        "idType": "string",
                        "typeProperty": "template",
                        "target": "http://localhost:8080/entity/base/",
                        "createEditorFactory": "cms/createBuilderEditorFactory"
                    },
                    {
                        "factoryId": "cms/factory/StoreFactory",
                        "name": "/template",
                        "storeClass": "cms/util/JcrTemplateRest",
                        "idProperty": "code",
                        "idType": "string",
                        "target": "http://localhost:8080/schema/",
                        "template": "/template",
                        "instanceStore": "/page",
                        "createEditorFactory": "cms/createBuilderEditorFactory",
                        "plainValueFactory": "cms/default/createTemplateValueFactory"

                    },
                    {
                        "factoryId": "cms/factory/StoreFactory",
                        "name": "/user",
                        "storeClass": "dojo/store/JsonRest",
                        "idProperty": "_id",
                        "idType": "string",
                        "target": "http://localhost:3333/api/Users/",
                        "template": "/Users",
                        "instanceStore": "/page",
                        "createEditorFactory": "cms/createBuilderEditorFactory"

                    }
                ]
            },
            "schemaRegistry": {
                "factoryId": "cms/factory/schema/SchemaRegistryFactory",
                "registryClass": "cms/SchemaRegistry",
                "stores": ["/template"],
                "schemaGenerators": [
                    {
                        "factoryId": "cms/factory/schema/SchemaGenerator",
                        "store": "/template" // instances of the generated schema will be place into this store. id Proeprty and idType are taken from this store and added to the schema.
                    }
                ]
            },
            "views": [
                {
                    "region": "top",
                    "factoryId": "cms/factory/ToolbarFactory",
                    "children": [
                        {
                            "factoryId": "cms/factory/BrandFactory",
                            "label": "gform-cms"
                        },
                        {
                            "factoryId": "cms/factory/FindPageFactory",
                            "storeId": "/page",
                            "label": "open",
                            "searchProperty": "url",
                            "labelProperty": "url",
                            "placeHolder": "find page .."
                        },
                        {
                            "factoryId": "cms/factory/CreateFactory",
                            "storeId": "/page",
                            "label": "+",
                            "searchProperty": "name",
                            "placeHolder": "find template .."
                        },
                        {
                            "factoryId": "cms/factory/HandlebarsCreateFactory",
                            "url": "/template",
                            "storeId": "/template",
                            "label": "add template"
                        },
                        {
                            "factoryId": "cms/factory/ToggleSizeFactory",
                            "label": "full size"
                        }
                    ]
                },
                {
                    "region": "left",
                    "splitter": true,
                    "width": "250px",
                    "factoryId": "cms/factory/TabFactory",
                    "children": [
                        {
                            "factoryId": "cms/factory/TreeFactory",
                            "title": "tree",
                            "storeId": "/pagetree",
                            "labelAttribute": "name"

                        },
                        {
                            "factoryId": "cms/factory/GridFactory",
                            "title": "template",
                            "storeId": "/template",
                            "columns": [
                                {
                                    "id": "name",
                                    "field": "name",
                                    "name": "name"
                                }
                            ]
                        }
                    ]
                },
                {
                    "region": "center",
                    "factoryId": "cms/factory/PreviewerFactory",
                    "splitter": true,
                    "rendererClass": "cms/preview/handlebars/Renderer",
                    "pageStore": "/page"
                },
                {
                    "width": "40%",
                    "region": "right",
                    "factoryId": "cms/factory/TabOpenerFactory",
                    "splitter": true
                }
            ]

        }
    }
);
