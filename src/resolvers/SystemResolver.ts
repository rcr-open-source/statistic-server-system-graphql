import { Context } from "@umk-stat/statistic-server-core";
import "reflect-metadata";
import {
    Resolver, Query, Arg, Ctx, Mutation,
} from "type-graphql";
import { System } from "../objects/types";
import { systemQuery } from "../query/system/systemQuery";

@Resolver()
export class SystemResolver {

    @Query(() => System, {
        nullable: true,
    })
    public async system(
        @Ctx()
        context: Context,

        @Arg("id", {
            nullable: false,
        })
        id: string,
    ): Promise<System | null> {

        return await systemQuery(context, id)

    }

    @Query(() => [System], {
        nullable: false,
    })
    public async systems(
        @Ctx()
        context: Context,
    ): Promise<System[]> {

        const systemsDb = await context.databaseApi.queries.findSystems();
        const systems = systemsDb.map((systemDb) => System.builderFromDb(systemDb.get()));
        return systems;

    }

    @Mutation(() => System, {
        nullable: false,
    })
    public async createSystem(
        @Ctx()
        context: Context,
        @Arg("name", {
            nullable: false,
        })
        name: string,
        @Arg("description", {
            nullable: true,
        })
        description?: string,
    ): Promise<System> {

        const systemDb = await context.databaseApi.queries.createSystem({
            name,
            description,
        });
        const system = System.builderFromDb(systemDb.get());
        return system;

    }

}
