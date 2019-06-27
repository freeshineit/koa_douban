import * as Router from "koa-router";
import axios from "axios";

const router: any = new Router();

/**
 * @route GET /api/user
 * @desc 首页
 * @access 接口是公开到
 */
router.get("/", async (ctx: any, next: () => Promise<any>) => {
    // await axios
    //     .get("https://douban.uieee.com/v2/movie/in_theaters")
    //     .then(res => {
    //     });
    await ctx.render("index", {
        title: "index",
        content: "Hello World!"
    });
});

export default router.routes();
