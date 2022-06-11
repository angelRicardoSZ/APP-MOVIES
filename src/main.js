const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,

    },
});

function likedMoviesList(){
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;
    if(item) {
        movies = item;
    } else {
        movies = {};
    }
    return movies
}


function likeMovie(movie) {
    const likedMovies = likedMoviesList();
    console.log(likedMovies)
    // First, we ask if the movie exists
    if(likedMovies[movie.id]){
        likedMovies[movie.id] = undefined;
        console.log("la pelicula ya estaba en localStorage")
        // remove of localStorage
    } else{
        console.log("la pelicula no estaba en localStorage")
        likedMovies[movie.id] = movie;
    }
    localStorage.setItem('liked_movies',JSON.stringify(likedMovies));
    console.log(localStorage.getItem('liked_movies'));
    if (location.hash == ''){
        homePage();
    }
}

// Utils 
// Lazy loader
// Creating an instance of an intersection observer
const lazyLoader = new IntersectionObserver(
    (entries) =>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting) {
                // get the url
                const url =entry.target.getAttribute('data-img')
                // assign it to src
                //console.log(entry.target)
                entry.target.setAttribute('src',url)
            }
          
        });
});



function createMovies(array, container, {
    lazyLoad = true, 
    clean = true
    } ={} ){
    if (clean) {
        container.innerHTML = "";
    }
    
    
    array.forEach(movie => {
        // Select HTML elements
        //const trendingPreviewMoviesSectionContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        
        
        // Create HTML element
        const movieContainer = document.createElement('div');
        // Add a HTML class
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt',movie.title);
        // If lazy load is activate 
        movieImg.setAttribute(
            lazyLoad ? 'data-img':'src',
            'https://image.tmdb.org/t/p/w300'+ movie.poster_path);
        // error
        movieImg.addEventListener('error', ()=>{
            movieImg.setAttribute(
                'src',
                'https://static.platzi.com/static/images/error/img404.png')
        })    
        movieImg.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id
        })
        const movieBtn = document.createElement("button")
        movieContainer.appendChild(movieImg)
        movieBtn.classList.add("movie-btn")
        likedMoviesList()[movie.id] && movieBtn.classList.add("movie-btn--liked")
        movieBtn.addEventListener("click", ()=> {
            movieBtn.classList.add("movie-btn--liked")
            likeMovie(movie);
        })
        // Targeting and element to be observed
        if (lazyLoad) {
            lazyLoader.observe(movieImg)
        }
        
        movieContainer.appendChild(movieBtn)
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
    createMovies(movies,genericSection,{lazyLoad:true, clean:true})
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

function getPaginatedMoviesByCategory(id){
    return async function(){
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
    
        const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight-15;
        const pageIsNotMax = page < maxPage;
        if(scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api('discover/movie', {
                params: {
                    with_genres: id,
                    page,
                }
            });
            createMovies(movies,genericSection, {lazyLoad: true, clean:false})
        }
    }
}


async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query,
        }
    });
    
    const movies = data.results;
    console.log(movies)
    maxPage = data.total_pages;
    console.log(maxPage)
    //genericSection.innerHTML = "";
    createMovies(movies,genericSection)
  
}

function getPaginatedMoviesBySearch(query){
    return async function(){
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
    
        const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight-15;
        const pageIsNotMax = page < maxPage;
        if(scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api('search/movie', {
                params: {
                    query,
                    page
                }
            });
            const movies = data.results;
            createMovies(movies,genericSection, {lazyLoad: true, clean:false})
        }
    }
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
    maxPage = data.total_pages;
    console.log(maxPage)
    createMovies(movies,genericSection, {lazyLoad: true, clean:true})

    // const btnLoadMore = document.createElement("button")
    // btnLoadMore.innerText = " Cargar-mas ";
    // btnLoadMore.addEventListener("click",getPageTrendingMovies )
    // genericSection.appendChild(btnLoadMore)
  
}

//window.addEventListener("scroll", getPageTrendingMovies)

async function getPageTrendingMovies(){
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight-15;
    const pageIsNotMax = page < maxPage;
    if(scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('trending/movie/day', {
            params: {
                page,
            }
        });
        const movies = data.results;
        createMovies(movies,genericSection, {lazyLoad: true, clean:false})
    }

    
    // const { data } = await api('trending/movie/day', {
    //     params: {
    //         page,
    //     }
    // });
    // const movies = data.results;
    // createMovies(movies,genericSection, {lazyLoad: true, clean:false})
    // const btnLoadMore = document.createElement("button")
    // btnLoadMore.innerText = " Cargar-mas ";
    // btnLoadMore.addEventListener("click",getPageTrendingMovies )
    // genericSection.appendChild(btnLoadMore)
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

function getLikedMovies(){
    const likedMovies = likedMoviesList();

    const moviesArray = Object.values(likedMovies)
    console.log(moviesArray)
    createMovies(moviesArray, likedMoviesListArticle,  {
        lazyLoad : true, 
        clean : true
        });
    console.log(likedMovies)

}