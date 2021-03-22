import {
    Field, ObjectType, ID, Ctx, Arg, Args, UseMiddleware,
} from "type-graphql";
import { SystemAttributesType } from "@umk-stat/statistic-server-database";
import {
    QueryInterval, ResultType, ResultTypeInterval,
} from ".";

import { tableLogsDataLoaderInit } from "../../middleware/tableLogsDataLoaderInit";
import { countTableLogsDataLoaderInit } from "../../middleware/countTableLogsDataLoaderInit";
import { resultTypeReportLoaderInit } from "../../middleware/resultTypeReportLoaderInit";
import { resultTypeIntervalLoaderInit } from "../../middleware/resultTypeIntervalLoaderInit";
import { queryLoaderInit } from "../../middleware/queryLoaderInit";
import { queryIntervalLoaderInit } from "../../middleware/queryIntervalLoaderInit";
import { targetsDataLoaderInit } from "../../middleware/targetsDataLoaderInit";
import { BackendLogConnection, Datepart, PeriodArgs, QueryReportType } from "@umk-stat/statistic-server-graphql-logs-graphql";
import { ConnectionArgsOrder, Context, getHashArgs, Node } from "@umk-stat/statistic-server-core";
import { Target } from "@umk-stat/statistic-server-client-graphql";


@ObjectType({
    simpleResolvers: true,
    implements: Node,
})
export class System implements Node {

    public static builderFromDb(object: SystemAttributesType): System {

        const system = new System();
        system.id = object.id;
        system.name = object.name;
        system.description = object.description;
        return system;

    }

    public id: string;

    @Field(() => String, {
        nullable: false,
    })
    public name: string;

    @Field(() => String, {
        nullable: false,
    })
    public description?: string | null;

    @UseMiddleware(tableLogsDataLoaderInit)
    @UseMiddleware(countTableLogsDataLoaderInit)
    @Field(() => BackendLogConnection, {
        nullable: false,
    })
    public async tableLogs(

        @Ctx()
        context: Context,

        @Args(() => ConnectionArgsOrder)
        args: ConnectionArgsOrder,

        @Arg("orderField", {
            nullable: false,
        })
        orderField: string,

    ): Promise<BackendLogConnection> {

        args.orderField = orderField;
        const { id } = this;
        const edgeType = "tableLogsDataLoader";
        const countType = "countTableLogsDataLoader";
        const hash = getHashArgs(args);
        const edges = await context.dataLoadersMap.get(edgeType)?.get(hash)?.load(id);
        const totalCount = await context.dataLoadersMap.get(countType)?.get(hash)?.load(id);

        const connection = new BackendLogConnection(edges, totalCount, args);
        return connection;

    }

    @UseMiddleware(resultTypeReportLoaderInit)
    @Field(() => [ResultType], {
        nullable: false,
    })
    public async resultTypeReport(

        @Ctx()
        context: Context,

        @Args(() => PeriodArgs)
        args: PeriodArgs,

    ): Promise<ResultType[]> {

        const { id } = this;
        const countType = "resultTypeReportLoader";
        const hash = getHashArgs(args);
        const result = await context.dataLoadersMap.get(countType)?.get(hash)?.load(id);
        return result;

    }

    @UseMiddleware(resultTypeIntervalLoaderInit)
    @Field(() => [ResultTypeInterval], {
        nullable: false,
    })
    public async resultTypeIntervalReport(

        @Ctx()
        context: Context,

        @Args(() => PeriodArgs)
        _args: PeriodArgs,

        @Arg("interval", () => Datepart, {
            nullable: false,
        })
        _interval: Datepart,

    ): Promise<ResultTypeInterval[]> {

        const { id } = this;
        const countType = "resultTypeIntervalLoader";
        const args = { ..._args, interval: _interval };
        const hash = getHashArgs(args);
        const result = await context.dataLoadersMap.get(countType)?.get(hash)?.load(id);
        return result;

    }

    @UseMiddleware(queryLoaderInit)
    @Field(() => [QueryReportType], {
        nullable: false,
    })
    public async queriesReport(

        @Ctx()
        context: Context,

        @Args(() => PeriodArgs)
        _args: PeriodArgs,

    ): Promise<QueryReportType[]> {

        const { id } = this;
        const countType = "queryLoader";
        const args = { ..._args };
        const hash = getHashArgs(args);
        const result = await context.dataLoadersMap.get(countType)?.get(hash)?.load(id);
        return result;

    }


    @UseMiddleware(queryIntervalLoaderInit)
    @Field(() => [QueryInterval], {
        nullable: false,
    })
    public async queryIntervalReport(

        @Ctx()
        context: Context,

        @Args(() => PeriodArgs)
        _args: PeriodArgs,

        @Arg("interval", () => Datepart, {
            nullable: false,
        })
        _interval: Datepart,

    ): Promise<QueryInterval[]> {

        const { id } = this;
        const countType = "queryIntervalLoader";
        const args = { ..._args, interval: _interval };
        const hash = getHashArgs(args);
        const result = await context.dataLoadersMap.get(countType)?.get(hash)?.load(id);
        return result;

    }

    @UseMiddleware(targetsDataLoaderInit)
    @Field(() => [Target], {
        nullable: false,
    })
    public async targets(

        @Ctx()
        context: Context,

    ): Promise<Target[]> {

        const { id } = this;
        const edgeType = "targetsDataLoader";
        const hash = getHashArgs([]);
        const targets = await context.dataLoadersMap.get(edgeType)?.get(hash)?.load(id);

        return targets;

    }

}

