import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

import amaLogo from '../assets/ama-logo.svg'
import { createRoom } from '../http/create-room'

export function CreateRoom() {
  const navigate = useNavigate()

  async function handleCreateRoom(data: FormData) {
    const theme = data.get('theme')?.toString()

    if (!theme) return

    try {
      const { roomId } = await createRoom({ theme })

      navigate(`/room/${roomId}`)
    } catch (err) {
      toast.error('Falha ao criar sala!')
    }
  }

  return (
    <main className="h-screen px-4 flex justify-center items-center">
      <div className="max-w-[450px] flex flex-col gap-6">
        <img src={amaLogo} alt="AMA" className="h-10" />

        <p className="text-zinc-300 leading-relaxed text-center">
          Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas mais importantes para a comunidade.
        </p>
        
        <form
          action={handleCreateRoom}
          className="p-2 flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl ring-offset-2 ring-offset-zinc-950 ring-orange-400 focus-within:ring-1"
        >
          <input
            type="text"
            name="theme"
            placeholder='Nome da sala'
            autoComplete='off'
            className="mx-2 flex-1 bg-transparent outline-none placeholder:text-zinc-500 text-sm text-zinc-100"
            required
          />
          <button
            type="submit"
            className="px-3 py-1.5 flex items-center gap-1.5 bg-orange-400 hover:bg-orange-500 rounded-lg transition-colors text-sm font-medium text-orange-950"
          >
            Criar sala
            <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </main>
  )
}