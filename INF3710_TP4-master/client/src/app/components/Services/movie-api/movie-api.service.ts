import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiKeyAuth, baseurl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  public constructor(private http: HttpClient) {}



  //bannerapidata

  bannerApiData(): Observable<any> {
    return this.http.get(`${baseurl}/trending/all/week?api_key=${apiKeyAuth}`);
  }


  // trendingmovieapidata
  trendingMovieApiData(): Observable<any> {
    return this.http.get(`${baseurl}/trending/movie/day?api_key=${apiKeyAuth}`);
  }

  // searchmovive
  getSearchMovie(data: any): Observable<any> {
    console.log(data, 'movie#');

    return this.http.get(`${baseurl}/search/movie?api_key=${apiKeyAuth}&query=${data.movieName}`);
  }

  // getmoviedatails
  getMovieDetails(data: any): Observable<any> {
    return this.http.get(`${baseurl}/movie/${data}?api_key=${apiKeyAuth}`)
  }

  // getMovieVideo
  getMovieVideo(data: any): Observable<any> {
    return this.http.get(`${baseurl}/movie/${data}/videos?api_key=${apiKeyAuth}`)
  }

  // getMovieCast
  getMovieCast(data: any): Observable<any> {
    return this.http.get(`${baseurl}/movie/${data}/credits?api_key=${apiKeyAuth}`)
  }
  // action
  fetchActionMovies(): Observable<any> {
    return this.http.get(`${baseurl}/discover/movie?api_key=${apiKeyAuth}&with_genres=28`);
  }

  // adventure
  fetchAdventureMovies(): Observable<any> {
    return this.http.get(`${baseurl}/discover/movie?api_key=${apiKeyAuth}&with_genres=12`);
  }

  // animation
  fetchAnimationMovies(): Observable<any> {
    return this.http.get(`${baseurl}/discover/movie?api_key=${apiKeyAuth}&with_genres=16`);
  }

  // comedy
  fetchComedyMovies(): Observable<any> {
    return this.http.get(`${baseurl}/discover/movie?api_key=${apiKeyAuth}&with_genres=35`);
  }

  // documentary
  fetchDocumentaryMovies(): Observable<any> {
    return this.http.get(`${baseurl}/discover/movie?api_key=${apiKeyAuth}&with_genres=99`);
  }

  // science-fiction:878

  fetchScienceFictionMovies(): Observable<any> {
    return this.http.get(`${baseurl}/discover/movie?api_key=${apiKeyAuth}&with_genres=878`);
  }

  // thriller:53
  fetchThrillerMovies(): Observable<any> {
    return this.http.get(`${baseurl}/discover/movie?api_key=${apiKeyAuth}&with_genres=53`);
  }

}
