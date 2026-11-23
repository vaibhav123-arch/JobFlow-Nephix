import type{Request,Response} from "express";
import Job from "../models/job.model.js";
import mongoose from "mongoose";

const getJobs = async(req:Request,res:Response)=>{
try{
const jobs = await Job.find();    
 return res.json({
    "message" : "Jobs fetched successfully",
    "jobs" : jobs
});
}
catch(error){
    return res.status(500).json({
        "message" : "jobs fetching failed",
        "jobs" : error
    });
}
};
const createJob = async(req:Request , res:Response)=>{
    try{
        const{title,company,description,location} = req.body;

        if(!title?.trim() || !company?.trim() || !description?.trim() || !location?.trim() ){
            return res.status(400).json({
                message : "Plz send all required fields"
            });
        }

        if(req.body.salary !== undefined && typeof req.body.salary !=="number" ){
            return res.status(400).json({
                message:"Salary should be a number"
            })
        }

        if (
        req.body.isRemote !== undefined &&
        typeof req.body.isRemote !== "boolean"
        ) {
        return res.status(400).json({
        message: "isRemote must be a boolean"
        });
        }

        const newJob= await Job.create(req.body);
        return res.status(201).json({
            "message": "Job created successfully",
            "job": newJob
        });
    }
    catch(error){
        return res.status(500).json({
            "message":"Job not created",
            error:error
        });
    }
};

const updateJob = async(req:Request , res:Response )=>{
    try{
        if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
        message: "Invalid job ID"
        });
        }

        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                message : "plz return atleast one field to update"
            })
        }

        if (
        req.body.salary !== undefined &&
        typeof req.body.salary !== "number"
        ) {
        return res.status(400).json({
        message: "Salary must be a number"
        });
        }

        if (
        req.body.isRemote !== undefined &&
        typeof req.body.isRemote !== "boolean"
        ) {
        return res.status(400).json({
        message: "isRemote must be a boolean"
        });
        }

        const { title, company, description, location } = req.body;

        if (
        (title !== undefined && (typeof title !== "string" || !title.trim())) ||
        (company !== undefined && (typeof company !== "string" || !company.trim())) ||
        (description !== undefined && (typeof description !== "string" || !description.trim())) ||
        (location !== undefined && (typeof location !== "string" || !location.trim()))
        ) {
        return res.status(400).json({
          message: "String fields must contain valid text"
        });
        }

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

        return res.status(200).json({
            "message": "Job updated successfully",
            job:updated    
        });
    }
    catch(error){
        return res.status(500).json({
            "message" : "Job not updated",
            error:error
        });
    }
};

const deleteJob = async(req:Request , res:Response)=>{
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).json({
              message : "invalid id" 
            })
        }
        const deleted = await Job.findByIdAndDelete(req.params.id);
        
        if(!deleted){
            return res.status(404).json({
                message: "Job not found"
            });
        }
         
       return res.status(200).json({
            message : "Job deleted successfully",
            job : deleted
        });
    }
    catch(error){
       return res.status(500).json({
            message : "failed to delete job",
            error : error
        });
    }
};


export {getJobs,createJob,updateJob,deleteJob};