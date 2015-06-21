define([
    '../BaseRenderer',
    "dojo/_base/declare"
], function (BaseRenderer, declare) {


    var initHb = function () {
        // TODO extract helpers to custom and standard configuration folders
        Handlebars.registerHelper('equals', function (a, b, options) {
            if (a == b) {
                return options.fn(this);
            }
        });
        Handlebars.registerHelper('gt', function (a, b, options) {
            if (a > b) {
                return options.fn(this);
            }
        });
        Handlebars.registerHelper("add", function(lvalue, rvalue, options) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);

            return lvalue + rvalue;
        });
        Handlebars.registerHelper('c4a-script', function (a, b, options) {
            // TODO make script source configurable
            return "<script src='gform-app/controller/mock.js'></script>"
        });
        Handlebars.registerHelper('debug', function (a, b, options) {
            var ctx = a? a : this;
            return  JSON.stringify(ctx, null, ' ');

        });
        Handlebars.registerHelper('gte', function (a, b, options) {
            if (a >= b) {
                return options.fn(this);
            }
        });
        Handlebars.registerHelper('style-tag', function (styles, options) {
            return "<style>" + styles + "</style>"
        });
        Handlebars.registerHelper('script-tag', function (script, options) {
            return "<script>" + script + "</script>"
        });
        Handlebars.registerHelper('link', function (url, options) {
            var param = url;
            if (typeof url === "string") {
                param = "'" + url + "'"
            }
            return "javascript:preview(" + url + ");";
        });

        Handlebars.registerHelper('formatCurrency', function (value, options) {
            return value / 100;
        });
    }
    // including hb via amd require does not seem to work with dojo build
    if (typeof Handlebars === "undefined") {
        require(["handlebars/handlebars.min"], function (hb) {
            Handlebars = hb;
            initHb();
        })
    } else{
        initHb();
    }


    return declare([BaseRenderer], {
        renderTemplate: function (code, ctx, partials) {
            Object.keys(partials).forEach(function (key) {
                Handlebars.registerPartial(key, partials[key]);
            });
            var template = Handlebars.compile(code);
            ctx.__cms4apps__={sourceCode:code, partials:partials}
            return template(ctx);
        }
    })
})

