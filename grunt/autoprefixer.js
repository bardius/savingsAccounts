/**
 * Config Autoprefixer
 * https://github.com/nDmitry/grunt-autoprefixer
 * https://github.com/ai/autoprefixer
 * Auto prefixes your CSS using caniuse data
 */
module.exports = {
    release: {
        options: {
            // Task-specific options go here - we are supporting
            // the last 4 versions, any browsers with > 1% market share,
            // and ensuring we support IE6+ with prefixes
            browsers: [
                '> 1%',
                'last 4 versions',
                'ie > 5',
                'iOS > 5',
                'Android > 3'
            ],
            map: false
        },
        files: {
            '<%= config.css.path %>/styles.css' : '<%= config.css.path %>/styles.css',
            '<%= config.css.path %>/legacy.css': '<%= config.css.path %>/legacy.css'
        }
    }
};
