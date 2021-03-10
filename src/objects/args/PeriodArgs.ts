import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class PeriodArgs {


    @Field(() => Date, {
        nullable: false,

    })
    begin: Date;

    @Field(()=> Date, {
        nullable: true,
        defaultValue: null,
    })
    end: Date | null = null;

}
