//Configuration file for LDAP Utility App
const { secrets } = require('../node_modules/docker-secret');
var config = {};
const local_password = ""; //Example: Password1!
const local_user = ""; //Example: Lastname\\, Firstname
const dock_sec_user = "user_secret"; //name of docker secret for the username
const dock_sec_pwd = "pwd_secret"; //name of docker secret for the password
if (secrets[dock_sec_user] && secrets[dock_sec_pwd]) {
    config.password = secrets[dock_sec_pwd];
    config.user = secrets[dock_sec_user];
    config.env = "docker";
} else {
    config.password = local_password;
    config.user = local_user;
    config.env = "";
}
config.domainName = 'CN=' + config.user + ',CN=Users,DC=dot,DC= nycnet';
config.base = 'CN=Users, DC=dot, DC=nycnet';

module.exports = config;

