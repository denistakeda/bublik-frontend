({
	baseUrl: './src',
	dir: './build',
	paths: {
		libs: "js/libs",
		app: "js/apps/app",
		widgets: "js/widgets",
		services: "js/services",
		directives:"js/directives",
		filters:"js/filters",
		templates: "templates",
		angular: 'empty:',
		jQuery: 'empty:'
	},
//	optimize: "none",
	modules: [{
		name: "search/boot",
		exclude: [
			"jQuery",
			"angular",

			'css!css/bootstrap/css/bootstrap.min.css',
			'css!css/bootstrap/css/bootstrap-responsive.min.css'
		]
	},{
		name: "tables/boot",
		exclude: [
			"jQuery",
			"angular",

			'css!css/bootstrap/css/bootstrap.min.css',
			'css!css/bootstrap/css/bootstrap-responsive.min.css'
		]
	}]
})