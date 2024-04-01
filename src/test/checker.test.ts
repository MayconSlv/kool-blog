import { CommentEntity, UserEntity } from '@data/db/entity'
import { UserModel } from '@domain/model'
import { CommentModel } from '@domain/model/comment.model'
import { expect } from 'chai'

export function checkComment(response: CommentModel, entity: CommentEntity) {
  expect(response).to.be.deep.eq({ id: entity.id, content: entity.content })
}

export function checkUser(response: UserModel, entity: UserEntity) {
  expect(response).to.be.deep.eq({
    id: entity.id,
    name: entity.name,
    username: entity.username,
    email: entity.email,
  })
}
