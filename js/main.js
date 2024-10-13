const apiKey = '220c07fb';
const searchInput = document.getElementById('search');
const resultsContainer = document.getElementById('results');

searchInput.addEventListener('input', _.debounce(() => {
    const query = searchInput.value.trim();
    if (query.length > 0) {
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
            .then(response => response.json())
            .then(data => {
                resultsContainer.innerHTML = '';
                if (data.Search) {
                    data.Search.forEach(movie => {
                        const movieElement = document.createElement('div');
                        movieElement.classList.add('movie');
                        movieElement.innerHTML = `
                                  <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}" />
                                  <h3>${movie.Title}</h3>
                                  <p>${movie.Year} (${movie.Type})</p>
                                `;
                        resultsContainer.appendChild(movieElement);
                    });
                } else {
                    resultsContainer.innerHTML = '<p>No results found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                resultsContainer.innerHTML = '<p>An error occurred. Please try again later.</p>';
            });
    } else {
        resultsContainer.innerHTML = '';
    }
}, 300));