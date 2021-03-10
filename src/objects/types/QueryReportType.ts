import {
    Field, Int, ObjectType, Float,
} from "type-graphql";
import { AbstractStatistic } from "@umk-stat/statistic-server-graphql-logs-graphql";

@ObjectType({
    implements: AbstractStatistic,
})
export class QueryReportType implements AbstractStatistic {

    @Field(() => String, {
        nullable: false,
        simple: true,
    })
    public query: string;

    public count: number;

    public average: number;

}
