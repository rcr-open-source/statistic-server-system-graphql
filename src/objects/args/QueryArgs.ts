import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class QueryArgs {


    @Field(() => String, {
        nullable: false,
    })
    query: string;

    @Field(() => String, {
        nullable: false,
    })
    systemId: string;

}
