import { ObjectType, Field } from "type-graphql";
import { StatisticType } from ".";

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
