import express from "express";
import { IncomingHttpHeaders } from "http";
import { randomUUID } from "crypto";
import sessionToken from "./sessionToken";
import enrollment3d from "./enrollment3d";
import dbEnroll from "./dbEnroll";
import dbSearch from "./dbSearch";

const { FACETEC_DEVICE_KEY } = process.env;
const thisIsMySecret =
  "https://news.coincu.com/wp-content/uploads/2022/03/image-114.png";
let hardcodedDatabaseRefID: string;
let groupNamePostfix: string;

const getHeaders = (headers: IncomingHttpHeaders) => {
  return {
    "Content-Type": "application/json",
    "X-Device-Key": String(FACETEC_DEVICE_KEY),
    "User-Agent": String(headers["user-agent"]),
  };
};

const router = express.Router();

router.get("/session-token", async (req, res) => {
  try {
    res.send(await sessionToken(String(req.headers["user-agent"])));
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/initialization", async (req, res) => {
  hardcodedDatabaseRefID = randomUUID();
  groupNamePostfix = randomUUID();

  try {
    const enrollment3dData = await enrollment3d(
      req.body,
      hardcodedDatabaseRefID,
      getHeaders(req.headers)
    );

    if (!enrollment3dData.success) {
      const { scanResultBlob, success, wasProcessed } = enrollment3dData;
      res.send({ scanResultBlob, success, wasProcessed });
      return;
    }

    const dbEnrollData = await dbEnroll(
      hardcodedDatabaseRefID,
      groupNamePostfix,
      getHeaders(req.headers)
    );

    if (!dbEnrollData.success) {
      res.sendStatus(400);
    }

    const { scanResultBlob, success, wasProcessed } = enrollment3dData;
    res.send({ scanResultBlob, success, wasProcessed });
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/authorization", async (req, res) => {
  const externalDatabaseRefID = randomUUID();

  try {
    const enrollment3dData = await enrollment3d(
      req.body,
      externalDatabaseRefID,
      getHeaders(req.headers)
    );

    if (!enrollment3dData.success) {
      const { scanResultBlob, success, wasProcessed } = enrollment3dData;
      res.send({ scanResultBlob, success, wasProcessed });
      return;
    }

    const dbSearchData = await dbSearch(
      externalDatabaseRefID,
      groupNamePostfix,
      getHeaders(req.headers)
    );

    if (!dbSearchData.results.length) {
      res.sendStatus(403);
      return;
    }

    if (
      dbSearchData.results.findIndex(
        (one) => one.identifier === hardcodedDatabaseRefID
      ) === -1
    ) {
      res.sendStatus(403);
      return;
    }

    const { scanResultBlob, success, wasProcessed } = enrollment3dData;
    res.send({
      scanResultBlob,
      success,
      wasProcessed,
      thisIsMySecret,
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

export default router;
