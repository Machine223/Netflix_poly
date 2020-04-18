import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Film } from "../../../common/tables/Film";
import { Membre } from "../../../common/tables/Membre";

import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/createSchema",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.createSchema().then((result: pg.QueryResult) => {
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                });

        router.post("/populateDb",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.populateDb().then((result: pg.QueryResult) => {
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                });

        router.get("/movies",
                   (req: Request, res: Response, next: NextFunction) => {
                    // Send the request to the service and send the response
                    this.databaseService.getMovies().then((result: pg.QueryResult) => {
                    const movies: Film[] = result[1]['rows'].map((mov: any) => (
                        {
                        filmID: mov.filmID,
                        titre: mov.titre,
                        genre: mov.genre,
                        dateProduction: mov.dateProduction,
                        dureeTotalMinutes: mov.dureeTotalMinutes
                    }));
                    res.json(movies);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.get("/membres",
                   (req: Request, res: Response, next: NextFunction) => {
                    // Send the request to the service and send the response
                    this.databaseService.getMembres().then((result: pg.QueryResult) => {
                    const membres: Membre[] = result.rows.map((mem: any) => (
                    {
                        membreID : mem.membreID,
                        nom: mem.nom,
                        courriel: mem.courriel,
                        motDePasse: mem.motDePasse,
                        adressePostal: mem.adressePostal,
                        isAdmin: mem.isAdmin
                    }));
                    res.json(membres);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/membres/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                    const membre: Membre = {
                        membreID: req.body.membreID,
                        nom: req.body.nom,
                        courriel: req.body.courriel,
                        motDePasse: req.body.motDePasse,
                        adressePostal: req.body.adressePostal,
                        isAdmin: req.body.isAdmin
                    };
                    console.log(membre);

                    this.databaseService.createMember(membre)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    })
                    .catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

        router.get("/login",
                   (req: Request, res: Response, next: NextFunction) => {
                    console.log('----------------------------------');
                    this.databaseService.login(req.query.email, req.query.password).then((result: pg.QueryResult) => {
                    console.log(result);
                    const membres: Membre[] = result.rows.map((mem: any) => (
                    {
                        membreID : mem.membreid,
                        nom: mem.nom,
                        courriel: mem.courriel,
                        motDePasse: mem.motdepasse,
                        adressePostal: mem.adressepostal,
                        isAdmin: mem.isadmin
                    }));
                    console.log(membres);
                    res.json(membres);
                }).catch((e: Error) => {
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

        router.get("/tables/:tableName",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getAllFromTable(req.params.tableName)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rows);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        return router;
    }
}
