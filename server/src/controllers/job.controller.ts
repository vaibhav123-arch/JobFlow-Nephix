import type{Request,Response} from "express";
import Job from "../models/job.model.js";

const getJobs = async(req:Request,res:Response)=>{
try{
const jobs = await Job.find();    
res.json({
    "message" : "Jobs fetched successfully",
    "jobs" : jobs
});
}
catch(error){
    res.status(500).json({
        "message" : "jobs fetching failed",
        "jobs" : error
    });
}
};
const createJob = async(req:Request , res:Response)=>{
    try{
        const newJob= await Job.create(req.body);
        res.status(201).json({
            "message": "Job created successfully",
            "job": newJob
        });
    }
    catch(error){
        res.status(500).json({
            "message":"Job not created",
            error:error
        });
    }
};

const updateJob = async(req:Request , res:Response )=>{
    try{
        const updated = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true , runValidators:true}
        );

        if(!updated){
            return res.status(404).json({
                "message": "job not found"
            });
        }

        res.status(200).json({
            "message": "Job updated successfully",
            job:updated    
        });
    }
    catch(error){
        res.status(500).json({
            "message" : "Job not updated",
            error:error
        });
    }
};

export {getJobs,createJob,updateJob};