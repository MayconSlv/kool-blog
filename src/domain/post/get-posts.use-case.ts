import { PostDbDataSource } from '@data/post'
import { PostModel } from '@domain/model/post.model'
import { Service } from 'typedi'

@Service()
export class GetAllPostUseCase {
  constructor(private readonly postDataSource: PostDbDataSource) {}

  execute(): Promise<PostModel[]> {
    return this.postDataSource.find()
  }
}
