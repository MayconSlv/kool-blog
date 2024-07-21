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
