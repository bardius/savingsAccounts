// -----------------------------
// Config clean
// https://github.com/gruntjs/grunt-contrib-clean
// Clean the static html files
// -----------------------------

module.exports = {
    all: [
        '<%= config.statix.path %>/**/*.html',
        '<%= config.statix.path %>/js/*.js',
        '<%= config.statix.path %>/js/*.map',
        '<%= config.statix.path %>/css/*.css',
        '<%= config.statix.path %>/css/*.map'
    ]
};
