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
        return this.pool.query(`SELECT * FROM HOTELDB.${tableName};`);
    }
    // HOTEL
    getHotels() {
        return this.pool.query('SELECT * FROM HOTELDB.Hotel;');
    }
    getHotelNo() {
        return this.pool.query('SELECT hotelNo FROM HOTELDB.Hotel;');
    }
    createHotel(hotelNo, hotelName, city) {
        const values = [
            hotelNo,
            hotelName,
            city
        ];
        const queryText = `INSERT INTO HOTELDB.Hotel VALUES($1, $2, $3);`;
        return this.pool.query(queryText, values);
    }
    deleteHotel( /*Todo*/) {
        /*TODO*/
    }
    // ROOM
    getRoomFromHotel(hotelNo, roomType, price) {
        let query = `SELECT * FROM HOTELDB.room
        WHERE hotelno=\'${hotelNo}\'`;
        if (roomType !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`typeroom=\'${roomType}\'`);
        }
        if (price !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`price =\'${price}\'`);
        }
        console.log(query);
        return this.pool.query(query);
    }
    getRoomFromHotelParams(params) {
        let query = 'SELECT * FROM HOTELDB.room \n';
        const keys = Object.keys(params);
        if (keys.length > 0) {
            query = query.concat(`WHERE ${keys[0]} =\'${params[keys[0]]}\'`);
        }
        // On enleve le premier element
        keys.shift();
        // tslint:disable-next-line:forin
        for (const param in keys) {
            const value = keys[param];
            query = query.concat(`AND ${value} = \'${params[value]}\'`);
            if (param === 'price') {
                query = query.replace('\'', '');
            }
        }
        console.log(query);
        return this.pool.query(query);
    }
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
    // GUEST
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
    }
    // BOOKING
    createBooking(hotelNo, guestNo, dateFrom, dateTo, roomNo) {
        const values = [
            hotelNo,
            guestNo,
            dateFrom.toString(),
            dateTo.toString(),
            roomNo
        ];
        const queryText = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;
        return this.pool.query(queryText, values);
    }
};
DatabaseService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map