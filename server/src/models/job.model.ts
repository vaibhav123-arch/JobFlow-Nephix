import mongoose from "mongoose";

interface IJob {
    title:string;
    company:string;
    description:string;
    location:string;
    salary?:number;
    isRemote?:boolean;
}

const jobSchema = new mongoose.Schema<IJob>({
    title:{
        type: String,
        required:true
    },
    company:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    location:{
        type: String,
        required:true

    },
    salary:{
        type: Number
    },
    isRemote:{
        type: Boolean
    }
});

const Job= mongoose.model<IJob>("Job",jobSchema);

export default Job;