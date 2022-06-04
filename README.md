# APP-MOVIES

This app shows the data of movies from the **api**  [the movie database]( https://api.themoviedb.org/3/) using **axios** (a promise-based HTTP client) 

## Descrption of APP-MOVIES

- BaseURL: https://api.themoviedb.org/3/

- Trend movies: movies that are in trends 

  - ```javascript
    BaseURL + 'trending/movie/day'
    ```

- Category: list of all available categories.

  - ```javascript
    BaseURL + 'genre/movie/list'
    ```

- Search-bar: when writing a title, a view is returned with the most similar movies.

  - ```javascript
    BaseURL + 'search/movie'
    ```

    

- Detail view: summary of the movie, score and genres to which the film belongs.

  - ```javascript
    BaseURL + 'movie/' + id
    ```

- Similar movies: Movies related to some movie.

  - ```javascript
    `movie/${id}/similar`
    ```

​	**The html and css was taken from course: Curso Práctico de Consumo de API REST con JavaScript of Platzi, I focus on Js code and manipulation of the DOM**

The repository where I develop this app is located at: [Javascript-Pz/Practice-APIREST at main · angelRicardoSZ/Javascript-Pz (github.com)](https://github.com/angelRicardoSZ/Javascript-Pz/tree/main/Practice-APIREST)

### Professional API REST

This branch add new features from the professional API-REST course





