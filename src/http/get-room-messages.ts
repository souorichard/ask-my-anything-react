interface GetRoomMessagesRequest {
  roomId: string    
}

export interface GetRoomMessagesResponse {
  messages: {
    id: string;
    text: string;
    amountOfReactions: number;
    answered: boolean;
  }[]
}

export async function getRoomMessages({ roomId }: GetRoomMessagesRequest): Promise<GetRoomMessagesResponse> {
  const response = await fetch(
      `http://localhost:8080/api/rooms/${roomId}/messages`,
    {
      method: 'GET'
    }
  )

  const data: Array<{
    id: string
    room_id: string
    message: string
    reaction_count: number
    answred: boolean
  }> = await response.json()

  return {
    messages: data.map((item) => {
      return {
        id: item.id,
        text: item.message,
        amountOfReactions: item.reaction_count,
        answered: item.answred
      }
    })
  }
}