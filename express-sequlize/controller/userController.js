const db = require("../config/db.config");
const user = db.users;
const toDo = db.toDo;
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const _secretKey = "kwaesfbcwqufcjwhfd32fejcn3hfsdlcj"

module.exports.registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    console.log(req.body);
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let result = await user.create({
      name: name,
      email: email,
      password: hash,
      jobCount:0,
    });
    let payload = {id:result.id}
    let token = jwt.sign(payload,_secretKey,{expiresIn:'1d'});
   

    res.status(200).json({
      token,
      result,
      message: "User created",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Login

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let userExist = await user.findOne({
      where: { email: email },
    });
    if (!userExist) {
      res.status(404).json({
        message: "email or password not matched",
        success: false,
      });
    } else {
      const isMatch = bcrypt.compareSync(password, userExist.password);
      if (isMatch) {
        let payload = {id:userExist.id}
         let token = jwt.sign(payload,_secretKey,{expiresIn:'1d'});
   
         console.log(userExist.id);
        res.status(200).json({
          userExist,
          token,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "email or password not matched",
        });
      }
    }

    
  } catch (error) {
    () => {
      res.status(404).json({
        error: error.message,
      });
    };
  }
};
// ERROR
// module.exports.registerUser = async (req, res) => {
//   try {
//     let { name, email, password } = req.body;
//     let result = await db.sequelize.query("INSERT INTO users(name, email, password) VALUES (name, email, password)",
//     {replacements: {
//             name: name,
//             email: email,
//             password: password,
//         },
//         type: DataTypes.INSERT,

//     }
//     );

//     res.status(200).json({
//       result,
//       message: "User created",
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// gert
module.exports.getAllUsers = async (req, res) => {
  try {
    //sequelize raw query
    // let result = await db.sequelize.query("SELECT * FROM users")

    //sequlize query function
    let result = await user.findAll();

    res.status(200).json({
      result,
      message: "all users",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get single User

module.exports.getSingleUsers =  (req, res) => {
  try {
    // Sequelize RAW QUERY
    // db.sequelize.query('SELECT * FROM users WHERE email LIKE :email',
    //     {
    //         replacements: { email: req.params.email },
    //         type: DataTypes.SELECT
    //     }
    //     ).then(result =>{
    //       res.send(result);
    //     }).catch(err=>{
    //       console.log(err)
    //     })

    //using findOne to select single data where parameter could be any field
    // console.log('comming');
     user.findOne({
      where: { email: req.params.email },
    }).then(result =>{
      let json = JSON.stringify(result);
      console.log(json);
      res.send(json);
    }).catch(err=>{
      console.log(err)
    })

    // if (result){
    //   console.log("hello"+result)
    //   res.send(result);
    // }
    //use of Primery Key
    //  let result = await user.findByPk(req.params.id)
   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update User

module.exports.updateUser = async (req, res) => {
  try {
    //error
    // await db.sequelize.query('UPDATE users SET name LIKE :name WHERE email LIKE :email',

    // {
    //     replacements:{name:req.body.name,
    //         email:req.params.email},
    //     type:DataTypes.UPDATE
    // })

    const updatedUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    await user.update(updatedUser, {
      where: { email: req.params.email },
    });

    res.status(200).json({
      updatedUser,

      message: "single updated:" + req.params.email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete User

module.exports.deleteUser = async (req, res) => {
  try {
    // Sequelize Raw Query
    // let result = await db.sequelize.query('DELETE FROM users WHERE email LIKE :email',
    // {
    //     replacements: {email:req.params.email},
    //     type:DataTypes.DELETE
    // }
    // )

    let result = await user.destroy({
      where: { email: req.params.email },
    });

    res.status(200).json({
      result,
      message: "User deleted",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//connect 1 to many user and toDo

module.exports.getUserjob =  (req, res) => {
  user.findAll({
    include: [
      {
        model: toDo,
        as: "toDo",
      },
    ],
    where: { id: req.params.id },
  })
  .then(result =>{
    console.log(result[0].toDo);
    let fresult = result[0].toDo;

    let json = JSON.stringify(fresult);
   
    res.send(json);
  }).catch(err=>{
    console.log(err)
  })
  // res.status(200).json({
  //   result,
  //   message: "jobs to do",
  // });
};

module.exports.jobCount = (req,res)=>{
  // console.log(req.body.count);
  // let data = req.body.count;
  //  console.log(req.body);
  const updated= {
    jobCount : req.body.jobCount,
  };
  console.log(updated.jobCount);
  console.log(req.params.id);
  try{
    user.update(updated,{
      where: { id:req.params.id}
    })
    .then(result =>{
      // console.log(result)
      res.status(200).json({
        success:true,
        result,
      });
      console.log("count updated")
    }
      

    ).catch(err=>{
      console.log(err)
    })
  }catch(error){
    console.log(error);
  }
}

