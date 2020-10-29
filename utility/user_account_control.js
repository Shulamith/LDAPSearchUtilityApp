//TODO: Make userFlags automatically  a map ? , fix names of maps, better style

const userFlags = {
    '0': 'SCRIPT',
    '1': 'ACCOUNTDISABLE',
    '2': 'HOMEDIR_REQUIRED',
    '4': 'LOCKOUT',
    '5': 'PASSWD_NOTREQD',
    '6': 'PASSWD_CANT_CHANGE',
    '7': 'ENCRYPTED_TEXT_PWD_ALLOWED',
    '8': 'TEMP_DUPLICATE_ACCOUNT',
    '9': 'NORMAL_ACCOUNT',
    '11': 'INTERDOMAIN_TRUST_ACCOUNT',
    '12': 'WORKSTATION_TRUST_ACCOUNT',
    '13': 'SERVER_TRUST_ACCOUNT',
    '16': 'DONT_EXPIRE_PASSWORD',
    '17': 'MNS_LOGON_ACCOUNT',
    '18': 'SMARTCARD_REQUIRED',
    '19': 'TRUSTED_FOR_DELEGATION',
    '20': 'NOT_DELEGATED',
    '21': 'USE_DES_KEY_ONLY',
    '22': 'DONT_REQ_PREAUTH',
    '23': 'PASSWORD_EXPIRED',
    '24': 'TRUSTED_TO_AUTH_FOR_DELEGATION',
    '26': 'PARTIAL_SECRETS_ACCOUNT'
}
let binaryLogFlags = new Map(Object.entries(userFlags));

//ToDO: Convert to ES6
//given Account Control returns map of all user account control flags 
function accountControls(userAccountControl) {
    let mapUserAccountControls = new Map();
    let binaryActCtrl = parseInt(userAccountControl).toString(2);
    for (const [key, accountControl] of binaryLogFlags) {
        let digitsPlace = binaryActCtrl.length - 1 - key;
        if (binaryActCtrl[digitsPlace] == 1) { //checks digit of binaryActCtrl from right to left
            mapUserAccountControls.set(accountControl, true);
        }
        else {
            mapUserAccountControls.set(accountControl, false);
        }
    }
    //let result = mapUserAccountControls;
    let result = Array.from(mapUserAccountControls,([accountControl, value]) => ({accountControl, value}));
    //let result = Array.from(mapUserAccountControls.entries());
    return result;
}
//var result = accountControls();


module.exports = accountControls;