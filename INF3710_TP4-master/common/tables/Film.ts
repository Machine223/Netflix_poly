export class Film {
  filmID: number;
  titre: string;
  genre: string;
  dureeTotalMinutes: number;
  // director: string;
  dateProduction: string;

  constructor(filmID: number, titre: string, genre: string, dureeTotalMinutes: number, dateProduction: string) {
    this.filmID = filmID;
    this.titre = titre;
    this.genre = genre;
    this.dureeTotalMinutes = dureeTotalMinutes;
  //   this.director = director;
    this.dateProduction = dateProduction;
  }
}
