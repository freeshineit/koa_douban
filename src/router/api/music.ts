import * as Router from "koa-router";
import * as Config from "../../config";
import axios from "axios";

const router: any = new Router();

const domainApi = `${Config.DOUBANAPIHOST}/${Config.VERSION}`;

/**
 * @route GET /v2/music/:id
 * @desc 获取音乐信息
 * @access 接口是公开到
 *
 * id: music id
 * apikey
 */
router.get("/:id", async (ctx: any, next: () => Promise<any>) => {
    const { id } = ctx.params;
    if (!id) {
        ctx.body = { code: 404, msg: "没有找到" };
        return;
    }

    if (!ctx.query.apikey) {
        ctx.body = { code: 104, msg: "invalid_apikey" };
        return;
    }
    const result = await axios.get(`${domainApi}/music/${id}`, {
        params: ctx.query
    });
    ctx.body = result.data;
});

/**
 * @route GET /v2/music/search
 * @desc 搜索音乐
 * @access 接口是公开到
 *
 * q	查询关键字	q 和 tag 必传其一
 * tag	查询的 tag	q 和 tag 必传其一
 * start	取结果的 offset	默认为 0
 * count	取结果的条数
 */
router.get("/search", async (ctx: any, next: () => Promise<any>) => {
    if (!ctx.query.apikey) {
        ctx.body = { code: 104, msg: "invalid_apikey" };
        return;
    }

    const result = await axios.get(`${domainApi}/music/search`, {
        params: ctx.query
    });
    ctx.body = result.data;
});

/**
 * @route GET /v2/music/:id/tags
 * @desc 某个音乐中标记最多的标签
 * @access 接口是公开到
 *
 */
router.get("/:id/tags", async (ctx: any, next: () => Promise<any>) => {
    const { id } = ctx.params;

    if (!id) {
        ctx.body = { code: 404, msg: "没有找到" };
        return;
    }

    if (!ctx.query.apikey) {
        ctx.body = { code: 104, msg: "invalid_apikey" };
        return;
    }

    const result = await axios.get(`${domainApi}/music/${id}/tags`, {
        params: ctx.query
    });
    ctx.body = result.data;
});

/**
 * @route POST /v2/music/reviews
 * @desc 发表新评论
 * @access 接口是公开到
 *
 * music	评论所针对的 music id	必传
 * title	评论头	必传
 * content	评论内容	必传
 * rating	打分
 */
router.post("/reviews", async (ctx: any, next: () => Promise<any>) => {
    // const { id } = ctx.params;
    const { music, title, content } = ctx.request.body;

    if (!music) {
        ctx.body = { code: 404, msg: "music id 必传" };
        return;
    }
    if (title === undefined || title === "") {
        ctx.body = { code: 404, msg: "title 必传" };
        return;
    }

    if (content === undefined || content == "") {
        ctx.body = { code: 404, msg: "content 必传" };
        return;
    }

    if (!ctx.query.apikey) {
        ctx.body = { code: 104, msg: "invalid_apikey" };
        return;
    }

    const result = await axios.post(`${domainApi}/music/reviews`, {
        ...ctx.request.body
    });
    ctx.body = result.data;
});

/**
 * @route PUT /v2/music/reviews/:id
 * @desc 修改评论
 * @access 接口是公开到
 *
 * title	评论头	必传
 * content	评论内容	必传
 * rating	打分
 */
router.put("/reviews/:id", async (ctx: any, next: () => Promise<any>) => {
    const { id } = ctx.params;
    const { title, content } = ctx.request.body;

    if (!id) {
        ctx.body = { code: 404, msg: "id 必传" };
        return;
    }

    if (title === undefined || title === "") {
        ctx.body = { code: 404, msg: "title 必传" };
        return;
    }

    if (content === undefined || content == "") {
        ctx.body = { code: 404, msg: "content 必传" };
        return;
    }

    if (!ctx.query.apikey) {
        ctx.body = { code: 104, msg: "invalid_apikey" };
        return;
    }

    const result = await axios.put(`${domainApi}/music/reviews/${id}`, {
        ...ctx.request.body
    });
    ctx.body = result.data;
});

/**
 * @route DELETE /v2/music/reviews/:id
 * @desc 删除评论
 * @access 接口是公开到
 *
 * title	评论头	必传
 * content	评论内容	必传
 * rating	打分
 */
router.delete("/reviews/:id", async (ctx: any, next: () => Promise<any>) => {
    const { id } = ctx.params;

    if (!id) {
        ctx.body = { code: 404, msg: "id 必传" };
        return;
    }
    if (!ctx.query.apikey) {
        ctx.body = { code: 104, msg: "invalid_apikey" };
        return;
    }

    const result = await axios.delete(`${domainApi}/music/reviews/${id}`, {
        ...ctx.request.body
    });
    ctx.body = result.data;
});

/**
 * @route GET /v2/music/user_tags/:id
 * @desc 用户对音乐的所有标签
 * @access 接口是公开到
 *
 */
router.get("/user_tags/:id", async (ctx: any, next: () => Promise<any>) => {
    const { id } = ctx.params;

    if (!id) {
        ctx.body = { code: 404, msg: "id 必传" };
        return;
    }
    if (!ctx.query.apikey) {
        ctx.body = { code: 104, msg: "invalid_apikey" };
        return;
    }

    const result = await axios.get(`${domainApi}/music/user_tags/${id}`, {
        ...ctx.request.body
    });
    ctx.body = result.data;
});

export default router.routes();
