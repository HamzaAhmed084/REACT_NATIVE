const db = require("../config/db.config");

let toDo = db.toDo;

//create toDo
module.exports.createToDo = async (req, res) => {
  try {
    let { job, discription, User_id } = req.body;

    let result = await toDo.create({
      job: job,
      discription: discription,
      User_id: User_id,
    });
    res.status(200).json({
      result,
      message: "job Created",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get_All_Jobs

module.exports.getAllJobs = async (req, res) => {
  try {
    let result = await toDo.findAll();

    res.status(200).json({
      result,
      message: "all jobs",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.completeJob = (req, res) => {
  try {
    console.log('coming')
    toDo.destroy({
      where: { id: req.params.id },
    }).then(() =>{
        res.status(200).json({
            success:true,
        })
    }).catch(err=>{
      console.log(err);
    })
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
