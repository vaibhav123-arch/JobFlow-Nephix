import type{Request,Response,NextFunction} from "express";
import Job from "../models/job.model.js";
import mongoose from "mongoose";

const getJobs = async(req:Request,res:Response,next:NextFunction)=>{
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

      if (
      !req.body ||
      typeof req.body !== "object" ||
      Array.isArray(req.body)
      ) {
      return res.status(400).json({
      message: "Request body must be a valid object"
       });
       }

        const allowedFields = [
            "title",
            "company",
            "description",
            "location",
            "salary",
            "isRemote"
        ];

        const receivedFields = Object.keys(req.body);

        const invalidFields = receivedFields.some((field) => {
            return !allowedFields.includes(field);
        });

        if (invalidFields) {
            return res.status(400).json({
                message: "Invalid fields provided"
            });
        }
        
        const{title,company,description,location} = req.body;
    if (
    typeof title !== "string" || !title.trim() ||
    typeof company !== "string" || !company.trim() ||
    typeof description !== "string" || !description.trim() ||
    typeof location !== "string" || !location.trim()
    ) {
    return res.status(400).json({
        message: "Please provide valid required fields"
    });
    }

        if(req.body.salary !== undefined && (typeof req.body.salary !== "number" ||
        !Number.isFinite(req.body.salary) ||
        req.body.salary < 0) ){
            return res.status(400).json({
                message:"Salary should be a valid non negative number"
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

        const newJob = await Job.create({
        title,
        company,
        description,
        location,
        salary: req.body.salary,
        isRemote: req.body.isRemote
        });

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
        if (
        !req.body ||
        typeof req.body !== "object" ||
        Array.isArray(req.body)
        ) {
        return res.status(400).json({
        message: "Request body must be a valid object"
        });
        } 

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

    const allowedFields = [
    "title",
    "company",
    "description",
    "location",
    "salary",
    "isRemote"
    ];

    const receivedFields = Object.keys(req.body);
    const invalidFields = receivedFields.some((field) => {
    return !allowedFields.includes(field);
    });

    if (invalidFields) {
    return res.status(400).json({
        message: "Invalid fields provided"
    });
    }

       if(req.body.salary !== undefined && (typeof req.body.salary !== "number" ||
        !Number.isFinite(req.body.salary) ||
        req.body.salary < 0) ){
            return res.status(400).json({
                message:"Salary should be a valid non negative number"
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
        
        const updateData = Object.fromEntries(
            Object.entries(req.body).filter(([key])=>
             allowedFields.includes(key)
            )
        );

        const updated = await Job.findByIdAndUpdate(
            req.params.id,
            updateData,
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