import { ObjectType, Field } from "type-graphql";
import { StatisticType } from "@umk-stat/statistic-server-graphql-logs-graphql";

@ObjectType()
export class QueryStatisticType {

    @Field({
        nullable: false,
    })
    query: string;

    @Field(() => [StatisticType], {
        nullable: false,
    })
    statistics: StatisticType[];

}
