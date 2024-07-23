import { UserModel } from './user.model'

export interface CreatedGroupModel {
  id: string
  name: string
  description: string
  group_creator: string
}

export interface CreateGroupInputModel {
  name: string
  description: string
  userCreator: string
}

export interface GroupModel {
  id: string
  name: string
  description: string
  group_creator: string
}

export interface DetailedGroupModel extends GroupModel {
  participants: UserModel[]
}
