/**	plugin builder for requirejs optimization
 */

define(function() {

	var fs = require.nodeRequire('fs');

	function loadfile (url, callback) {
		var file = fs.readFileSync(url, 'utf8');
		//Remove BOM (Byte Mark Order) from utf8 files if it is there.
		if (file.indexOf('\uFEFF') === 0) {
			file = file.substring(1);
		}
		callback(file);
	};

	function strip (content) {
		return content.replace(/[\n]/g," ")
					.replace(/[\t]/g," ");
	}

	var buildMap = {};
	var writeonce = false;

	// TODO refactor
	var normalizeContent = function(fileName){
		var out = buildMap[fileName];
		out = out.replace(/'/g, "\\'");

		var concatAndResolveUrl = function(url, concat) {
			var url1 = url.split('/');
				url1.pop();
			var url2 = concat.split('/');
			var url3 = [ ];
			for (var i = 0, l = url1.length; i < l; i ++) {
				if (url1[i] == '..') {
					url3.pop();
				} else if (url1[i] == '.') {
					continue;
				} else {
					url3.push(url1[i]);
				}
			}
			for (var i = 0, l = url2.length; i < l; i ++) {
				if (url2[i] == '..') {
					url3.pop();
				} else if (url2[i] == '.') {
					continue;
				} else {
					url3.push(url2[i]);
				}
			}
			return url3.join('/');
		}

		out = out.replace(/url\(['"]?(?!data:)(.*?)['"]?\)/g, function(match, url, offset, content){
			return "url('+require.toUrl(\""+concatAndResolveUrl(fileName, url)+"\")+')";
//			return "url("+concatAndResolveUrl(fileName, url)+")"
		})
		return out;
	}

	var loader =
	{
		load: function (name, require, load, config) {
			load(true);
			loadfile(config.baseUrl+name,function(F){
				buildMap[name]=strip(F);
			});
		},

		write: function (pluginName, moduleName, write, config) {

			if( !writeonce)
			{
				writeonce=true;
				write(
					"define('"+pluginName+"-embed', function()\n{\n"+
					"\tfunction embed_css(content)\n"+
					"\t{\n"+
					"\t\tvar head = document.getElementsByTagName('head')[0],\n"+
					"\t\tstyle = document.createElement('style'),\n"+
					"\t\trules = document.createTextNode(content);\n"+
					"\t\tstyle.type = 'text/css';\n"+
					"\t\tif(style.styleSheet)\n"+
					"\t\t\tstyle.styleSheet.cssText = rules.nodeValue;\n"+
					"\t\telse style.appendChild(rules);\n"+
					"\t\t\thead.appendChild(style);\n"+
					"\t}\n"+
					"\treturn embed_css;\n"+
					"});\n"
				);
			}

			write(
				"define('"+moduleName+"', ['"+pluginName+"-embed'], \n"+
				"function(embed)\n{\n"+
					"\tembed(\n\t'"+normalizeContent(moduleName)+"'\n\t);\n"+
					"\treturn true;\n"+
				"});\n"
			);
		},

		writeFile: function (pluginName, moduleName, write)
		{
		},

		onLayerEnd: function (write, data)
		{
		}
	};

	return loader;
});
