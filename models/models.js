class Model {

  constructor(sequelize,Sequelize){
    this.sequelize = sequelize,
    this.Sequelize = Sequelize
  }

  User = () =>{
    return this.sequelize.define('user',{ id:{type:this.Sequelize.INTEGER,allowNull:false,autoIncrement:true,primaryKey:true},
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
          // validate:{
          //   isEmail:true
          // }
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
      // ,{
        //  freezeTableName:true,
        // }
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
    });
  };

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
      }
      }
    );
  };
  
  
}

module.exports = Model;
  