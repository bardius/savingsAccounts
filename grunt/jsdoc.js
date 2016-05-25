// -----------------------------
// Config jsdoc
// https://github.com/krampstudio/grunt-jsdoc
// Generates documentation for the app
// -----------------------------

module.exports = {
    dist : {
        src: [
            'js/src/**/*.js'
        ],
        options: {
            destination: './docs'
        }
    }
};
