import {
    ObjectType, Field, Int, 
} from "type-graphql";

@ObjectType()
export class ResultType {

    @Field(() => String, {
        nullable: false,
    })
    public name: string;

    @Field(() => Int, {
        nullable: false,
    })
    public count: number;

}
