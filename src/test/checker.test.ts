import { CommentEntity } from '@data/db/entity'
import { CommentModel } from '@domain/model/comment.model'
import { expect } from 'chai'

export function checkComment(response: CommentModel, entity: CommentEntity) {
  expect(response).to.be.deep.eq({ id: entity.id, content: entity.content })
}
