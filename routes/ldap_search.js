var express = require('express');
var router = express.Router();
var ldap = require('ldapjs');
var config = require('../utility/config');
var userAccountControls = require('../utility/user_account_control');
router.post('/', function (req, res, next) {
    var username = req.body.username;
    var options = {
        filter: '(sAMAccountName=' + username + ')',
        scope: 'sub',
        attributes: ['dn', 'sn', 'cn', 'useraccountcontrol', 'lockoutTime']
    };
    var client = ldap.createClient({
        url: 'ldap://dotldap.dot.nycnet'
    });
    client.bind(config.domainName, config.password, function (err) {
        if (err) {
            console.log("Error with configuration", err);
            res.send("Configuration error with username and password");
        }
        else {
            client.search(config.base, options, function (err, ldap_res) {
                ldap_res.on('searchEntry', function (entry) {
                    var userAccountControl = entry.object.userAccountControl;
                    var userAccountControlFlags = userAccountControls(userAccountControl);
                    console.log(userAccountControlFlags);
                    console.log("stringified", JSON.stringify(userAccountControlFlags))
                    var lockoutTime = entry.object.lockoutTime;
                    var normalUser = " (Normal user)"
                    if (userAccountControl != 512) {
                        normalUser = " (Not normal User)"
                    }
                    var lockedMSG = ' (User is unlocked)';
                    if (lockoutTime > 0) {
                        lockedMSG = " (User is locked out)";
                    }
                    var result = {
                        username: username,
                        userAccountControl: userAccountControl,
                        lockoutTime: lockoutTime,
                        //userType: userFlag,
                        lockedMSG: lockedMSG,
                        userAccountControlFlags: JSON.stringify(userAccountControlFlags)
                        //TODO: COonver this to JSON
                    }

                    //unbind
                    client.unbind(function (err) {
                        if (err) {
                            console.error(err);
                        }
                    });

                    res.send(result);
                });
                ldap_res.on('error', function (err) {
                    console.error('error: ' + err.message);
                });
                ldap_res.on('end', function (result) {
                    console.log('Response status: ' + result.status);
                });
            });
        }

    });
});
module.exports = router;





