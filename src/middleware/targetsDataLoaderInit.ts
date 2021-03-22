import {MiddlewareFn} from "type-graphql";
import DataLoader from "dataloader";
import {Context} from "@umk-stat/statistic-server-core";
import {setLoaderToContext} from "@umk-stat/statistic-server-core";
import { Target, findTargetsBySystemId } from "@umk-stat/statistic-server-client-graphql";

export const targetsDataLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "targetsDataLoader";

    const batchFn: (ids: string[]) => Promise<Target[][]> =  async (ids: string[])
        : Promise<Target[][]> => {
        const targets = await Promise.all(ids.map(id => findTargetsBySystemId(context, id)));
        return targets;
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
