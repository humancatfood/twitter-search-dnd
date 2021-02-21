export interface IUser {
  name: string
  screen_name: string
  profile_image_url_https: string
}

export interface ITweet {
  id: number
  user: IUser
  created_at: string
  text: string
}
