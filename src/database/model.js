import { Model, DataTypes, Sequelize } from 'sequelize';
import util from 'util';
import url from 'url'
import connectToDB from './db.js'

export const db = await connectToDB('postgresql:///forum')

//user table
export class User extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }
  
  User.init(
    {
      userID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      modelName: 'user',
      sequelize: db,
    },
);

//post table
export class Post extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }
  
  Post.init(
    {
      postID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(60),
        unique: true,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      body: {
        type: DataTypes.STRING(500),
        allowNull: false
      }
    },
    {
      modelName: 'post',
      sequelize: db,
      timestamps: true,
      updatedAt: false
    },
);

//comment table
export class Comment extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }
  
  Comment.init(
    {
      commentID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      body: {
        type: DataTypes.STRING(250),
        allowNull: false
      }
    },
    {
      modelName: 'comment',
      sequelize: db,
      timestamps: true,
      updatedAt: false
    },
);

//post like table
export class PostLike extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }
  
  PostLike.init(
    {
      postLikeID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      modelName: 'postLike',
      sequelize: db,
    },
);

//comment like table
export class CommentLike extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }
  
  CommentLike.init(
    {
      commentLikeID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      modelName: 'commentLike',
      sequelize: db,
    },
);

//relationships
User.hasMany(Post, {foreignKey: 'userID'})
Post.belongsTo(User, {foreignKey: 'userID'})

User.hasMany(Comment, {foreignKey: 'userID'})
Comment.belongsTo(User, {foreignKey: 'userID'})

Post.hasMany(Comment, {foreignKey: 'postID'})
Comment.belongsTo(Post, {foreignKey: 'postID'})

Post.hasMany(PostLike, {foreignKey: 'postID'})
PostLike.belongsTo(Post, {foreignKey: 'postID'})

Comment.hasMany(CommentLike, {foreignKey: 'commentID'})
CommentLike.belongsTo(Comment, {foreignKey: 'commentID'})

User.hasMany(PostLike, {foreignKey: 'userID'})
PostLike.belongsTo(User, {foreignKey: 'userID'})

User.hasMany(CommentLike, {foreignKey: 'userID'})
CommentLike.belongsTo(User, {foreignKey: 'userID'})

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
    console.log('Syncing database...');
    await db.sync();
    console.log('Finished syncing database!');
}