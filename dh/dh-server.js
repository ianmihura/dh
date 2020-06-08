/*** Server Recieve ***/
let ServerRecieve = function (caller, cipher, isKeyExchange) {
    getById("server-main").innerText = cipher;

    // Server log
    const sender = _getUserName(caller);
    const recipient = _getOtherUserName(caller);

    if (isKeyExchange)
        Log(`Incoming key exchange from ${sender}, to ${recipient}.`);
    else
        Log(`Incoming message from ${sender}, to ${recipient}.`);

    Log(`Payload body: ${cipher}`);
};

/*** Server Send ***/
let ServerSend = function (to) {
    const message = getById("server-main").innerText;

    // User recieve
    UserRecieve(to, message);

    // Server log
    const recipient = _getUserName(to);
    Log(`Sending payload to ${recipient}`);
};

/*** Server Logs ***/
let ClearLogs = function (id) {
    getById(id).innerHTML = "";
};

let Log = function (log) {
    console.log(log);
    const date = new Date();
    const stringDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
    getById("log").innerHTML += `<p>${stringDate}: ${log}</p>`;
};

/*** Calculator ***/
let ShowCalculator = function () {
    getById("calculator-segment").classList.toggle("hidden");
};

let CalcLog = function (log) {
    getById("calc-log").innerHTML += `<p>${log}</p>`;
};

let CalculatorOTP = function () {
    let payload = getById("calc-otp-payload").value;
    let key = getById("calc-otp-key").value;
    let cipher = _otp(payload, key);

    CalcLog(`(OTP) ${cipher} = ${payload} xor ${key}|extended`);
};

let CalculatorExponent = function () {
    let base = getById("calc-exp-base").value;
    let exp = getById("calc-exp-exp").value;
    let mod = getById("calc-exp-mod").value;
    let result = expmod(base, exp, mod);

    CalcLog(`(EXP-MOD) ${result} = ${base} ^ ${exp} mod ${mod}`);
};