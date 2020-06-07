/*** Encryption / Decryption ***/
let _otp = function (string, key) {
    var byteString = _getByteArray(string);
    const byteKey = _getByteArray(key);

    byteString = byteString.map((value, index) => {
        return value ^ byteKey[index];
        // TODO: manage operation
        // TODO: manage short key
    });

    return _getStringFromByteArray(byteString);
};

/*** Datatype / ByteArray ***/
let _getByteArray = function (string) {
    let bytes = [];
    for (let i = 0; i < string.length; i++)
        bytes.push(string.charCodeAt(i));

    return bytes;
};

let _getStringFromByteArray = function (byteArray) {
    byteArray = byteArray.map(x => String.fromCharCode(x));
    return byteArray.join("");
};

/*** User names ***/
let _getUserName = function (caller) {
    return caller == 'a' ? "Alice" : "Bob";
};

let _getOtherUserName = function (caller) {
    return caller == 'a' ? "Bob" : "Alice";
};