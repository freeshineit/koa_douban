import * as Router from "koa-router";
import * as Config from "../../config";
import axios from "axios";

const router: any = new Router();

const domainApi = `${Config.DOUBANAPIHOST}/${Config.VERSION}`;

/**
 * @route GET /v2/movie/in_theaters
 * @desc 获取正在热映的电影
 * @access 接口是公开到
 *
 * start : 数据的开始项
 * count：单页条数
 * city：城市
 */
router.get("/in_theaters", async (ctx: any, next: () => Promise<any>) => {
    console.log(ctx.query, `${domainApi}/movie/in_theaters`);
    const theaters = await axios.get(`${domainApi}/movie/in_theaters`, {
        params: ctx.query
    });
    ctx.body = theaters.data;
});

/**
 * @route GET /v2/movie/top250
 * @desc 获取电影Top250
 * @access 接口是公开到
 *
 * start : 数据的开始项
 * count：单页条数
 */
router.get("/top250", async (ctx: any, next: () => Promise<any>) => {
    const theaters = await axios.get(`${domainApi}/movie/top250`, {
        params: ctx.query
    });
    ctx.body = theaters.data;
});

/**
 * @route GET /v2/movie/coming_soon
 * @desc 获取即将上映电影
 * @access 接口是公开到
 *
 * start : 数据的开始项
 * count：单页条数
 */
router.get("/coming_soon", async (ctx: any, next: () => Promise<any>) => {
    const result = await axios.get(`${domainApi}/movie/coming_soon`, {
        params: ctx.query
    });
    ctx.body = result.data;
});

/**
 * @route GET /v2/movie/search?q={text}
 * @desc 电影条目搜索
 * @access 接口是公开到
 *
 * start : 数据的开始项
 * count：单页条数
 * q：要搜索的电影关键字
 * tag：要搜索的电影的标签
 */

// 不能使用
router.get("/search", async (ctx: any, next: () => Promise<any>) => {
    console.log(ctx.query);
    const result = await axios.get(`${domainApi}/movie/search`, {
        params: ctx.query
    });
    ctx.body = result.data;
});

/**
 * @route GET /v2/movie/subject/:id
 * @desc 电影条目信息
 * @access 接口是公开到
 *
 * id : 电影id (例：1764796)
 * apikey
 */
router.get("/subject/:id", async (ctx: any, next: () => Promise<any>) => {
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
        `${domainApi}/movie/subject/${ctx.params.id}`,
        {
            params: ctx.query
        }
    );
    ctx.body = result.data;
});

/**
 * @route GET /v2/movie/subject/:id/reviews
 * @desc 电影条目影评列表
 * @access 接口是公开到
 *
 * id (例：1054395)
 * apikey
 */
router.get(
    "/subject/:id/reviews",
    async (ctx: any, next: () => Promise<any>) => {
        const { id } = ctx.params;
        if (!id) {
            ctx.body = { code: 404, msg: "没有找到" };
            return;
        }
        if (!ctx.query.apikey) {
            ctx.body = { code: 104, msg: "invalid_apikey" };
            return;
        }
        const result = await axios.get(
            `${domainApi}/movie/subject/${id}/reviews`,
            {
                params: ctx.query
            }
        );
        ctx.body = result.data;
    }
);

/**
 * @route GET /v2/movie/subject/:id/comments
 * @desc 电影条目短评列表
 * @access 接口是公开到
 *
 * id (例：1054395)
 * apikey
 */
router.get(
    "/subject/:id/comments",
    async (ctx: any, next: () => Promise<any>) => {
        const { id } = ctx.params;
        if (!id) {
            ctx.body = { code: 404, msg: "没有找到" };
            return;
        }
        if (!ctx.query.apikey) {
            ctx.body = { code: 104, msg: "invalid_apikey" };
            return;
        }
        const result = await axios.get(
            `${domainApi}/movie/subject/${id}/comments`,
            {
                params: ctx.query
            }
        );
        ctx.body = result.data;
    }
);

/**
 * @route GET /v2/movie/weekly
 * @desc 电影本周口碑榜
 * @access 接口是公开到
 *
 * apikey
 */
router.get("/weekly", async (ctx: any, next: () => Promise<any>) => {
    if (!ctx.query.apikey) {
        ctx.body = { code: 104, msg: "invalid_apikey" };
        return;
    }
    const result = await axios.get(`${domainApi}/movie/weekly`, {
        params: ctx.query
    });
    ctx.body = result.data;
});

/**
 * @route GET /v2/movie/us_box
 * @desc 北美票房榜
 * @access 接口是公开到
 *
 * apikey
 */
router.get("/us_box", async (ctx: any, next: () => Promise<any>) => {
    if (!ctx.query.apikey) {
        ctx.body = { code: 104, msg: "invalid_apikey" };
        return;
    }
    const result = await axios.get(`${domainApi}/movie/us_box`, {
        params: ctx.query
    });
    ctx.body = result.data;
});

/**
 * @route GET /v2/movie/us_box
 * @desc 新片榜
 * @access 接口是公开到
 *
 * apikey
 */
router.get("/new_movies", async (ctx: any, next: () => Promise<any>) => {
    if (!ctx.query.apikey) {
        ctx.body = { code: 104, msg: "invalid_apikey" };
        return;
    }
    const result = await axios.get(`${domainApi}/movie/new_movies`, {
        params: ctx.query
    });
    ctx.body = result.data;
});

/**
 * @route GET /v2/movie/celebrity/:id
 * @desc 影人条目信息
 * @access 接口是公开到
 *
 * id: celebrity id (例：1054395)
 * apikey
 */
router.get("/celebrity/:id", async (ctx: any, next: () => Promise<any>) => {
    const { id } = ctx.params;
    if (!id) {
        ctx.body = { code: 404, msg: "没有找到" };
        return;
    }

    if (!ctx.query.apikey) {
        ctx.body = { code: 104, msg: "invalid_apikey" };
        return;
    }

    const result = await axios.get(`${domainApi}/movie/celebrity/${id}`, {
        params: ctx.query
    });
    ctx.body = result.data;
});

/**
 * @route GET /v2/movie/celebrity/:id/works
 * @desc 影人作品
 * @access 接口是公开到
 *
 * id: celebrity id (例：1054395)
 * apikey
 */
router.get(
    "/celebrity/:id/works",
    async (ctx: any, next: () => Promise<any>) => {
        const { id } = ctx.params;
        if (!id) {
            ctx.body = { code: 404, msg: "没有找到" };
            return;
        }

        if (!ctx.query.apikey) {
            ctx.body = { code: 104, msg: "invalid_apikey" };
            return;
        }

        const result = await axios.get(
            `${domainApi}/movie/celebrity/${id}/works`,
            {
                params: ctx.query
            }
        );
        ctx.body = result.data;
    }
);

/**
 * @route GET /v2/movie/celebrity/:id/photos
 * @desc 影人剧照 （影人条目信息）
 * @access 接口是公开到
 *
 * id: celebrity id （例：1054395）
 * apikey
 */
router.get(
    "/celebrity/:id/photos",
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
            `${domainApi}/movie/celebrity/${ctx.params.id}/photos`,
            {
                params: ctx.query
            }
        );
        ctx.body = result.data;
    }
);

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
