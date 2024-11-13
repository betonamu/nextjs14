import { NextResponse } from "next/server";

const middleware = (req, res, next) => {
    console.log(req.url);
    NextResponse.next();
}

export default middleware;