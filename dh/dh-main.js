/*** Encryption / Decryption ***/
let _otp = function (string, key) {
    var byteString = _getByteArray(string);
    const byteKey = _getByteArray(key);

    byteString = byteString.map((value, index) =>
        value ^ byteKey[index % byteKey.length]);

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

/*** Math ***/
let GetRandomInteger = function (max) {
    return Math.floor(Math.random() * (max - 1)) + 1;
};

let expmod = function (base, exp, mod) {
    if (exp == 0)
        return 1;
    if (exp % 2 == 0)
        return Math.pow(expmod(base, (exp / 2), mod), 2) % mod;
    return (base * expmod(base, (exp - 1), mod)) % mod;
};