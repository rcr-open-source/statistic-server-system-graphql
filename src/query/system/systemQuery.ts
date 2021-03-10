import { Context } from "@umk-stat/statistic-server-core";
import { System } from "../../objects/types";

export async function systemQuery(
    context: Context,
    id: string,
): Promise<System | null> {

    const systemDb = await context.databaseApi.queries.findSystem(id);
    const system = systemDb === null ? null : System.builderFromDb(systemDb.get());
    return system;

}
