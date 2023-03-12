var stompClient = null;

export const connectToChat = async (userId, onMsgCallback, updateChat) => {
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");

    SockJS = new SockJS(`${process.env.REACT_APP_URL_TEST}/ws`);
    stompClient = Stomp.over(SockJS);

    await stompClient.connect({
        // Authorization: `Bearer ${localStorage.getItem("token")}`
    },  () => onConnected(userId, onMsgCallback, updateChat), onError);
    
};
const onConnected = async (id, onMsgCallback, updateChat) => {
        await stompClient.subscribe(
            `/user/${id}/queue/messages`, onMsgCallback
        );
        await updateChat()
        console.log("connected");
        // if (createRoomData) {
        //     console.log(createRoomData)
        //     await sendMessage('Room created', createRoomData.userId, Number(createRoomData.vendorId), createRoomData.userFirstName, createRoomData.vendorFirstName)
        // }
    
};

const onError = (err) => {
    console.log(err);
};
export const sendMessage = async (msg,senderId,recipientId,senderName,recipientName) => {
    // debugger
    if (msg.trim() !== "") {
        const message = {
            senderId: senderId,
            recipientId: Number(recipientId),
            senderName:senderName,
            recipientName: recipientName,
            content: msg,
            timestamp: new Date(),
        };

       await  stompClient.send("/app/chat", {}, JSON.stringify(message));
       
    }
};

