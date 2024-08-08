interface RemoveMessageReactionRequest {
  roomId: string
  messageId: string
}

export async function removeMessageReaction({
  roomId,
  messageId
}: RemoveMessageReactionRequest) {
  await fetch(
    `http://localhost:8080/api/rooms/${roomId}/messages/${messageId}/react`,
    {
      method: 'DELETE',
    }
  )
}
