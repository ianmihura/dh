/*** Server Recieve ***/
let ServerRecieve = function (caller, cipher) {
    getById("server-main").innerText = cipher;

    // Server log
    const sender = _getUserName(caller);
    const recipient = _getOtherUserName(caller);
    Log(`Incoming message from ${sender}, to ${recipient}.`);
    Log(`Message body: ${cipher}`);

};

/*** Server Send ***/
let ServerSend = function (to) {
    const message = getById("server-main").innerText;

    // User recieve
    UserRecieve(to, message);

    // Server log
    const recipient = _getUserName(to);
    Log(`Sending message to ${recipient}`);
};

/*** Server Logs ***/
let ClearLogs = function () {
    getById("log").innerHTML = "";
};

let Log = function (log) {
    console.log(log);
    const date = new Date();
    const stringDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
    getById("log").innerHTML += `<p>${stringDate}: ${log}</p>`;
};
