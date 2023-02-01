const {AssignedTask}=require('../Models/models');

const createAssignedTask=async(req,res)=>{
    const assignedTask=new AssignedTask({
        ...req.body
    });
    try{
        const savedAssignedTask=await assignedTask.save();
        res.status(201).send(savedAssignedTask);
    }catch(error){
        res.status(400).send({error:error.message});
    }
}

const getAssignedTasks=async(req,res)=>{
    try{
        const assignedTasks=await AssignedTask.find({});
        res.status(200).send(assignedTasks);
    }catch(error){
        res.status(400).send({error:error.message});
    }
}

const getAssignedTask=async(req,res)=>{
    const {id}=req.params;
    try{
        const assignedTask=await AssignedTask.findById(id);
        if(!assignedTask){
            return res.status(404).send({error:"AssignedTask not found"});
        }
        res.status(200).send(assignedTask);
    }catch(error){
        res.status(400).send({error:error.message});
    }
}

const updateAssignedTask=async(req,res)=>{
    const { id } = req.params;

    try {
        const assignedTask = await AssignedTask.findByIdAndUpdate(id, req.body, {
          new: true
        });
        if (!assignedTask) {
          return res.status(404).send({ error: "assignedTask not found" });
        }
        res.status(200).send(assignedTask);
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    };

const deleteAssignedTask=async(req,res)=>{
    const {id}=req.params;
    try{
        const assignedTask=await AssignedTask.findByIdAndDelete(id);
        if(!assignedTask){
            return res.status(404).send({error:"AssignedTask not found"});
        }
        res.status(200).send(assignedTask);
    }catch(error){
        res.status(400).send({error:error.message});
    }
}

module.exports={
    createAssignedTask,
    getAssignedTasks,
    getAssignedTask,
    updateAssignedTask,
    deleteAssignedTask
}

