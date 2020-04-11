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
        return this.pool.query('SELECT * FROM TP4.Film;');
    }
    getMembres() {
        return this.pool.query('SELECT * FROM TP4.Membre;');
    }
    login(email, password) {
        return this.pool.query(`SELECT * FROM TP4.Membre m WHERE m.courriel='${email}' AND m.mot_de_passe='${password}';`);
    }
};
DatabaseService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map