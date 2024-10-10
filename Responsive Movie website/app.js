const apiKey = '316079721866342b585f8a40e539e785';  // Replace with your actual API key
const trendingMoviesEndpoint = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
const searchMoviesEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

const trendingMoviesContainer = document.getElementById('trendingMovies');
const searchMoviesContainer = document.getElementById('searchMovies');
const searchSection = document.getElementById('searchSection');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const movieDetailsModal = document.getElementById('movieDetails');
const modalContent = document.querySelector('.movie-details-content');

// Function to display movies
function displayMovies(movies, container) {
    container.innerHTML = '';  // Clear previous results

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const moviePoster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'no_image.png';

        movieCard.innerHTML = `
            <img src="${moviePoster}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p><strong>Rating:</strong> ${movie.vote_average}</p>
                <p><strong>Release Date:</strong> ${movie.release_date || 'N/A'}</p>
                <p><strong>Language:</strong> ${movie.original_language || 'N/A'}</p>
            </div>
        `;

        movieCard.addEventListener('click', () => showMovieDetails(movie));  // Event to show full details on click

        container.appendChild(movieCard);
    });
}

// Function to display movie details in a modal
function showMovieDetails(movie) {
    const moviePoster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'no_image.png';

    modalContent.innerHTML = `
        <img src="${moviePoster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p><strong>Rating:</strong> ${movie.vote_average}</p>
        <p><strong>Release Date:</strong> ${movie.release_date || 'N/A'}</p>
        <p><strong>Languages:</strong> ${movie.original_language}</p>
        <p><strong>Overview:</strong> ${movie.overview || 'No overview available.'}</p>
        <button class="close-btn" onclick="closeModal()">x</button>
    `;

    document.getElementById('movieDetails').classList.add('active');  // Show modal
}


// Function to close the modal
function closeModal() {
    document.getElementById('movieDetails').classList.remove('active');  // Hide modal
}

// Fetch trending movies on page load
fetch(trendingMoviesEndpoint)
    .then(response => response.json())
    .then(data => {
        displayMovies(data.results, trendingMoviesContainer);
    })
    .catch(error => console.log('Error fetching trending movies:', error));

// Search for movies based on user input and display results on a new page
searchBtn.addEventListener('click', () => {
    const searchQuery = searchInput.value.trim();
    if (searchQuery !== '') {
        window.location.href = `index.html?q=${searchQuery}`;  // Open a new page for search results
    }
});

// Fetch search results and display them at the top of a new page
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('q');

if (searchQuery) {
    fetch(`${searchMoviesEndpoint}${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                displayMovies(data.results, searchMoviesContainer);
            } else {
                searchMoviesContainer.innerHTML = '<p>No movies found!</p>';
            }
        })
    const trend_visibility = document.getElementById('trending')
    trend_visibility.classList.add('hidden')

    const search_visibility = document.getElementById('search-results')
    search_visibility.classList.remove('hidden')
    
    .catch(error => console.log('Error searching for movies:', error));
}
