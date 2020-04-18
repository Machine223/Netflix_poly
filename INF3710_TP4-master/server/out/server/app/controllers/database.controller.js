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
        router.get("/movies", (req, res, next) => {
            // Send the request to the service and send the response
            this.databaseService.getMovies().then((result) => {
                const movies = result[1]['rows'].map((mov) => ({
                    filmID: mov.filmID,
                    titre: mov.titre,
                    genre: mov.genre,
                    dateProduction: mov.dateProduction,
                    dureeTotalMinutes: mov.dureeTotalMinutes
                }));
                res.json(movies);
            }).catch((e) => {
                console.error(e.stack);
            });
        });
        router.get("/membres", (req, res, next) => {
            // Send the request to the service and send the response
            this.databaseService.getMembres().then((result) => {
                const membres = result.rows.map((mem) => ({
                    membreID: mem.membreID,
                    nom: mem.nom,
                    courriel: mem.courriel,
                    motDePasse: mem.motDePasse,
                    adressePostal: mem.adressePostal,
                    isAdmin: mem.isAdmin
                }));
                res.json(membres);
            }).catch((e) => {
                console.error(e.stack);
            });
        });
        router.post("/membres/insert", (req, res, next) => {
            const membre = {
                membreID: req.body.membreID,
                nom: req.body.nom,
                courriel: req.body.courriel,
                motDePasse: req.body.motDePasse,
                adressePostal: req.body.adressePostal,
                isAdmin: req.body.isAdmin
            };
            console.log(membre);
            this.databaseService.createMember(membre)
                .then((result) => {
                res.json(result.rowCount);
            })
                .catch((e) => {
                console.error(e.stack);
                res.json(-1);
            });
        });
        router.get("/login", (req, res, next) => {
            console.log('----------------------------------');
            this.databaseService.login(req.query.email, req.query.password).then((result) => {
                console.log(result);
                const membres = result.rows.map((mem) => ({
                    membreID: mem.membreid,
                    nom: mem.nom,
                    courriel: mem.courriel,
                    motDePasse: mem.motdepasse,
                    adressePostal: mem.adressepostal,
                    isAdmin: mem.isadmin
                }));
                console.log(membres);
                res.json(membres);
            }).catch((e) => {
                console.error(e.stack);
            });
        });
        // router.get("/hotel/hotelNo",
        //            (req: Request, res: Response, next: NextFunction) => {
        //               this.databaseService.getMembres().then((result: pg.QueryResult) => {
        //                 const hotelPKs: string[] = result.rows.map((row: any) => row.hotelno);
        //                 res.json(hotelPKs);
        //               }).catch((e: Error) => {
        //                 console.error(e.stack);
        //             });
        //           });
        // router.post("/hotel/insert",
        //             (req: Request, res: Response, next: NextFunction) => {
        //                 const hotelNo: string = req.body.hotelNo;
        //                 const hotelName: string = req.body.hotelName;
        //                 const city: string = req.body.city;
        //                 this.databaseService.createHotel(hotelNo, hotelName, city).then((result: pg.QueryResult) => {
        //                 res.json(result.rowCount);
        //             }).catch((e: Error) => {
        //                 console.error(e.stack);
        //                 res.json(-1);
        //             });
        // });
        // router.delete("/hotel/insert", /*TODO*/);
        // router.get("/rooms",
        //            (req: Request, res: Response, next: NextFunction) => {
        //             this.databaseService.getRoomFromHotelParams(req.query)
        //             .then((result: pg.QueryResult) => {
        //                 const rooms: Room[] = result.rows.map((room: Room) => (
        //                     {
        //                     hotelno: room.hotelno,
        //                     roomno: room.roomno,
        //                     typeroom: room.typeroom,
        //                     price: parseFloat(room.price.toString())
        //                 }));
        //                 res.json(rooms);
        //             }).catch((e: Error) => {
        //                 console.error(e.stack);
        //             });
        //     });
        // router.post("/rooms/insert",
        //             (req: Request, res: Response, next: NextFunction) => {
        //             const room: Room = {
        //                 hotelno: req.body.hotelno,
        //                 roomno: req.body.roomno,
        //                 typeroom: req.body.typeroom,
        //                 price: parseFloat(req.body.price)};
        //             console.log(room);
        //             this.databaseService.createRoom(room)
        //             .then((result: pg.QueryResult) => {
        //                 res.json(result.rowCount);
        //             })
        //             .catch((e: Error) => {
        //                 console.error(e.stack);
        //                 res.json(-1);
        //             });
        // });
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