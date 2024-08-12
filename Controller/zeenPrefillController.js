const sendResponse = require("../Helper/Helper");
const zeenPrefillModel = require("../models/zeenPrefillModel");

const zeenPrefillController = {
  addZeenPrefillData: async (req, res) => {
    try {
      const {
        custom_firstName,
        custom_lastname,
        custom_email,
        custom_phone,
        custom_country,
        custom_city,
        ipAddress,
      } = req.body;
      console.log(
        "backend recieved data->>>>>>>>>>>>",
        custom_firstName,
        custom_lastname,
        custom_email,
        custom_phone,
        custom_country,
        custom_city,
        ipAddress
      );
      let errArr = [];

      //validation Part
      if (!custom_firstName) {
        errArr.push("Required FirstName");
      }
      if (!custom_lastname) {
        errArr.push("Required duration");
      }
      if (!custom_email) {
        errArr.push("Required fees");
      }
      if (!custom_phone) {
        errArr.push("Required shortName");
      }
      if (!custom_country) {
        errArr.push("Required shortName");
      }
      if (!custom_city) {
        errArr.push("Required shortName");
      }
      if (!ipAddress) {
        errArr.push("Required shortName");
      }

      if (errArr.length > 0) {
        res
          .send(sendResponse(false, errArr, null, "Required Fields"))
          .status(400);
        return;
      } else {
        const newData = new zeenPrefillModel({
          custom_firstName,
          custom_lastname,
          custom_email,
          custom_phone,
          custom_country,
          custom_city,
          ipAddress,
        });
        await newData.save();
        res
          .send(sendResponse(true, newData, "Data Added Successfully"))
          .status(200);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(sendResponse(false, null, "Server Internal Error"));
    }
  },
  getZeenPrefillData: async (req, res) => {
    try {
      let ipAddressVal = req.params.ipAddressVal;
      let result = await zeenPrefillModel.find({ ipAddress: ipAddressVal });
      console.log("result", result);
      if (!result) {
        res.send(sendResponse(false, null, "No Data Found")).status(404);
      } else {
        res.send(sendResponse(true, result, "Data Found")).status(200);
      }
    } catch (error) {
      console.log(e);
      res.send(sendResponse(false, null, "Server Internal Error")).status(400);
    }
  },
  deleteZeenPrefillData: async (req, res) => {
    try {
      let ipAddressVal = req.params.ipAddressVal;

      // Find and delete the document by ipAddress
      let deleteByIpAddress = await zeenPrefillModel.findOneAndDelete({
        ipAddress: ipAddressVal,
      });

      if (!deleteByIpAddress) {
        res
          .status(404)
          .send(sendResponse(false, null, "No Data Found for this IP Address"));
      } else {
        res
          .status(200)
          .send(
            sendResponse(true, deleteByIpAddress, "Data Deleted Successfully")
          );
      }
    } catch (error) {
      res.status(500).send(sendResponse(false, null, "Internal Server Error"));
    }
  },
};
module.exports = zeenPrefillController;
