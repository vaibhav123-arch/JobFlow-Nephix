import {Router} from "express";
import {getJobs,createJob,updateJob,deleteJob} from "../controllers/job.controller.js";

const router = Router();

router.get('/', getJobs);
router.put('/:id', updateJob);
router.post('/', createJob);
router.delete('/:id', deleteJob);

export default router;