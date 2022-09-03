export type User = {
  id: string
  role?: string
  email?: string
  phone?: string
  app_metadata?: {
    provider?: string
    providers?: string[]
  }
  user_metadata: {
    avatar_url?: string
    email?: string
    email_verified?: boolean
    full_name?: string
    name?: string
    picture?: string
  }
}

export type Session = {
  id?: string
  access_token?: string
  user: User
}

export type Profile = {
  username?: string
  website?: string
  email?: string
}
