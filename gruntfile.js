module.exports = function(grunt){

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    meta: {

      assets  : 'assets',
      test    : 'test',
      package : 'app',
      banner  : '/*\n\
          <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("dd/mm/yyyy") %>\n\
          Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n\
          Under <%= pkg.license %> License \n*/'

    },

    source: {

      js: [
        '<%= meta.assets %>/js/*.js',
        '<%= meta.assets %>/js/utils/*.js',
        '<%= meta.assets %>/js/models/*.js',
        '<%= meta.assets %>/js/collections/*.js',
        '<%= meta.assets %>/js/views/*.js',
        '<%= meta.assets %>/js/routers/*.js'
      ],

      styles: [
        '<%= meta.assets %>/styles/theme/*.css',
        '<%= meta.assets %>/styles/*.css'
      ],

      components_fonts: [
        'bower_components/ratchet/fonts/ratchicons.eot',
        'bower_components/ratchet/fonts/ratchicons.svg',
        'bower_components/ratchet/fonts/ratchicons.ttf',
        'bower_components/ratchet/fonts/ratchicons.woff'
      ],

      components_css: [
        'bower_components/ratchet/dist/css/ratchet-theme-android.css',
        'bower_components/ratchet/dist/css/ratchet-theme-ios.css',
        'bower_components/ratchet/dist/css/ratchet.css'
      ],

      components_js: [
        'bower_components/zepto/zepto.min.js',
        'bower_components/underscore/underscore.js',
        'bower_components/backbone/backbone.js',
        'bower_components/G/G.js',
        'bower_components/ratchet/js/ratchet.js',
        '<%= meta.assets %>/js/lib/*.js'
      ]

    },

    concat: {

      components: {

        src : '<%= source.components_js %>',
        dest: '<%= meta.package %>/js/<%= pkg.name %>.components.debug.js'

      },

      assets: {

        src : '<%= source.js %>',
        dest: '<%= meta.package %>/js/<%= pkg.name %>.debug.js'

      }

    },

    uglify: {

      assets: {

        files: {
          '<%= meta.package %>/js/<%= pkg.name %>.min.js': ['<%= meta.package %>/js/<%= pkg.name %>.debug.js']
        }

      },

      components: {

        files: {
          '<%= meta.package %>/js/<%= pkg.name %>.components.min.js': ['<%= meta.package %>/js/<%= pkg.name %>.components.debug.js']
        }

      }

    },

    copy: {

      fonts: {

        files: [
          {expand: true, src: '<%= source.components_fonts %>', dest: '<%= meta.package %>/fonts/', filter: 'isFile', flatten: true}
        ]

      },

      components_css: {

        files: [
          {expand: true, src: '<%= source.components_css %>', dest: '<%= meta.assets %>/styles/ratchet', filter: 'isFile', flatten: true}
        ]

      },

      test_components: {

        files: [
          {
            expand: true,
            src: ['<%= source.components_js %>',
                  'bower_components/should/should.js',
                  'bower_components/mocha/mocha.js',
                  'bower_components/mocha/mocha.css'
                  ],
            dest: '<%= meta.test %>/lib', filter: 'isFile', flatten: true
          }
        ]

      }

    },

    cssmin: {

      styles: {

        options: {

          banner: '<%= meta.banner %>'

        },

        files: {

          '<%= meta.package %>/styles/<%= pkg.name %>.min.css': '<%= source.styles %>'

        }

      },

      ratchet_styles: {

        options: {

          keepSpecialComments: 0,
          banner: '<%= meta.banner %>'

        },

        files: {

          '<%= meta.package %>/styles/ratchet-theme-ios.min.css'    : '<%= meta.assets %>/styles/ratchet/ratchet-theme-ios.css',
          '<%= meta.package %>/styles/ratchet-theme-android.min.css': '<%= meta.assets %>/styles/ratchet/ratchet-theme-android.css',
          '<%= meta.package %>/styles/ratchet.min.css'              : '<%= meta.assets %>/styles/ratchet/ratchet.css'

        }

      }

    },

    usebanner: {

      components: {

        options: {

          position : 'top',
          banner   : '<%= meta.banner%>',
          linebreak: true

        },

        files: {

          src: [
            '<%= meta.package %>/js/<%= pkg.name %>.components.js',
            '<%= meta.package %>/js/<%= pkg.name %>.debug.js',
            '<%= meta.package %>/js/<%= pkg.name %>.js'
          ]

        }

      }

    },

    watch: {

      assets: {

        options: {livereload: true},
        files: ['<%= source.js %>'],
        tasks: ['concat:assets', 'uglify:assets']

      },

      assets_lib: {

        options: {livereload: true},
        files: ['<%= meta.assets %>/js/lib/**.js'],
        tasks: ['concat:components', 'uglify:components']

      },

      theme: {

        options: {livereload: true},
        files: ['<%= source.styles %>'],
        tasks: ['cssmin:styles']

      },

      ratchet_styles: {

        options: {livereload: true},
        files: ['<%= meta.assets %>/styles/ratchet/**.css'],
        tasks: ['cssmin:ratchet_styles']

      }

    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-banner');

  grunt.registerTask('default', [ 'concat', 'uglify', 'copy', 'cssmin', 'usebanner']);
  grunt.registerTask('test', ['copy:test_components']);

};
