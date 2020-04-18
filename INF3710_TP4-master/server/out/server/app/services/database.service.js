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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const pg = require("pg");
require("reflect-metadata");
const createSchema_1 = require("../createSchema");
const populateDB_1 = require("../populateDB");
let DatabaseService = class DatabaseService {
    constructor() {
        // A MODIFIER POUR VOTRE BD
        this.connectionConfig = {
            user: "sysadmin",
            database: "TP4",
            password: "1234",
            port: 5432,
            host: "127.0.0.1",
            keepAlive: true
        };
        this.pool = new pg.Pool(this.connectionConfig);
        this.pool.connect();
    }
    /*

        METHODES DE DEBUG
    */
    createSchema() {
        return this.pool.query(createSchema_1.schema);
    }
    populateDb() {
        return this.pool.query(populateDB_1.data);
    }
    getAllFromTable(tableName) {
        return this.pool.query(`SELECT * FROM TP4.${tableName};`);
    }
    // NETFLIX
    getMovies() {
        return this.pool.query('set search_path to schema_films; SELECT * FROM film;');
    }
    getMembres() {
        return this.pool.query('SELECT * FROM TP4.Membre;');
    }
    login(email, password) {
        return this.pool.query(`SELECT * FROM TP4.Membre m WHERE m.courriel='${email}' AND m.motDePasse='${password}';`);
    }
    createMember(member) {
        return this.pool.query(`SET search_path TO schema_films;
            INSERT INTO Membre(membreID, nom, courriel, motDePasse, adressePostal, isAdmin)
            VALUES(DEFAULT, '${member.nom}', '${member.courriel}', '${member.motDePasse}',
            '${member.adressePostal}', 'false');`);
    }
    // public createHotel(hotelNo: string, hotelName: string, city: string): Promise<pg.QueryResult> {
    //     const values: string[] = [
    //         hotelNo,
    //         hotelName,
    //         city
    //     ];
    //     const queryText: string = `INSERT INTO HOTELDB.Hotel VALUES($1, $2, $3);`;
    //     return this.pool.query(queryText, values);
    // }
    // public deleteHotel(/*Todo*/): void /*TODO*/  {
    // 	/*TODO*/
    // }
    // // ROOM
    // public getRoomFromHotel(hotelNo: string, roomType: string, price: number): Promise<pg.QueryResult> {
    //     let query: string =
    //     `SELECT * FROM HOTELDB.room
    //     WHERE hotelno=\'${hotelNo}\'`;
    //     if (roomType !== undefined) {
    //         query = query.concat('AND ');
    //         query = query.concat(`typeroom=\'${roomType}\'`);
    //     }
    //     if (price !== undefined) {
    //         query = query.concat('AND ');
    //         query = query.concat(`price =\'${price}\'`);
    //     }
    //     console.log(query);
    //     return this.pool.query(query);
    // }
    // public getRoomFromHotelParams(params: object): Promise<pg.QueryResult> {
    //     let query: string = 'SELECT * FROM HOTELDB.room \n';
    //     const keys: string[] = Object.keys(params);
    //     if (keys.length > 0) {
    //         query = query.concat(`WHERE ${keys[0]} =\'${params[keys[0]]}\'`);
    //     }
    //     // On enleve le premier element
    //     keys.shift();
    //     // tslint:disable-next-line:forin
    //     for (const param in keys) {
    //         const value: string = keys[param];
    //         query = query.concat(`AND ${value} = \'${params[value]}\'`);
    //         if (param === 'price') {
    //             query = query.replace('\'', '');
    //         }
    //     }
    //     console.log(query);
    //     return this.pool.query(query);
    // }
    createRoom(room) {
        const values = [
            room.roomno,
            room.hotelno,
            room.typeroom,
            room.price.toString()
        ];
        const queryText = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4);`;
        return this.pool.query(queryText, values);
    }
    // // GUEST
    createGuest(guestNo, nas, guestName, gender, guestCity) {
        // this.pool.connect();
        const values = [
            guestNo,
            nas,
            guestName,
            gender,
            guestCity
        ];
        const queryText = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;
        return this.pool.query(queryText, values);
        // }
        // // BOOKING
        // public createBooking(hotelNo: string,
        //                      guestNo: string,
        //                      dateFrom: Date,
        //                      dateTo: Date,
        //                      roomNo: string): Promise<pg.QueryResult> {
        //     const values: string[] = [
        //         hotelNo,
        //         guestNo,
        //         dateFrom.toString(),
        //         dateTo.toString(),
        //         roomNo
        //     ];
        //     const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;
        //     return this.pool.query(queryText, values);
        //     }
    }
};
DatabaseService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map