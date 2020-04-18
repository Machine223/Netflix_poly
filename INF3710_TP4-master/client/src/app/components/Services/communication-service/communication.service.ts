import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import {Hotel} from "../../../../common/tables/Hotel";
//import {Room} from "../../../../common/tables/Room";
import { of, Observable, concat, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Film } from "../../../../../../common/tables/Film";
import { Membre } from "../../../Membre";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class CommunicationService {
  DBcreated: boolean = false;
  private activeDBcreated = new BehaviorSubject(this.DBcreated);
  obsDB = this.activeDBcreated.asObservable();

  setDBcreated(created: boolean) {
    this.activeDBcreated.next(created);
  }

  getDBcreated() {
    return this.activeDBcreated.value;
  }

  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient) {}

  private _listners: any = new Subject<any>();

  public listen(): Observable<any> {
    return this._listners.asObservable();
  }

  public filter(filterBy: string): void {
    this._listners.next(filterBy);
  }

  public getMovies(): Observable<any[]> {
    return this.http
      .get<Film[]>(this.BASE_URL + "/movies")
      .pipe(catchError(this.handleError<Film[]>("getMovies")));
  }

  public addMembre(membre: Membre): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/membres/insert", membre)
      .pipe(catchError(this.handleError<number>("insertMembre")));
  }

  public addFilm(film: Film): Observable<number> {
    console.log("called");
    return this.http
      .post<number>(this.BASE_URL + "/film/insert", film)
      .pipe(catchError(this.handleError<number>("insertMembre")));
  }
  public getMembres(): Observable<any[]> {
    return this.http
      .get<Film[]>(this.BASE_URL + "/membres")
      .pipe(catchError(this.handleError<Film[]>("getMovies")));
  }

  public login(email: string, password: string): Observable<Membre[]> {
    console.log("hello from login communication !!!");
    return this.http
      .get<Membre[]>(
        this.BASE_URL + `/login?email=${email}&password=${password}`
      )
      .pipe(catchError(this.handleError<Membre[]>("login")));
  }

  public getHotelPKs(): Observable<string[]> {
    return this.http
      .get<string[]>(this.BASE_URL + "/hotel/hotelNo")
      .pipe(catchError(this.handleError<string[]>("getHotelPKs")));
  }

  public insertHotel(hotel: any): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/hotel/insert", hotel)
      .pipe(catchError(this.handleError<number>("inserHotel")));
  }

  // public insertRoom(room: Room): Observable<number> {
  //     return this.http.post<number>(this.BASE_URL + "/rooms/insert", room).pipe(
  //         catchError(this.handleError<number>("inserHotel")),
  //     );
  // }

  public deleteMovie(filmid: any): Observable<number> {
    return this.http
      .delete<any>(this.BASE_URL + `/deleteMovie?filmid=` + filmid)
      .pipe(catchError(this.handleError<any>("inserHotel")));
  }

  public setUpDatabase(): Observable<any> {
    return concat(
      this.http.post<any>(this.BASE_URL + "/createSchema", []),
      this.http.post<any>(this.BASE_URL + "/populateDb", [])
    );
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }

  // public login(membre: Membre): Observable<number> {
  //     return this.http.post<number>(this.BASE_URL + "/membres/insert", membre).pipe(
  //         catchError(this.handleError<number>("insertMembre")),
  //     );
  // }
}
