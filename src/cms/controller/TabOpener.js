define(['dojo/_base/declare',
    'dojo/_base/lang',
    'gform/opener/SingleEditorTabOpener',
    'dojo/topic'], function (declare, lang, SingleEditorTabOpener, topic) {


    return declare([SingleEditorTabOpener], {
        configuration:null,
        init: function () {
            topic.subscribe("/page/focus", lang.hitch(this, "onPageFocus"));
            topic.subscribe("/page/focus", lang.hitch(this, "onPageFocus"));
            topic.subscribe(this.tabContainer.id + "-selectChild", lang.hitch(this, "tabSelected"));
        },
        onPageFocus: function (evt) {
            if (evt.source!=this) {
                this.openSingle({url: "/page", id: evt.id, schemaUrl: "/template/" + evt.template});
            }
        },
        tabSelected: function (page) {
            if (page.editor.meta && page.editor.meta.id != "/cms/template") {
                var id = page.editor.getPlainValue()[this.configuration.pageStore.idProperty];
                var template = page.editor.getPlainValue()["template"];
                if (id) {
                    // already loaded!!
                    topic.publish("/page/focus", {id: id, source: this, template: template})
                }
            }
        }
    });

});