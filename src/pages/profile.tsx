import { withPageAuth, supabaseClient } from '@supabase/auth-helpers-nextjs'
import Router from 'next/router'
import Image from 'next/image'
import { User } from '@/types'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

export default function Profile({ user }: { user: User }) {
  const [website, setWebsite] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [avatarUrl, setAvatarUrl] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  async function signOut() {
    await supabaseClient.auth.signOut()
    Router.push('/login')
  }

  // get all data
  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, status, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setWebsite(data.website || '')
        setUsername(data.username || '')
        setAvatarUrl(data.avatar_url || '')
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }, [user])

  // update all data
  const updateProfile = useCallback(async () => {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      }

      const { error, status } = await supabaseClient
        .from('profiles')
        .upsert(updates)

      if (error && status !== 406) {
        throw error
      }
    } catch (error) {
      alert('error.message')
    } finally {
      setLoading(false)
    }
  }, [user, website, avatarUrl, username])

  useEffect(() => {
    getProfile()
  }, [getProfile])

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 justify-center items-center">
      <div className="p-4 w-full max-w-[400px] border border-gray-200 rounded-lg flex gap-4 items-center">
        <figure className="w-[80px] h-[80px] rounded-full overflow-hidden">
          <Image
            alt="user avatar"
            width={100}
            height={100}
            src={user.user_metadata.picture}
          />
        </figure>

        <div>
          <p className="text-gray-800 text-2xl">{user.user_metadata.name}</p>
          <p className="text-gray-500">{user.user_metadata.email}</p>

          <button onClick={signOut} className="text-red-500 hover:underline">
            Sign out ⟶
          </button>
        </div>
      </div>

      <div className="p-4 w-full max-w-[400px] border border-gray-200 rounded-lg flex flex-col gap-4 items-center">
        <h1 className="text-gray-600 w-full font-bold uppercase text-sm">
          Edit Profile
        </h1>

        <hr className="border-gray-200 w-full" />

        <div className="w-full">
          <span className="text-gray-500 text-sm"> Website </span>
          <input
            value={website}
            type="text"
            className="p-2 rounded w-full border-gray-300 text-gray-600"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setWebsite(e.currentTarget.value)
            }
          />
        </div>

        <div className="w-full">
          <span className="text-gray-500 text-sm"> Name </span>
          <input
            value={username}
            type="text"
            className="p-2 rounded w-full border-gray-300 text-gray-600"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)
            }
          />
        </div>

        <div className="w-full">
          <span className="text-gray-500 text-sm"> Avatar url </span>
          <input
            value={avatarUrl}
            type="text"
            className="p-2 rounded w-full border-gray-300 text-gray-600"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAvatarUrl(e.currentTarget.value)
            }
          />
        </div>

        <button
          onClick={updateProfile}
          className="disabled:opacity-50 disabled:bg-black disabled:cursor-not-allowed w-full px-6 py-2 transition-all rounded bg-blue-600 hover:bg-blue-800 text-white"
          aria-live="polite"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Atualizar'}
        </button>
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })
