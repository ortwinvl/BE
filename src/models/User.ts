import {
  CreationOptional,
  DataTypes,
  Model,
  Sequelize
} from 'sequelize'


export class User extends Model {
  declare id: CreationOptional<number>
  declare name: string
  declare firstname: string | null
  declare password: string
  declare email: string
  declare active: number
  declare organisation: string | null
  declare language: number | null
  declare role: number | null
  declare mfa: string | null
  declare mfadate: Date | null
  declare resetlink: string | null
  declare resetlinktimestamp: Date | null
  
  static initModel(sequelize: Sequelize): typeof User {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstname: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      active: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
      },
      organisation: {
        type: DataTypes.UUID
      },
      language: {
        type: DataTypes.INTEGER
      },
      role: {
        type: DataTypes.INTEGER
      },
      mfa: {
        type: DataTypes.STRING
      },
      mfadate:{
        type: DataTypes.DATE
      },
      resetlink: {
        type: DataTypes.STRING
      },
      resetlinktimestamp:{
        type: DataTypes.DATE
      },
    }, {
      sequelize,
      tableName: 'user'
    })
    
    return User
  }
}
