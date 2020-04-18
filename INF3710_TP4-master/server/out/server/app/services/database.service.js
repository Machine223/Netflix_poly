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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
            user: 'sysadmin',
            database: 'TP4',
            password: '1234',
            port: 15432,
            host: '127.0.0.1',
            keepAlive: true,
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
        return __awaiter(this, void 0, void 0, function* () {
            const lol = this.pool.query(`set search_path to schema_films; SELECT * FROM membre WHERE courriel='admin@admin.com'; `);
            const temp = yield lol;
            return temp[1];
        });
    }
    deleteMovie(id) {
        console.log('DELETING -----------------' + id);
        return this.pool.query(`set search_path to schema_films; DELETE FROM film WHERE filmid='${id}';`);
    }
    insertMovie(film) {
        console.log('INSERTING -----------------');
        const dt = new Date(film.dateProduction);
        const lel = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
        // return this.pool.query('set search_path to schema_films; INSERT INT');
        return this.pool.query(`set search_path to schema_films; INSERT INTO Film(titre, genre, dateProduction, dureeTotalMinutes)VALUES('${film.titre}', '${film.genre}', DATE'${lel}', ${film.dureeTotalMinutes});`);
    }
};
DatabaseService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map