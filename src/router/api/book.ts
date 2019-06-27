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

// scope: book_basic_w
/**
 * @route POST /v2/book/:id/collection
 * @desc 用户收藏某本图书
 * @access 接口是公开到
 *
 */
router.post("/:id/collection", async (ctx: any, next: () => Promise<any>) => {
    const { id } = ctx.params;

    if (!id) {
        ctx.body = { code: 404, msg: "id 字段必传" };
        return;
    }

    const result = await axios.post(`${domainApi}/${id}/collection`, {
        ...ctx.request.body
    });
    ctx.body = result.data;
});

/**
 * @route PUT /v2/book/:id/collection
 * @desc 用户修改对某本图书的收藏
 * @access 接口是公开到
 *
 */
router.put("/:id/collection", async (ctx: any, next: () => Promise<any>) => {
    const { id } = ctx.params;

    if (!id) {
        ctx.body = { code: 404, msg: "id 字段必传" };
        return;
    }

    const result = await axios.put(`${domainApi}/${id}/collection`, {
        ...ctx.request.body
    });
    ctx.body = result.data;
});

/**
 * @route DELETE /v2/book/:id/collection
 * @desc 用户删除对某本图书的收藏
 * @access 接口是公开到
 *
 */
router.delete("/:id/collection", async (ctx: any, next: () => Promise<any>) => {
    const { id } = ctx.params;
    if (!id) {
        ctx.body = { code: 404, msg: "id 字段必传" };
        return;
    }

    const result = await axios.delete(`${domainApi}/${id}/collection`, {
        ...ctx.request.body
    });
    ctx.body = result.data;
});

/**
 * @route POST /v2/book/:id/annotations
 * @desc 用户给某本图书写笔记
 * @access 接口是公开到
 *
 */
router.post("/:id/annotations", async (ctx: any, next: () => Promise<any>) => {
    const { id } = ctx.params;
    if (!id) {
        ctx.body = { code: 404, msg: "id 字段必传" };
        return;
    }

    const result = await axios.post(`${domainApi}/${id}/annotations`, {
        ...ctx.request.body
    });
    ctx.body = result.data;
});

/**
 * @route PUT /v2/book/annotation/:id
 * @desc 用户修改某篇笔记
 * @access 接口是公开到
 *
 */
router.put("/annotation/:id", async (ctx: any, next: () => Promise<any>) => {
    const { id } = ctx.params;
    if (!id) {
        ctx.body = { code: 404, msg: "id 字段必传" };
        return;
    }

    const result = await axios.put(`${domainApi}/annotation/${id}`, {
        ...ctx.request.body
    });
    ctx.body = result.data;
});

/**
 * @route DELETE /v2/book/annotation/:id
 * @desc 用户删除某篇笔记
 * @access 接口是公开到
 *
 */
router.delete("/annotation/:id", async (ctx: any, next: () => Promise<any>) => {
    const { id } = ctx.params;
    if (!id) {
        ctx.body = { code: 404, msg: "id 字段必传" };
        return;
    }

    const result = await axios.delete(`${domainApi}/annotation/${id}`, {
        ...ctx.request.body
    });
    ctx.body = result.data;
});

// scope: douban_basic_common

/**
 * @route POST /v2/book/reviews
 * @desc 发表新评论
 * @access 接口是公开到
 *
 * book: 评论所针对的 book id	必传
 * title: 评论头               必传
 * content: 评论内容           必传，且多于 150 字
 * rating: 打分                非必传，数字 1 ～ 5 为合法值，其他信息默认为不打分
 *
 */
router.post("/reviews", async (ctx: any, next: () => Promise<any>) => {
    console.log(ctx.query, ctx.request.body);

    const result = await axios.post(`${domainApi}/reviews`, {
        ...ctx.request.body
    });

    ctx.body = result.data;
});

/**
 * @route PUT /v2/book/review/:id
 * @desc 修改评论
 * @access 接口是公开到
 *
 * title: 评论头               必传
 * content: 评论内容           必传，且多于 150 字
 * rating: 打分                非必传，数字 1 ～ 5 为合法值，其他信息默认为不打分
 *
 */
router.put("/review/:id", async (ctx: any, next: () => Promise<any>) => {
    const { id } = ctx.params;
    if (!id) {
        ctx.body = { code: 404, msg: "id 字段必传" };
        return;
    }

    const result = await axios.put(`${domainApi}/review/${id}`, {
        ...ctx.request.body
    });
    ctx.body = result.data;
});

/**
 * @route DELETE /v2/book/review/:id
 * @desc 删除评论
 * @access 接口是公开到
 *
 */
router.delete("/review/:id", async (ctx: any, next: () => Promise<any>) => {
    const { id } = ctx.params;
    if (!id) {
        ctx.body = { code: 404, msg: "id 字段必传" };
        return;
    }

    const result = await axios.delete(`${domainApi}/review/${id}`, {
        ...ctx.request.body
    });

    ctx.body = result.data;
});

// /**
//  * @route GET /v2/book/user_tags/:id
//  * @desc 获取用户对图书的所有标签(deprecated)
//  * @access 接口是公开到
//  *
//  */
// router.get("/user_tags/:id", async (ctx: any, next: () => Promise<any>) => {
//     const { id } = ctx.params;
//     if (!id) {
//         ctx.body = { code: 404, msg: "id 字段必传" };
//         return;
//     }

//     const result = await axios.get(`${domainApi}/user_tags/${id}`, {
//         ...ctx.request.body
//     });
//     ctx.body = result.data;
// });

export default router.routes();
