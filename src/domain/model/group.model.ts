import { UserModel } from './user.model'

export interface CreateGroupInputModel {
  name: string
  description: string
  userCreator: string
}

export interface GroupModel {
  id: string
  name: string
  description: string
  groupCreator: UserModel
}

export interface DetailedGroupModel extends GroupModel {
  participants: UserModel[]
}
