import type { Sequelize } from 'sequelize'
import { User } from './User'
import { Logging } from './Logging'

export {
  User,
  Logging,
}

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize)
  Logging.initModel(sequelize)

  return {
    User,
    Logging
  }
}
