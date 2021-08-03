import { join, dirname } from "path";
import { fileURLToPath } from "url";

import "dotenv/config";

import AutoLoad from "fastify-autoload";
import Bree from "bree";
import Graceful from "@ladjs/graceful";

import jobs from "./jobs/index.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @param {import("fastify").FastifyInstance} fastify
 */
export default async function (fastify, opts) {
  fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });

  if (jobs.length > 0) {
    const bree = new Bree({
      logger: fastify.log,
      defaultExtension: "mjs", // i'm a unicorn,
      jobs: jobs,
    });
    const graceful = new Graceful({ brees: [bree] });
    graceful.listen();
    bree.start();
  }
}
