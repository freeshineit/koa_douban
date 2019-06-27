import * as Koa from "koa";
import * as Router from "koa-router";
import * as views from "koa-views";
import * as Static from "koa-static";
import * as bodyParser from "koa-bodyparser";
import * as path from "path";
import { MovieApi, MusicApi, BookApi } from "./router";

const app: any = new Koa();
const router: Router = new Router();

app.use(
    bodyParser({
        strict: true
    })
);

app.use(
    views(path.join(__dirname, `../views`), {
        extension: "pug"
    })
);

app.use(Static(path.join(__dirname, `../public`)));

// api
router.use("/v2/movie", MovieApi);
router.use("/v2/music", MusicApi);
router.use("/v2/book", BookApi);

app.use(router.routes()).use(router.allowedMethods());

export default app;
