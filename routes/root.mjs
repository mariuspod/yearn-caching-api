/**
 * @param {import("fastify").FastifyInstance} api
 */
export default async function (api) {
  api.get("/", async () => {
    return { message: "Welcome to the yearn.finance API." };
  });
}
