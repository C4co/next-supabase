import '@fontsource/roboto-condensed/400.css'
import '@fontsource/roboto-condensed/700.css'
import '../styles/global.css'

import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/router'

import { CONTENT } from '../content'

i18n.use(initReactI18next).init(CONTENT)

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter()

  return (
    <UserProvider supabaseClient={supabaseClient} pathname={pathname}>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
