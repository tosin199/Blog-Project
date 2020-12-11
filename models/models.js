class Model {

  constructor(sequelize,Sequelize){
    this.sequelize = sequelize,
    this.Sequelize = Sequelize
  }

  User = () =>{
    return this.sequelize.define('user',
      { 
        id:{
        type:this.Sequelize.INTEGER,
        allowNull:false,autoIncrement:true,
        primaryKey:true
      },
        firstname:{
          type:this.Sequelize.STRING,
          allowNull:false
        },
        lastname:{
          type:this.Sequelize.STRING,
          allowNull:false
        },
        email :{ 
          type:this.Sequelize.STRING,
          allowNull:false,
          unique:true
        },
        profilePicture:{
          type:this.Sequelize.STRING,
          allowNull: true
        },
        isAdmin:{
          type:this.Sequelize.BOOLEAN
        },
        bio:{
          type:this.Sequelize.STRING,
        },
        password:{
          type:this.Sequelize.STRING,
          allowNull:false,
          unique:true
        }
      }
    );
  };

  Sub = () => {
    return this.sequelize.define(
      'subs',
      {
        id:{
          type:this.Sequelize.INTEGER,
          allowNull:false,
          autoIncrement:true,
          primaryKey:true
        }
      }
    );
  };
  categorySubScribed = () => {
    return this.sequelize.define(
      'categorysubscribe',
      {
        id:{
          type:this.Sequelize.INTEGER,
          allowNull:false,
          autoIncrement:true,
          primaryKey:true
        },
      }
    );
  };

  category = () => {
    return this.sequelize.define(
      'category',
      {
      id: {
        type: this.Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: this.Sequelize.STRING(100),
        allowNull: false,
        primaryKey: false
      },
      description: {
        type: this.Sequelize.STRING(250),
        allowNull: true,
        primaryKey: false
      },
  
    });
  };

  post = () =>{
    return this.sequelize.define('post', {
      id: {
        type: this.Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: this.Sequelize.STRING(200),
        allowNull: true,
        primaryKey: false
      },
      body: {
        type: this.Sequelize.STRING(2000),
        allowNull: true,
        primaryKey: false
      },
      author:{
        type: this.Sequelize.STRING(2000),
        allowNull: true,
        primaryKey: false
      },
      isPublished:{
        type:this.Sequelize.BOOLEAN,
        defaultValue:false
      }
    });
  };

  postImages = ()=>{
    return this.sequelize.define(
      'postImage',{
        id: {
          type: this.Sequelize.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        image: {
          type: this.Sequelize.STRING,
          allowNull:true
        }
      }
    )
  }

  reaction = () =>{
    return this.sequelize.define(
      'reaction',
      {
      id:{
        type:this.Sequelize.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
      },
      reaction:{
        type:this.Sequelize.BOOLEAN,
        allowNull: false
      }
   });
  };
  share = () =>{
    return  this.sequelize.define("share", {
      id: {
        type: this.Sequelize.INTEGER,
        allowNull: this.false,
        autoIncrement: true,
        primaryKey: true
      },
      status: {
        type: this.Sequelize.BOOLEAN,
        allowNull: false
      }
    });
  };
  comment = () => {
     return this.sequelize.define('comment',
      {
      id: {
        type: this.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: this.Sequelize.TEXT,
        allowNull: true,
      },
      image: {
        type: this.Sequelize.STRING,
        allowNull:true
      }
      }
    );
  };
  commentReaction = () => {
    return this.sequelize.define('commentReaction',
    {
      id: {
        type: this.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: this.Sequelize.BOOLEAN,
        allowNull: true
      }
     })
  };
  commentReply = () => {
    return this.sequelize.define('commentReply',
    {
      id: {
        type: this.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      content: {
        type: this.Sequelize.TEXT,
        allowNull: true
      }
     })
  };
  commentReplyReaction = () => {
    return this.sequelize.define('commentReplyReaction',
    {
      id: {
        type: this.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: this.Sequelize.BOOLEAN,
        allowNull: true
      }
     })
  };
  isLoggedOut = () =>{
    return this.sequelize.define(
      'isLoggedOut',
      {
      id:{
        type:this.Sequelize.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
      },
      status:{
        type:this.Sequelize.BOOLEAN,
        allowNull: true,
      }
   });
  };
  resetPasswordCode = () =>{
    return this.sequelize.define(
      'resetPasswordCode',
      {
      id:{
        type:this.Sequelize.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
      },
      code:{
        type:this.Sequelize.STRING,
        allowNull: true,
      }
   });
  };

  
  
}

module.exports = Model;
  