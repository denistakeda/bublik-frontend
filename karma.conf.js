module.exports = function(config) {
	config.set({
		basePath: './',
		frameworks: ['requirejs', 'jasmine'],
		files: [
			{pattern: 'src/*.js', included: false},
			{pattern: 'src/**/*.css', included: false},
			{pattern: 'src/css/bootstrap/**/*.js', included: false},
			{pattern: 'src/components/*.js', included: false},
			{pattern: 'src/components/apps/*.js', included: false},
			{pattern: 'src/libs/**/*.js', included: false},
			{pattern: 'src/components/filters/**/*.js', included: false},
			{pattern: 'src/components/**/*.js', included: false},
			{pattern: 'src/**/*.html', included: true},
			{pattern: 'target/runtime/components/templates.js', included: false},
			// needs to be last http://karma-runner.github.io/0.10/plus/requirejs.html
			'main-test.js'
		],

		autoWatch: true,
		singleRun: true,

		browsers: ['PhantomJS', 'Firefox',  'Chrome'],

		reporters: ['progress', 'junit'],
		junitReporter: {
			outputFile: 'src/test-output/unit.xml',
			suite: ''
		}
	});
};