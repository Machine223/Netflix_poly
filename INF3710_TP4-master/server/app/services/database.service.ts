import { injectable } from 'inversify';
import * as pg from 'pg';
import 'reflect-metadata';
import { schema } from '../createSchema';
import { data } from '../populateDB';
import { Membre } from '../../../common/tables/Membre';
import { Film } from '../../../common/tables/Film';

@injectable()
export class DatabaseService {
    // A MODIFIER POUR VOTRE BD
    public connectionConfig: pg.ConnectionConfig = {
        user: 'sysadmin',
        database: 'TP4',
        password: '1234',
        port: 15432,
        host: '127.0.0.1',
        keepAlive: true,
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

    public constructor() {
        this.pool.connect();
    }
    /*

        METHODES DE DEBUG
    */
    public createSchema(): Promise<pg.QueryResult> {
        return this.pool.query(schema);
    }

    public populateDb(): Promise<pg.QueryResult> {
        return this.pool.query(data);
    }

    public getAllFromTable(tableName: string): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT * FROM TP4.${tableName};`);
    }

    // NETFLIX
    public getMovies(): Promise<pg.QueryResult> {
        return this.pool.query('set search_path to schema_films; SELECT * FROM film;');
    }

    public getMembres(): Promise<pg.QueryResult> {
        return this.pool.query('SELECT * FROM TP4.Membre;');
    }

    public deleteMovie(id: string): Promise<pg.QueryResult> {
        return this.pool.query(`set search_path to schema_films; DELETE FROM film WHERE filmid='${id}';`);
    }

    public insertMovie(film: Film): Promise<pg.QueryResult> {
        const dt = new Date(film.dateProduction);
        const lel = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
        // return this.pool.query('set search_path to schema_films; INSERT INT');
        return this.pool.query(
            `set search_path to schema_films; INSERT INTO Film(titre, genre, dateProduction, dureeTotalMinutes)VALUES('${film.titre}', '${film.genre}', DATE'${lel}', ${film.dureeTotalMinutes});`,
            // `set search_path to schema_films; INSERT INTO Film(titre, genre, dateProduction, dureeTotalMinutes)VALUES(${film.titre}, ${film.genre}, ${film.dateProduction}, ${film.dureeTotalMinutes});`,
        );
    }

    public modifyMovie(film: Film): Promise<pg.QueryResult> {
        const dt = new Date(film.dateProduction);
        const lel = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
        // return this.pool.query('set search_path to schema_films; INSERT INT');
        return this.pool.query(
            `set search_path to schema_films; UPDATE Film SET titre='${film.titre}', genre='${film.genre}', dateProduction=DATE'${lel}', dureeTotalMinutes=${film.dureeTotalMinutes} WHERE Film.filmid = ${film.filmID};`,
            // `set search_path to schema_films; INSERT INTO Film(titre, genre, dateProduction, dureeTotalMinutes)VALUES(${film.titre}, ${film.genre}, ${film.dateProduction}, ${film.dureeTotalMinutes});`,
        );
    }
    public async login(email: String, password: String): Promise<pg.QueryResult> {
        let query = this.pool.query(
            `SET search_path TO schema_films;
            SELECT * FROM Membre WHERE courriel='${email}' AND motDePasse='${password}';`,
        );
        const temp = await query;
        return temp[1];
    }

    public createMember(member: Membre): Promise<pg.QueryResult> {
        return this.pool.query(
            `SET search_path TO schema_films;
            INSERT INTO Membre(membreID, nom, courriel, motDePasse, adressePostal, isAdmin)
            VALUES(DEFAULT, '${member.nom}', '${member.courriel}', '${member.motDePasse}',
            '${member.adressePostal}', 'false');`,
        );
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

    // public createRoom(room: Room): Promise<pg.QueryResult> {
    //     const values: string[] = [room.roomno, room.hotelno, room.typeroom, room.price.toString()];
    //     const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4);`;

    //     return this.pool.query(queryText, values);
    // }

    // // GUEST
    // public createGuest(guestNo: string,
    //                    nas: string,
    //                    guestName: string,
    //                    gender: string,
    //                    guestCity: string): Promise<pg.QueryResult> {
    //     // this.pool.connect();
    //     const values: string[] = [
    //         guestNo,
    //         nas,
    //         guestName,
    //         gender,
    //         guestCity
    //     ];
    //     const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;

    //     return this.pool.query(queryText, values);
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
