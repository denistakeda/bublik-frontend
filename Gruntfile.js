module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		requirejs: {
			compile: {
				options: {
					baseUrl: './target/runtime',
					dir: './target/build',
					paths: {
						angular: 'empty:',
						jquery: 'empty:',
						"ui-utils": "empty:",
						"ui-date": "empty:",
						jQueryUI: 'empty:',

						'angular-sanitize': 'empty:',
						'angular-resource': 'empty:',
						'angular-animate': 'empty:',
						'angular-touch': 'empty:',
                        'angular-route': 'empty:',
						'angular-infinite-scroll': 'empty:',

						'bootstrap':'libs/bootstrap/dist/js/bootstrap.min'
					},
					shim: {
						'angular-sanitize': { deps: ['angular']},
						'angular-resource': { deps: ['angular']},
						'angular-animate': { deps: ['angular']},
						'angular-touch': { deps: ['angular']},
						'angular-infinite-scroll': { deps: ['angular']},
                        'angular-route': { deps: ['angular']},

						'jquery': { exports: '$'},
						'jQueryUI': { deps: ['jquery', 'css!libs/jquery/smoothness/jquery-ui.css', 'css!libs/jquery/smoothness/jquery-ui-dd.min.css'], exports: '$.ui'},
						"ui-utils": { deps: ["angular"] },
						"ui-date": { deps: ["angular", "jQueryUI"] },
						'angular': {deps: ['jquery', 'jQueryUI'], exports: 'angular'},
						'bootstrap': {deps: ['jquery','css!libs/bootstrap/dist/css/bootstrap.min.css']}
					},
					optimize: "uglify2",            //|
					generateSourceMaps: true,       //| comment it, if you want to see license information.
					preserveLicenseComments: false, //|
//					optimize: "none",
//					findNestedDependencies: true,
					skipDirOptimize: true,      // TODO add custom job 'compress' for all files except libs/ and boot.js
					onBuildRead: function (moduleName, path, contents) {
						// wrap jquery plugins
						if(~contents.indexOf('jquery') && !~contents.indexOf('define(') && !~contents.indexOf('require(') ) {
							return "define(['jquery'], function(jquery){"+contents+"});";
						} else {
							return contents;
						}
					},

					onBuildWrite: function (moduleName, path, contents) {
						return contents.replace(/css!(?!libs)(.*?.css)/ig, "$1");    // add moduleName
					},
					// license
					wrap: {
						startFile: "license.js"
					},
					modules: [{
						name: "bublik-widget-pack",
						exclude: [
							"jquery",
							"angular",
							'bootstrap'
						]
					}]
				}
			}
		},


		ngtemplates: {
			app: {
				cwd: 'src',
				src: ['components/apps/**/*.htm*',
					'components/directives/**/*.htm*',
					'components/factories/**/*.htm*',
					'components/services/**/*.htm*',
					'components/widgets/**/*.htm*',
					'components/filters/**/*.htm*',
					'templates/**/*.htm*'
				],
				dest: 'target/runtime/components/templates.js',
				options: {
					bootstrap: function(module, script) {
						return 'define(["glxApp"], function(app) { app.run(["$templateCache", function($templateCache) { ' + script + ' }])});';
					},
					htmlmin:  {
						collapseWhitespace: true,
						collapseBooleanAttributes: true
					},
					prefix: "../"
				}
			},
			test: {
				cwd: 'src',
				src: ['components/apps/**/*.htm*',
					'components/directives/**/*.htm*',
					'components/factories/**/*.htm*',
					'components/services/**/*.htm*',
					'components/widgets/**/*.htm*',
					'components/filters/**/*.htm*',
					'templates/**/*.htm*'
				],
				dest: 'target/runtime/components/templates.js',
				options: {
					bootstrap: function(module, script) {
						return 'define(["app"], function(app) { app.run(["$templateCache", function($templateCache) { ' + script + ' }])});';
					},
					htmlmin:  {
						collapseWhitespace: true,
						collapseBooleanAttributes: true
					},
					url: function(url){
						var requireBaseUrl = '/base/src/';
						// To know about version look at the 'replace' task
						return requireBaseUrl+url;
					}
				}
			}
		},

		copy: {
			main: {
				files: [
					{expand: true, cwd: 'src', src: ['**'], dest: 'target/runtime'}
				]
			}
		},

		replace: {
			dist: {
				options: {
					variables: {
						"version": 'v=<%= grunt.option("assembly") || pkg.version %>'
					}
				},
				files: [
					{expand: true, flatten: true, src: ['target/runtime/unisearch/boot.js'], dest: 'target/runtime/unisearch/'}
				]
			}
		},

		clean: {
			dev: [
				"src/runtime/components/apps/**/*.css",
				"src/runtime/components/directives/**/*.css",
				"src/components/widgets/**/*.css"
			],
			all: [ 'target/build/', 'node_modules', 'src/test-output'],
			build: [ 'target/runtime/', 'target/build/', 'src/test-output'],
			runtime: [ 'target/runtime/' ]
		},

		karma: {
			build: {
				configFile: 'karma.conf.js',
				singleRun: true,
				browsers: ['PhantomJS']
			},
			dev: {
				configFile: 'karma.conf.js',
				singleRun: true,
				browsers: ['PhantomJS', 'Firefox',  'Chrome']
			}
		},

		jshint: {
			// define the files to lint
			files: ['Gruntfile.js',
				'src/components/**/*.js',
				'test/**/*.js'
			],
			// configure JSHint (documented at http://www.jshint.com/docs/)
			options: {
				"asi": true,	// semicolons
				"expr": true,	// Expected an assignment or function call and instead saw an expression
				"evil": true,	// eval
				// more options here if you want to override JSHint defaults
				globals: {
					$: true,
					jquery: true,
					angular: true,
					console: true,
					document: true,
					window: true
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'karma:build']
		},
		less: {
			production: {
				options: {
					paths: ["/target/runtime"],
					prefix: '/',
					compress: true
				},
				files: [{
					expand: true,
					cwd:    "",
					src:    "target/runtime/components/apps/**/*.less",
					ext:    ".css"
				},{
					expand: true,
					cwd:    "",
					src:    "target/runtime/components/directives/**/*.less",
					ext:    ".css"
				},{
					expand: true,
					cwd:    "",
					src:    "target/runtime/components/widgets/**/*.less",
					ext:    ".css"
				}]
			}
		}
	});

	// Load the plugin
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('force', 'force run', function(status){
		grunt.option('force', status!=='off');
	});

	// this would be run by typing "grunt test" on the command line
	grunt.registerTask('test', ['jshint'/*, 'ngtemplates:test', 'force:on', 'karma:build', 'force:off'*/]); // there is no one test

	// this would be run by typing "grunt build" on the command line
	grunt.registerTask('build', ['clean:build', 'copy', 'less', 'ngtemplates:app', 'replace', 'requirejs', 'clean:runtime']);   // TODO run requrejs in runtime, copy widgets js, libs and images to build folder

	// Default task(s).
	grunt.registerTask('default', ['test', 'build']);

};
