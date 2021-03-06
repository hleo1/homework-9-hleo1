"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var express = require("express");

var _require = require("../util/middleware"),
    checkToken = _require.checkToken;

var OrderDao = require("../data/OrderDao");

var ApiError = require("../model/ApiError");

var _require2 = require("../model/Product"),
    create = _require2.create;

var router = express.Router();
var orders = new OrderDao();
router.get("/api/orders", checkToken, function _callee(req, res, next) {
  var _req$query, customer, status, data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$query = req.query, customer = _req$query.customer, status = _req$query.status;
          _context.prev = 1;

          if (!(req.user.role === "ADMIN" || customer && customer === req.user.sub)) {
            _context.next = 9;
            break;
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(orders.readAll({
            customer: customer,
            status: status
          }));

        case 5:
          data = _context.sent;
          res.status(200).json({
            data: data
          });
          _context.next = 10;
          break;

        case 9:
          throw new ApiError(403, "You must have admin access to view all orders!");

        case 10:
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          next(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 12]]);
});
router.get("/api/orders/:id", checkToken, function _callee2(req, res, next) {
  var id, _ref, _ref2, data;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(orders.read(id, req.user.sub, req.user.role));

        case 4:
          _ref = _context2.sent;
          _ref2 = _slicedToArray(_ref, 1);
          data = _ref2[0];
          res.json({
            data: data
          });
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router.post("/api/orders", checkToken, function _callee3(req, res, next) {
  var products, customer, data;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          products = req.body.products;
          customer = req.user.sub; //orders.create checks to see if products or customer even exists!

          _context3.next = 5;
          return regeneratorRuntime.awrap(orders.create({
            customer: customer,
            products: products
          }));

        case 5:
          data = _context3.sent;
          res.status(201).json({
            data: data
          });
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.put("/api/orders/:id", checkToken, function _callee4(req, res, next) {
  var id, _req$body, products, status, data;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _req$body = req.body, products = _req$body.products, status = _req$body.status;

          if (!(status === "ACTIVE" || status === "COMPLETE" || status === undefined)) {
            _context4.next = 10;
            break;
          }

          _context4.next = 6;
          return regeneratorRuntime.awrap(orders.update(id, req.user.sub, {
            products: products,
            status: status
          }));

        case 6:
          data = _context4.sent;
          res.status(200).json({
            data: data
          });
          _context4.next = 11;
          break;

        case 10:
          throw new ApiError(400, "Invalid status attribute!");

        case 11:
          _context4.next = 16;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router["delete"]("/api/orders/:id", checkToken, function _callee5(req, res, next) {
  var id, _ref3, _ref4, data;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(orders["delete"](id, req.user.sub));

        case 4:
          _ref3 = _context5.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          data = _ref4[0];
          res.json({
            data: data
          });
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = router;