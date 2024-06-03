import {
  CreationOptional,
  DataTypes,
  Model,
  Sequelize
} from 'sequelize'

export class Logging extends Model {
  declare id: CreationOptional<number>
  declare organisation: string | null
  declare loglevel: string | null
  declare timestamp: Date | null
  declare logtext: string | null

  static initModel(sequelize: Sequelize): typeof Logging {
    Logging.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      organisation: {
        type: DataTypes.UUID
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      loglevel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logtext: {
        type: DataTypes.STRING,
        allowNull: false,
      }
      }, {
      sequelize,
      tableName: 'logging'
    })
    
    return Logging
  }
}
