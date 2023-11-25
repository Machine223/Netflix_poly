
import { IEnvironment } from './IEnvironment';
export const apiKeyAuth = 'e50fa5425cb965b40f7700be1a522ad4';
export const apiReadAccess = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTBmYTU0MjVjYjk2NWI0MGY3NzAwYmUxYTUyMmFkNCIsInN1YiI6IjY1NWU1NDk5YjI2ODFmMDExYjAwYzhjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K929rQX2ssgFTIEi3vlyO6f_hv9T5z-0AxQEFJNcFm0';
export const environment: IEnvironment = {
  production: true,
};
export const endpoint = 'https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1';
export const baseurl = "https://api.themoviedb.org/3";

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ${apiReadAccess}'
  }
};

