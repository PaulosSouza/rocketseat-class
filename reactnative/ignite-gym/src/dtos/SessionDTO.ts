import { UserDTO } from './UserDTO'

export interface SessionDTO {
  refresh_token: string
  token: string
  user: UserDTO
}
