define([
    '../factory/ToggleSizeFactory',
    '../factory/FindPageFactory',
    '../factory/CreateFactory',
    '../factory/BrandFactory',
    '../factory/ToolbarFactory',
    '../factory/GridFactory',
    '../factory/TabFactory',
    '../factory/PreviewerFactory',
    '../factory/TreeFactory'
], function () {

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
                        "target": "http://localhost:8080/entity/base/"
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
                        "plainValueFactory":"cms/default/createTemplateValueFactory"

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
                        "store": "/template"
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
                            "label": "mini cms"
                        },
                        {
                            "factoryId": "cms/factory/FindPageFactory",
                            "storeId": "/page",
                            "label": "open"
                        },
                        {
                            "factoryId": "cms/factory/CreateFactory",
                            "storeId": "/page",
                            "label": "+"
                        },
                        {
                            "factoryId": "cms/factory/CreateFactory",
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
                    "splitter": true
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
