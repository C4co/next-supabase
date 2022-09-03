import { supabase } from '@/services'
import { HiLightningBolt } from 'react-icons/hi'

export default function Login() {
  async function signInWithGoogle() {
    await supabase.auth.signIn({
      provider: 'google',
    })
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-6 w-full max-w-[500px] border border-gray-200 p-6 rounded-lg">
        <HiLightningBolt className="text-5xl text-gray-400" />

        <header>
          <h1 className="text-gray-800 text-2xl"> Sign in </h1>
          <p className="text-gray-500">Nextjs + Supabase boilerplate</p>
        </header>

        <button
          onClick={signInWithGoogle}
          className="w-full px-6 py-2 transition-all rounded bg-red-600 hover:bg-red-800 text-white"
          aria-live="polite"
        >
          Sign in with <b>Google</b>
        </button>
      </div>
    </div>
  )
}
