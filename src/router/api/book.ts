import * as Router from "koa-router";
import * as Config from "../../config";
import axios from "axios";

const router: any = new Router();

const domainApi = `${Config.DOUBANAPIHOST}/${Config.VERSION}/book`;

// count 最大为 100，大于 100 的 count 会被置为 100。

// https://douban-api-docs.zce.me/book.html

/**
 * @route GET /v2/book/:id
 * @desc 获取图书信息
 * @access 接口是公开到
 *
 * id: book id
 */
router.get("/:id", async (ctx: any, next: () => Promise<any>) => {
    console.log(ctx.params.id);
    if (!ctx.params.id) {
        ctx.body = { code: 404, msg: "没有找到" };
        return;
    }

    const result = await axios.get(`${domainApi}/${ctx.params.id}`, {
        params: ctx.query
    });
    ctx.body = result.data;
});

/**
 * @route GET /v2/book/isbn/:name
 * @desc 根据 isbn 获取图书信息
 * @access 接口是公开到
 *
 * name: book name
 */
router.get("/isbn/:name", async (ctx: any, next: () => Promise<any>) => {
    console.log(ctx.params.name);

    if (!ctx.params.name) {
        ctx.body = { code: 404, msg: "没有找到" };
        return;
    }

    const result = await axios.get(`${domainApi}/isbn/${ctx.params.name}`, {
        params: ctx.query
    });
    ctx.body = result.data;
});

/**
 * @route GET /v2/book/search
 * @desc 搜索图书
 * @access 接口是公开到
 *
 * q: 查询关键字
 * tag: 查询的 tag
 * start: 取结果的 offset
 * count: 取结果的条数
 * q 和 tag 必传其一
 *
 */
router.get("/search", async (ctx: any, next: () => Promise<any>) => {
    console.log(ctx.params.name);

    if (!ctx.params.name) {
        ctx.body = { code: 404, msg: "没有找到" };
        return;
    }

    const result = await axios.get(`${domainApi}/search`, {
        params: ctx.query
    });
    ctx.body = result.data;
});

/**
 * @route GET /v2/book/:id/tags
 * @desc 某个图书中标记最多的标签
 * @access 接口是公开到
 *
 */
router.get("/:id/tags", async (ctx: any, next: () => Promise<any>) => {
    if (!ctx.params.id) {
        ctx.body = { code: 404, msg: "没有找到" };
        return;
    }

    const result = await axios.get(`${domainApi}/${ctx.params.id}/tags`, {
        params: ctx.query
    });
    ctx.body = result.data;
});

/**
 * @route GET /v2/book/user/:name/tags
 * @desc 获取用户对图书的所有标签
 * @access 接口是公开到
 *
 */
router.get("/user/:name/tags", async (ctx: any, next: () => Promise<any>) => {
    if (!ctx.params.name) {
        ctx.body = { code: 404, msg: "name 字段必传" };
        return;
    }

    const result = await axios.get(
        `${domainApi}/user/${ctx.params.name}/tags`,
        {
            params: ctx.query
        }
    );
    ctx.body = result.data;
});

/**
 * @route GET /v2/book/user/:name/collections
 * @desc 获取某个用户的所有图书收藏信息
 * @access 接口是公开到
 *
 */
router.get(
    "/user/:name/collections",
    async (ctx: any, next: () => Promise<any>) => {
        if (!ctx.params.name) {
            ctx.body = { code: 404, msg: "name 字段必传" };
            return;
        }

        const result = await axios.get(
            `${domainApi}/user/${ctx.params.name}/collections`,
            {
                params: ctx.query
            }
        );
        ctx.body = result.data;
    }
);

/**
 * @route GET /v2/book/:id/collection
 * @desc 获取用户对某本图书的收藏信息
 * @access 接口是公开到
 *
 */
router.get("/:id/collection", async (ctx: any, next: () => Promise<any>) => {
    if (!ctx.params.id) {
        ctx.body = { code: 404, msg: "id 字段必传" };
        return;
    }

    const result = await axios.get(
        `${domainApi}/${ctx.params.id}/collections`,
        {
            params: ctx.query
        }
    );
    ctx.body = result.data;
});

/**
 * @route GET /v2/book/user/:name/annotations
 * @desc 获取某个用户的所有笔记
 * @access 接口是公开到
 *
 */
router.get(
    "/user/:name/annotations",
    async (ctx: any, next: () => Promise<any>) => {
        if (!ctx.params.name) {
            ctx.body = { code: 404, msg: "name 字段必传" };
            return;
        }

        const result = await axios.get(
            `${domainApi}/user/${ctx.params.name}/annotations`,
            {
                params: ctx.query
            }
        );
        ctx.body = result.data;
    }
);

/**
 * @route GET /v2/book/:id/annotations
 * @desc 获取某本图书的所有笔记
 * @access 接口是公开到
 *
 */
router.get("/:id/annotations", async (ctx: any, next: () => Promise<any>) => {
    if (!ctx.params.id) {
        ctx.body = { code: 404, msg: "id 字段必传" };
        return;
    }

    const result = await axios.get(
        `${domainApi}/${ctx.params.id}/annotations`,
        {
            params: ctx.query
        }
    );
    ctx.body = result.data;
});

/**
 * @route GET /v2/book/annotation/:id
 * @desc 获取某篇笔记的信息
 * @access 接口是公开到
 *
 */
router.get("/annotations/:id", async (ctx: any, next: () => Promise<any>) => {
    if (!ctx.params.id) {
        ctx.body = { code: 404, msg: "id 字段必传" };
        return;
    }

    const result = await axios.get(
        `${domainApi}/annotations/${ctx.params.id}`,
        {
            params: ctx.query
        }
    );
    ctx.body = result.data;
});

/**
 * @route GET /v2/book/series/:id/books
 * @desc 获取丛书书目信息
 * @access 接口是公开到
 *
 */
router.get("/series/:id/books", async (ctx: any, next: () => Promise<any>) => {
    if (!ctx.params.id) {
        ctx.body = { code: 404, msg: "id 字段必传" };
        return;
    }

    const result = await axios.get(
        `${domainApi}/series/${ctx.params.id}/books`,
        {
            params: ctx.query
        }
    );
    ctx.body = result.data;
});

export default router.routes();
