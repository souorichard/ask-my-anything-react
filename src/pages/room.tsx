import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Share2 } from 'lucide-react'
import { toast } from 'sonner'

import amaLogo from '../assets/ama-logo.svg'
import { Messages } from '../components/messages'
import { CreateMessageForm } from '../components/create-message-form'

export function Room() {
  const { roomId } = useParams()

  function handleShareRoom() {
    const url = window.location.href.toString()

    if (navigator.share !== undefined && navigator.canShare()) {
      navigator.share({ url })
    } else {
      navigator.clipboard.writeText(url)

      toast.info('O link da sala foi copiado para área de transferência!')
    }
  }

  return (
    <main className="max-w-[640px] mx-auto px-4 py-10 flex flex-col gap-6">
      <header className="px-3 flex items-center gap-3">
        <img src={amaLogo} alt="AMA" className="h-5" />
        <span
          className="text-sm text-zinc-500 truncate"
        >
          Código da sala: <span className="text-zinc-300">{roomId}</span>
        </span>
        <button
          type="submit"
          onClick={handleShareRoom}
          className="px-3 py-1.5 ml-auto flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm font-medium text-zinc-300"
        >
          Compartilhar
          <Share2 className="size-4" />
        </button>
      </header>

      <div className="w-full h-px bg-zinc-900" />

      <CreateMessageForm />

      <Suspense fallback={<p>Carregando...</p>}>
        <Messages />
      </Suspense>
    </main>
  )
}