/**
 * The "ibx" module, which load Inforbix widgets.
 * You should use minus as delimiter in widget name which references to sub folder.
 * if you are say to require "ibx!some-widget",
 * requirejs try to load "components/widgets/some/widget/widget.js" file (module as well).
 * So we prefer to give global name at first part of widget name and then specific name.
 * Eg. snippet/rich, snippet/details, results/list, results/empty, etc.
 */

define({

	load: function (name, require, load, config) {
		// if I used module.normalize in some cases a function have been called twice. So it is here.
		var normalize = function(name){
			var parts = name.split("-");
			return parts.join("/")+"/"+name;
		}
		// try to load as widget
		require(["components/widgets/"+normalize(name)], function(value){
			load(value);
		}, function(err){
			// don't try anymore :)
		});
	}
});
