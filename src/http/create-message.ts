interface CreateMessageRequest {
  roomId: string
  message: string
}

export async function createMessage({
  roomId,
  message
}: CreateMessageRequest) {
  const response = await fetch(
    `http://localhost:8080/api/rooms/${roomId}/messages`,
    {
      method: 'POST',
      body: JSON.stringify({
        message
      })
    }
  )

  const data: { id: string } = await response.json()

  return { message: data.id }
}
