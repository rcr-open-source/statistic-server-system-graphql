import { AbstractPeriod, AbstractStatistic } from "@umk-stat/statistic-server-graphql-logs-graphql";
import {
    ObjectType, Field, Int,
} from "type-graphql";

@ObjectType({
    implements: [AbstractPeriod, AbstractStatistic],
})
export class StatisticType implements AbstractPeriod, AbstractStatistic {


    public fromDate: Date;

    public toDate: Date;

    public average: number;

    public count: number;

    public deviation?: number;

    public maxValue?: number;

}
