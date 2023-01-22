var stompClient = null;

export const connectToChat = async (userId) => {
    // const headers = {
    //     "Access-Control-Allow-Origin": "*"
    //     // "Authorization": `Bearer ${token}`
    // }
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");

    SockJS = new SockJS("http://142.93.15.46:8080/ws");
    stompClient = Stomp.over(SockJS);

    // console.log(headers)

    // await stompClient.connect(JSON.stringify({'X-Authorization': `Bearer ${token}`}),  onConnected, onError);
    await stompClient.connect({},  onConnected, onError);
    
    // console.log("connected and sub");

    //     const message = {
    //         senderId: senderId,
    //         recipientId: recipientId,
    //         senderName:senderName,
    //         recipientName: recipientName,
    //         content: 'hello anywhere!',
    //         timestamp: new Date(),
    //     };

    //    await  stompClient.send("/app/chat", {}, JSON.stringify(message));
};
const onConnected = async () => {
        await stompClient.subscribe(
            `/user/${2}/queue/messages`, (mess) => console.log(mess)
            // onMessageReceived
        );
        console.log("connected");

    // sendMessage("adilet arybaev",senderId,recipientId,senderName,recipientName)
};

const onError = (err) => {
    console.log(err);
};
export const sendMessage = async (msg,senderId,recipientId,senderName,recipientName) => {
    // if (msg.trim() !== "") {
        const message = {
            senderId: senderId,
            recipientId: recipientId,
            senderName:senderName,
            recipientName: recipientName,
            content: msg,
            timestamp: new Date(),
        };
       await  stompClient.send("/app/chat", {}, JSON.stringify(message));
    // }
};