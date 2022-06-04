const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,

    },
});


// Utils 

function createMovies(array, container) {
    container.innerHTML = "";
    array.forEach(movie => {
        // Select HTML elements
        //const trendingPreviewMoviesSectionContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        
        
        // Create HTML element
        const movieContainer = document.createElement('div');
        // Add a HTML class
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id
        })
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt',movie.title);
        movieImg.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300'+ movie.poster_path);
        movieContainer.appendChild(movieImg)

        //trendingPreviewMoviesSectionContainer.appendChild(movieContainer);
        container.appendChild(movieContainer);
    });
}


function createCategories(array, container) {
    container.innerHTML = "";
    array.forEach(category => {
        // Select HTML elements
        //const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
        
        // Create HTML element
        const categoryContainer = document.createElement('div');
   
        // Add a HTML class
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id','id' + category.id);
        categoryTitle.addEventListener('click', ()=>{
            location.hash = `#category=${category.id}-${category.name}`
        })
        const categoryTitleText = document.createTextNode(category.name)
        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)

        //previewCategoriesContainer.appendChild(categoryContainer);
        container.appendChild(categoryContainer);
    });
}



// API

async function getTrendingMoviesPreview() {
    // Realizamos consulta con fetch
    //const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key='+ API_KEY);
    const { data } = await api('trending/movie/day');
    
    // we need to parse the file in JSON
    //const data = await res.json();
    // Access to movies
    const movies = data.results;
    console.log(movies)

    createMovies(movies,trendingMoviesPreviewList)
    //trendingMoviesPreviewList.innerHTML = "";

    // movies.forEach(movie => {
    //     // Select HTML elements
    //     //const trendingPreviewMoviesSectionContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        
        
    //     // Create HTML element
    //     const movieContainer = document.createElement('div');
   
    //     // Add a HTML class
    //     movieContainer.classList.add('movie-container');

    //     const movieImg = document.createElement('img');
    //     movieImg.classList.add('movie-img');
    //     movieImg.setAttribute('alt',movie.title);
    //     movieImg.setAttribute(
    //         'src',
    //         'https://image.tmdb.org/t/p/w300'+ movie.poster_path);
    //     movieContainer.appendChild(movieImg)

    //     //trendingPreviewMoviesSectionContainer.appendChild(movieContainer);
    //     trendingMoviesPreviewList.appendChild(movieContainer);
    // });
}


async function getCategoriesPreview() {
    // Realizamos consulta con fetch
    //const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key='+ API_KEY);
    const {data} = await api('genre/movie/list');
    
    // we need to parse the file in JSON
    //const data = await res.json();
    // Access to movies
    const categories = data.genres;
    console.log(categories)
    //categoriesPreviewList.innerHTML = "";
    createCategories(categories,categoriesPreviewList)
    // categories.forEach(category => {
    //     // Select HTML elements
    //     //const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
        
    //     // Create HTML element
    //     const categoryContainer = document.createElement('div');
   
    //     // Add a HTML class
    //     categoryContainer.classList.add('category-container');

    //     const categoryTitle = document.createElement('h3');
    //     categoryTitle.classList.add('category-title');
    //     categoryTitle.setAttribute('id','id' + category.id);
    //     categoryTitle.addEventListener('click', ()=>{
    //         location.hash = `#category=${category.id}-${category.name}`
    //     })
    //     const categoryTitleText = document.createTextNode(category.name)
    //     categoryTitle.appendChild(categoryTitleText)
    //     categoryContainer.appendChild(categoryTitle)

    //     //previewCategoriesContainer.appendChild(categoryContainer);
    //     categoriesPreviewList.appendChild(categoryContainer);
    // });
}

async function getMoviesByCategory(id) {
    // Realizamos consulta con fetch
    //const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key='+ API_KEY);
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id
        }
    });
    
    // we need to parse the file in JSON
    //const data = await res.json();
    // Access to movies
    const movies = data.results;
    console.log(movies)
    //genericSection.innerHTML = "";
    createMovies(movies,genericSection)
    // movies.forEach(movie => {
    //     // Select HTML elements
    //     //const trendingPreviewMoviesSectionContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        
        
    //     // Create HTML element
    //     const movieContainer = document.createElement('div');
   
    //     // Add a HTML class
    //     movieContainer.classList.add('movie-container');

    //     const movieImg = document.createElement('img');
    //     movieImg.classList.add('movie-img');
    //     movieImg.setAttribute('alt',movie.title);
    //     movieImg.setAttribute(
    //         'src',
    //         'https://image.tmdb.org/t/p/w300'+ movie.poster_path);
    //     movieContainer.appendChild(movieImg)

    //     //trendingPreviewMoviesSectionContainer.appendChild(movieContainer);
    //     genericSection.appendChild(movieContainer);
    // });
}

async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query,
        }
    });
    
    const movies = data.results;
    console.log(movies)
    //genericSection.innerHTML = "";
    createMovies(movies,genericSection)
  
}


async function getTrendingMovies() {
    // Realizamos consulta con fetch
    //const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key='+ API_KEY);
    const { data } = await api('trending/movie/day');
    
    // we need to parse the file in JSON
    //const data = await res.json();
    // Access to movies
    const movies = data.results;
    console.log(movies)

    createMovies(movies,genericSection)
  
}


async function getMovieById(id) {
    const { data: movie } = await api('movie/' + id);
  
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    console.log(movieImgUrl)
    headerSection.style.background = `
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
      ),
      url(${movieImgUrl})
    `;
    
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
  
    createCategories(movie.genres, movieDetailCategoriesList);

    getRelatedMoviesId(id);
  }

  async function getRelatedMoviesId(id){
    const { data } = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;
    createMovies(relatedMovies, relatedMoviesContainer)
  }