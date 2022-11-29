import "reflect-metadata"
import createError from 'http-errors'
import express, {NextFunction, Request, Response} from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

export const app = express();

process.on('unhandledRejection', (reason, p) => {
    console.log(reason, p)
})

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors({
    origin: [ 'http://localhost: 3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
//
// app.use(function (req: Request, res: Response, next: NextFunction) {
//     next(createError(404));
// });


// todo type for err
app.use(function (err: any, req: Request, res: Response) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});