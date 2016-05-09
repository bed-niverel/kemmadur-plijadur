requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../scripts/app',
        text: '../scripts/lib/text',
        json: '../scripts/lib/json'
    },
    urlArgs: "bust=" + (new Date()).getTime()
});

requirejs(['app/main']);
