// -----------------------------
// Config JSHint
// https://github.com/gruntjs/grunt-contrib-jshint
// Check jshint rules on the js files
// Manage the options inside .jshintrc & jshintignore files
// -----------------------------

module.exports = {
    all: [
        '<%=config.js.scriptFileList%>',
        '!js/libs/**',
        '!js/helpers/**'
    ],
    options: {
        jshintrc: '.jshintrc',
        jshintignore: '.jshintignore'
    }
};
