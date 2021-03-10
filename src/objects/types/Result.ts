import {
    Field, Int, ObjectType, Ctx, UseMiddleware, 
} from "type-graphql";

@ObjectType()
export class Result {

    @Field(() => String, {
        nullable: false,
        simple: true,
    })
    public result: string;

    @Field(() => Int, {
        nullable: false,
        simple: true,
    })
    public count: number;

}
