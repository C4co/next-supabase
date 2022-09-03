import Head from 'next/head'

type PageProps = {
  children: any
  title?: string
}

export function Page({ children, title = 'CN Next Starter' }: PageProps) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      {children}
    </div>
  )
}
