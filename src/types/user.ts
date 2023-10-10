import { type Nullable } from '.'

export type UserData = {
  photoUrl: Nullable<string>
  username: Nullable<string>
  email: Nullable<string>
}

export type LoadersActionPayload<T> = {
  value: boolean
  loaderKey: T
}

export type UserState = {
  isAuthorized: boolean
  userData: UserData
  loaders: {
    photo: boolean
  }
}

export type CredentialsData = {
  login: string
  password: string
}
