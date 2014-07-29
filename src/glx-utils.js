define({

	load: function (name, require, load, config) {
		// if I used module.normalize in some cases a function have been called twice. So it is here.
		var normalize = function(name){
			var parts = name.split("-");
			return parts.join("/")+"/"+name;
		}
		// try to load as widget
		require(["components/utils/"+normalize(name)], function(value){
			load(value);
		}, function(err){
			// don't try anymore :)
		});
	}
});
