import { useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { createMessage } from "../http/create-message";
import { toast } from "sonner";

export function CreateMessageForm() {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages components must be used within room page')
  }

  async function createMessageAction(data: FormData) {
    const message = data.get('message')?.toString()

    if (!message || !roomId) return

    try {
      await createMessage({ roomId, message })
    } catch (err) {
      toast.error('Falha ao enviar pergunta, tente novamente!')
    }
  }

  return (
    <form
      action={createMessageAction}
      className="p-2 flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl ring-offset-2 ring-offset-zinc-950 ring-orange-400 focus-within:ring-1"
    >
      <input
        type="text"
        name="message"
        placeholder='Qual a sua pergunta?'
        autoComplete='off'
        className="mx-2 flex-1 bg-transparent outline-none placeholder:text-zinc-500 text-sm text-zinc-100"
        required
      />
      <button
        type="submit"
        className="px-3 py-1.5 flex items-center gap-1.5 bg-orange-400 hover:bg-orange-500 rounded-lg transition-colors text-sm font-medium text-orange-950"
      >
        Criar pergunta
        <ArrowRight className="size-4" />
      </button>
    </form>
  )
}