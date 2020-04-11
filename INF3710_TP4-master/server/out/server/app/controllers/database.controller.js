"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inversify_1 = require("inversify");
const database_service_1 = require("../services/database.service");
const types_1 = require("../types");
let DatabaseController = class DatabaseController {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    get router() {
        const router = express_1.Router();
        router.post("/createSchema", (req, res, next) => {
            this.databaseService.createSchema().then((result) => {
                res.json(result);
            }).catch((e) => {
                console.error(e.stack);
            });
        });
        router.post("/populateDb", (req, res, next) => {
            this.databaseService.populateDb().then((result) => {
                res.json(result);
            }).catch((e) => {
                console.error(e.stack);
            });
        });
        router.get("/hotel", (req, res, next) => {
            // Send the request to the service and send the response
            this.databaseService.getMovies().then((result) => {
                const hotels = result.rows.map((hot) => ({
                    hotelno: hot.hotelno,
                    hotelname: hot.hotelname,
                    city: hot.city
                }));
                res.json(hotels);
            }).catch((e) => {
                console.error(e.stack);
            });
        });
        router.get("/hotel/hotelNo", (req, res, next) => {
            this.databaseService.getMembres().then((result) => {
                const hotelPKs = result.rows.map((row) => row.hotelno);
                res.json(hotelPKs);
            }).catch((e) => {
                console.error(e.stack);
            });
        });
        router.post("/hotel/insert", (req, res, next) => {
            const hotelNo = req.body.hotelNo;
            const hotelName = req.body.hotelName;
            const city = req.body.city;
            this.databaseService.createHotel(hotelNo, hotelName, city).then((result) => {
                res.json(result.rowCount);
            }).catch((e) => {
                console.error(e.stack);
                res.json(-1);
            });
        });
        router.delete("/hotel/insert");
        router.get("/rooms", (req, res, next) => {
            this.databaseService.getRoomFromHotelParams(req.query)
                .then((result) => {
                const rooms = result.rows.map((room) => ({
                    hotelno: room.hotelno,
                    roomno: room.roomno,
                    typeroom: room.typeroom,
                    price: parseFloat(room.price.toString())
                }));
                res.json(rooms);
            }).catch((e) => {
                console.error(e.stack);
            });
        });
        router.post("/rooms/insert", (req, res, next) => {
            const room = {
                hotelno: req.body.hotelno,
                roomno: req.body.roomno,
                typeroom: req.body.typeroom,
                price: parseFloat(req.body.price)
            };
            console.log(room);
            this.databaseService.createRoom(room)
                .then((result) => {
                res.json(result.rowCount);
            })
                .catch((e) => {
                console.error(e.stack);
                res.json(-1);
            });
        });
        router.get("/tables/:tableName", (req, res, next) => {
            this.databaseService.getAllFromTable(req.params.tableName)
                .then((result) => {
                res.json(result.rows);
            }).catch((e) => {
                console.error(e.stack);
            });
        });
        return router;
    }
};
DatabaseController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.DatabaseService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DatabaseController);
exports.DatabaseController = DatabaseController;
//# sourceMappingURL=database.controller.js.map