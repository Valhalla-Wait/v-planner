export const getRecipients = (chatRooms, userList) => {
    
    if (!chatRooms.length || !userList.length) return []
    const recipientsIds = chatRooms.map((room) => Number(room.recipientId))
    const recipients = []
    for (let i = 0; i < recipientsIds.length; i++) {
      const findRecipients = userList.find((user) => user.id === recipientsIds[i])
      findRecipients && recipients.push(findRecipients)
    }

    return recipients
  }