const app = require('./app');
const database = require('./database');
const config = require('./config');

database().then(info => {
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    app.listen(config.PORT, () => console.log(`listening on ${config.PORT}`));
}).catch(() => {
    console.log('Unable to connect to database');
    process.exit(1);
});
