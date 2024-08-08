import { useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { toast } from "sonner";

import { createMessageReaction } from "../http/create-message-reaction";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string
  text: string
  amountOfReactions: number
  answered?: boolean
}

export function Message({
  id: messageId,
  text, 
  amountOfReactions, 
  answered = false 
}: MessageProps) {
  const [hasReacted, setHasReacted] = useState(false)
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages components must be used within room page')
  }

  async function createMessageReactionAction() {
    if (!roomId) return
    
    try {
      await createMessageReaction({ roomId, messageId })
    } catch (err) {
      toast.error('Falha ao curtir mensagem, tente novamente!')
    }  

    setHasReacted(true)
  }

  async function removeMessageReactionAction() {
    if (!roomId) return
    
    try {
      await removeMessageReaction({ roomId, messageId })
    } catch (err) {
      toast.error('Falha ao remover reação, tente novamente!')
    }  

    setHasReacted(false)
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 text-zinc-100 leading-relaxed data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}

      {hasReacted ? (
        <button
          type="button"
          onClick={removeMessageReactionAction}
          className="mt-3 flex items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-500"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button
          type="button"
          onClick={createMessageReactionAction}
          className="mt-3 flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-300"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      )}
    </li>
  )
}