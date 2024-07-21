import { CheckUserPermissionsUseCase } from '@domain/role'
import * as sinon from 'sinon'

export class RequestAuthenticator {
  private sinon = sinon

  setup() {
    console.log('teste segundo')
    this.sinon.stub(CheckUserPermissionsUseCase.prototype, 'exec').returns(Promise.resolve(true))
  }

  tearDown() {
    this.sinon.restore()
  }
}
