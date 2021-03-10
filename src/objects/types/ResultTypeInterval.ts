import { ObjectType, Field } from "type-graphql";
import { ResultType } from ".";

@ObjectType()
export class ResultTypeInterval {

    @Field(() => Date, {
        nullable: false,
    })
    date: Date;

    @Field(() => [ResultType], {
        nullable: false,
    })
    resultTypes: ResultType[];

}
