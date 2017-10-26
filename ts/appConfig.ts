const appConfig = require('../config/appConfig.yaml');

function print(prop: string) {
  console.log(prop);
}

print(appConfig.app.appOwner);