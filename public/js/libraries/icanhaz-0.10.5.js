// !!! DO NOT DELETE THIS - IT IS A MODIFIED VERSION OF ICANHAZ.JS !!!

/*!
ICanHaz.js version 0.10.5 -- by @HenrikJoreteg and @EnzoMartin78
More info at: http://icanhazjs.com
*/
(function () {
    /*!
     * mustache.js - Logic-less {{mustache}} templates with JavaScript
     * http://github.com/janl/mustache.js
     */

    var Mustache = window.Mustache;

    /*!
      ICanHaz.js -- by @HenrikJoreteg
    */
    /*global  */
    (function () {
        var trim = (function () {
            return ''.trim
              ? function (stuff) { return stuff.trim(); }
              : function (stuff) { return stuff.replace(/^\s+/, '').replace(/\s+$/, ''); }
        }()),
	    ich = {
            VERSION: "0.10",
            templates: {},

            // grab jquery or zepto if it's there
            $: (typeof window !== 'undefined') ? window.jQuery || window.Zepto || null : null,

            // public function for adding templates
            // can take a name and template string arguments
            // or can take an object with name/template pairs
            // We're enforcing uniqueness to avoid accidental template overwrites.
            // If you want a different template, it should have a different name.
            addTemplate: function (name, templateString) {
                if (typeof name === 'object') {
                    for (var template in name) {
                        this.addTemplate(template, name[template]);
                    }
                    return;
                }
                if (ich[name]) {
                    console.error("Invalid name: " + name + ".");
                } else if (ich.templates[name]) {
                    console.error("Template \"" + name + "  \" exists");
                } else {
                    ich.templates[name] = templateString;
                    ich[name] = function (data, raw) {
                        data = data || {};
                        var result = Mustache.to_html(ich.templates[name], data, ich.templates);
                        return (ich.$ && !raw) ? ich.$(result) : result;
                    };
                }
            },

            // clears all retrieval functions and empties cache
            clearAll: function () {
                for (var key in ich.templates) {
                    delete ich[key];
                }
                ich.templates = {};
            },

            // clears/grabs
            refresh: function () {
                ich.clearAll();
                ich.grabTemplates();
            },

            // grabs templates from the DOM and caches them.
            // Loop through and add templates.
            // Whitespace at beginning and end of all templates inside <script> tags will 
            // be trimmed. If you want whitespace around a partial, add it in the parent, 
            // not the partial. Or do it explicitly using <br/> or &nbsp;
            grabTemplates: function (callback) {
                var i, l,
                    scripts = document.getElementsByTagName('script'),
                    script,
                    trash = [];
                for (i = 0, l = scripts.length; i < l; i++) {
                    var script = scripts[i];
                    if (script && script.id && (script.type === "text/html" || script.type === "text/x-icanhaz")) {
                        if (script.src) {
                            var datas;
                            $.ajax(script.src,
                            {
                                async: false,
                                complete: function (r) {
                                    ich.addTemplate(script.id, trim(r.responseText));
                                }
                            });
                        } else if (script.innerHTML) {
                            this.addTemplate(script.id, trim(script.innerHTML));
                        }
                        trash.unshift(script);
                    }
                }
                for (i = 0, l = trash.length; i < l; i++) {
                    trash[i].parentNode.removeChild(trash[i]);
                }
            }
        };

        // Use CommonJS if applicable
        if (typeof require !== 'undefined') {
            module.exports = ich;
        } else {
            // else attach it to the window
            window.ich = ich;
        }

        if (typeof document !== 'undefined') {
            if (ich.$) {
                ich.$(function () {
                    ich.grabTemplates();
                });
            } else {
                document.addEventListener('DOMContentLoaded', function () {
                    ich.grabTemplates();
                }, true);
            }
        }

    })();
})();