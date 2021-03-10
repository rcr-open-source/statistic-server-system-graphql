import { MiddlewareFn } from "type-graphql";
import DataLoader from "dataloader";
import { PeriodArgs } from "../objects/args";
import { QueryReportType, QueryInterval } from "../objects/types";
import { Context, setLoaderToContext } from "@umk-stat/statistic-server-core";
import { Datepart } from "@umk-stat/statistic-server-database";

export const queryIntervalLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next,
) => {
    const middlewareType = "queryIntervalLoader";
    const { begin, end, interval } = args as PeriodArgs & {
        interval: Datepart,
    };


    const batchFn: DataLoader.BatchLoadFn<string, QueryInterval[]> = async (keys: string[]): Promise<QueryInterval[][]> => {

        const queriesDb = await context.databaseApi.queries.findQueryAverageByIntervalsFromPeriod(keys, begin, end ?? new Date(), interval);
        const ans = keys.map<QueryInterval[]>((key) => {

            const queryMap = queriesDb
                .filter((value) => value.id === key)
                .reduce((prev, val) => {

                    const dateStr = val.fromDate.toString();
                    let arr = prev.get(dateStr);
                    if (typeof arr === "undefined") {

                        arr = [];

                    }
                    arr.push({
                        average: val.averageQuery,
                        count: val.countQuery,
                        query: val.query,
                    });
                    prev.set(dateStr, arr);
                    return prev;

                }, new Map<string, QueryReportType[]>());
            const answer = Array.from(queryMap.entries());
            const sortedAnswer = answer.sort((a, b) => new Date(a[0]) < new Date(b[0]) ? 1 : -1);
            return sortedAnswer.map<QueryInterval>((val) => ({
                fromDate: new Date(val[0]),
                queries: val[1],
            }));


        });
        return ans;

    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    const nextResult = next();
    return nextResult;

};
