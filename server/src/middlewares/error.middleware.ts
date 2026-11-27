import type {ErrorRequestHandler} from "express";

const errorMiddleware : ErrorRequestHandler = (
    err,req,res,next
)=>{
      console.error(err);

    return res.status(500).json({
        message: "Internal server error"
});
}

export default errorMiddleware;