const express = require("express");
const authMiddleware = require("../Helper/middleware");
const zeenPrefillController = require("../Controller/zeenPrefillController");
const route = express.Router();

route.use(authMiddleware);
route.get(
  "/getZeenPrefillData/:ipAddressVal",
  zeenPrefillController.getZeenPrefillData
);
route.post("/addZeenPrefillData", zeenPrefillController.addZeenPrefillData);
route.delete(
  "/deleteZeenPrefillData/:ipAddressVal",
  zeenPrefillController.deleteZeenPrefillData
);

module.exports = route;
