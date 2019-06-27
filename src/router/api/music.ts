import * as Router from "koa-router";
import * as Config from "../../config";
import axios from "axios";

const router: any = new Router();

const domainApi = `${Config.DOUBANAPIHOST}/${Config.VERSION}`;

/**
 * @route GET /v2/movie/us_box
 * @desc 电影条目剧照
 * @access 接口是公开到
 *
 * id: movie id
 * apikey
 */
router.get(
    "/subject/:id/photos",
    async (ctx: any, next: () => Promise<any>) => {
        console.log(ctx.params.id);
        if (!ctx.params.id) {
            ctx.body = { code: 404, msg: "没有找到" };
            return;
        }

        if (!ctx.query.apikey) {
            ctx.body = { code: 104, msg: "invalid_apikey" };
            return;
        }
        const result = await axios.get(
            `${domainApi}/movie/subject/${ctx.params.id}/photos`,
            {
                params: ctx.query
            }
        );
        ctx.body = result.data;
    }
);

export default router.routes();
