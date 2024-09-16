import { NextFunction, Request, Response } from "express"


type AsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

const asyncHandler= (reqHandler: AsyncRequestHandler) => {

    return (req: Request, res: Response, next: NextFunction)=> {
        Promise
            .resolve(reqHandler(req, res, next))
            .catch((err) => next(err))
    }
}

export {asyncHandler};
