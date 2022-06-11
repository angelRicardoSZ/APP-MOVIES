
let page = 1;
let infiniteScroll;
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener("scroll", infiniteScroll, false)

const searchFormInput = document.querySelector('#searchForm input');
const searchFormBtn = document.querySelector('#searchBtn');
const trendingBtn = document.querySelector('.trendingPreview-btn');
const arrowBtn = document.querySelector('.header-arrow');
searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});
  
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});
  
arrowBtn.addEventListener('click', () => {
    history.back();
    //location.hash = '#home';
});


function navigator() {
    if(infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, {passive:false});
        infiniteScroll = undefined
    }

    console.log({location})
    if(location.hash.startsWith('#trends')) {
        trendsPage();
    } else if(location.hash.startsWith('#search=')) {
        searchPage();
    } else if(location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if(location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;


    if(infiniteScroll){
        window.addEventListener("scroll", infiniteScroll, {passive:false})
    }

}

function trendsPage() {
    console.log('Trends')
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');


    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive') 
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
    headerCategoryTitle.innerHTML = 'Trends'

    getTrendingMovies()

    infiniteScroll = getPageTrendingMovies;
}


function homePage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive') 
    likedMoviesSection.classList.remove('inactive');
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')

    getTrendingMoviesPreview()
    getCategoriesPreview()
    getLikedMovies();
    
}

function movieDetailsPage() {
    console.log('Movie')

    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');


    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive') 
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')
    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId)
}

function searchPage() {
    console.log('Search')
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');


    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive')
    likedMoviesSection.classList.add('inactive'); 
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_,query] = location.hash.split('=')
    getMoviesBySearch(query);
    infiniteScroll = getPaginatedMoviesBySearch(query);
}

function categoriesPage(){
    console.log('Categories')



    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');


    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive') 
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
    const [_,categoryData] = location.hash.split('=') // ['#category', 'id-name']
    const [categoryId, categoryName] = categoryData.split('-')
    const newCategoryName = decodeURI(categoryName)
    headerCategoryTitle.innerHTML = newCategoryName;
    getMoviesByCategory(categoryId);
    infiniteScroll = getPaginatedMoviesByCategory(categoryId);

}