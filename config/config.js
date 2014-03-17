var dateNow = new Date();

var common = {
    appName:'Message Testing',
    year:dateNow.getFullYear()
};

module.exports = {
    development:{
        root:require('path').normalize(__dirname + '/..'),
        app:{
            name:common.appName + 'Dev',
            google:'',
            CDN: '/'
        },
        common:common,
		db:'mongodb://messages:test@localhost:27017/messages'
    },
    test:{
    },
    production:{
        root:require('path').normalize(__dirname + '/..'),
        app:{
            name:common.appName + 'Dev',
            google:'',
            CDN: '/'
        },
        common:common,
		db:process.env.MONGO
    }
};
