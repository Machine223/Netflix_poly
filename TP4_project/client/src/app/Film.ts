export class Film {
  filmID: number;
  titre: string;
  genre: string;
  dureeTotalMinutes: number;
  dateProduction: number;

  constructor(filmID: number, titre: string, genre: string, dureeTotalMinutes: number, dateProduction: number) {
    this.filmID = filmID;
    this.titre = titre;
    this.genre = genre;
    this.dureeTotalMinutes = dureeTotalMinutes;
    this.dateProduction = dateProduction;
  }
}
