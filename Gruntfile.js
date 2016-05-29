module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({

		dir : {
			app : 'webapp',
			dist : 'dist',
			test : 'webapp/test',
			bower_components : 'bower_components'
		},

		connect : {
			options : {
				port : 8085,
				hostname : 'localhost',
				livereload : 35729
			},
			src : {},
			dist : {}
		},

		openui5_connect : {
			options : {
				resources : [
					'<%= dir.bower_components %>/openui5-sap.ui.core/resources',
					'<%= dir.bower_components %>/openui5-sap.m/resources',
					'<%= dir.bower_components %>/openui5-themelib_sap_bluecrystal/resources'
				]
			},
			src : {
				options : {
					appresources : '<%= dir.app %>',
					testresources: '<%= dir.test %>'
				}
			},
			dist : {
				options : {
					appresources : '<%= dir.dist %>'
				}
			}
		},

		openui5_preload : {
			component : {
				options : {
					resources : {
						cwd : '<%= dir.app %>', // path to app root folder
						prefix : 'todo_demo', // namespace prefix (in case the namespace is not already in folder structure like sap/ui/core/**)
						src : [
						  '**/*.js',
						  '!**/Component-preload.js',
						  '**/*.fragment.html',
						  '**/*.fragment.json',
						  '**/*.fragment.xml',
						  '**/*.view.html',
						  '**/*.view.json',
						  '**/*.view.xml',
						  '**/*.properties',
						  '!test/**'
						]
					},
					dest : '<%= dir.dist %>' // destination for the Component-preload.js file
				},
				components : true
			}
		},

		clean : {
			dist : '<%= dir.dist %>/'
		},

		copy : {
			dist : {
				files : [{
						expand : true,
						cwd : '<%= dir.app %>',
						src : [
							'**',
							'!test/**'
						],
						dest : '<%= dir.dist %>'
					}
				]
			}
		},

		eslint: {
			files : ["<%= dir.app %>/**/*.js", "test/**/*.js"]
		},

		qunit : {
			all : {
				options : {
					urls : [
						'http://<%= connect.options.hostname %>:<%= connect.options.port %>/test-resources/unit/unitTests.qunit.html'
					]
				}
			}
		},

		open : {
			root : {
				path : 'http://<%= connect.options.hostname %>:<%= connect.options.port %>',
				app: 'Chrome',
				options : {
					delay : 500
				}
			}
		},

		watch : {
			webapp : {
				files : '<%= dir.app %>/**',
				tasks : ['jshint']
			},
			livereload : {
				options : {
					livereload : '<%= connect.options.livereload %>'
				},
				files : [
					'<%= dir.app %>/**'
				]
			}
		},
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-openui5');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-qunit-junit');
	grunt.loadNpmTasks('grunt-eslint');

	// Server task
	grunt.registerTask('serve', function (target) {
		grunt.task.run('openui5_connect:' + (target || 'src:livereload'));
	});

	// Build task
	grunt.registerTask('build', [
			'clean',
			'openui5_preload',
			'copy'
		]);

	// Develop task (live-reloading)
	grunt.registerTask('develop', [
			'serve',
			'open',
			'watch'
		]);

	
	grunt.registerTask('test', [
			'serve',
			'qunit_junit',
			'qunit'
		]);
		
	// Default task
	grunt.registerTask('default', [
			'eslint',
			//'test',
			'build'
		]);
};
