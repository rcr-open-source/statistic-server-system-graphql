import { ObjectType, Field } from "type-graphql";
import { QueryReportType } from "@umk-stat/statistic-server-graphql-logs-graphql";

@ObjectType()
export class QueryInterval {

    @Field(() => Date, {
        nullable: false,
    })
    fromDate: Date;

    @Field(() => [QueryReportType], {
        nullable: false,
    })
    queries: QueryReportType[];

}
