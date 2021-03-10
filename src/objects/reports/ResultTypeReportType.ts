import { ObjectType, Field } from "type-graphql";
import { ResultTypeReportDbType } from "@umk-stat/statistic-server-database/dist/types/ResultTypeReportDbType";

@ObjectType({
    simpleResolvers: true,
})
export class ResultTypeReportType {

    public static builderFromDb(
        object: ResultTypeReportDbType,
    ): ResultTypeReportType {

        return {
            count: object.countResultType,
            resultType: object.resultType, 
        };
    
    }

    @Field({
        simple: true,
        nullable: false,
    })
    resultType: string;

    @Field({
        simple: true,
        nullable: false,
    })
    count: number;

}
