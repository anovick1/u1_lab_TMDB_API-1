const API_KEY = '7056f01dd7a8a997d1529fee50e387a1'
const DOMAIN = 'https://api.themoviedb.org/3'
const IMAGE_BASE_PATH = 'https://image.tmdb.org/t/p/original'
const input = document.querySelector('#search-input')
const button = document.querySelector('#search')
const movieList = document.querySelector('.movie-list')
const movieInfo = document.querySelector('.more-info')

function renderList(movie) {
  for (let i = 0; i < movie.data.results.length; i++) {
    let div = document.createElement('div')
    div.className = 'movie'
    div.style.margin = '50px'
    movieList.appendChild(div)
    let title = document.createElement('h1')
    let poster = document.createElement('img')
    let view = document.createElement('button')

    poster.src = IMAGE_BASE_PATH + movie.data.results[i].poster_path
    div.append(poster)

    title.innerHTML = movie.data.results[i].original_title
    div.append(title)

    view.innerHTML = 'View More Info'
    div.append(view)

    view.addEventListener('click', async () => {
      movieInfo.innerHTML = ''
      let info = document.createElement('h1')
      info.className = 'info'
      info.style.borderBottom = 'solid white 2px'
      info.innerHTML =
        '<span>Title:</span> ' +
        title.innerText +
        '<br/><span>Release Date:</span>  ' +
        movie.data.results[i].release_date +
        '<br/><span>Movie Score:</span>  ' +
        movie.data.results[i].vote_average +
        '<br/><span>Overview:</span>  ' +
        movie.data.results[i].overview +
        '<br/><br/>'
      movieInfo.append(info)
    })
  }
}
button.addEventListener('click', async () => {
  movieList.innerHTML = ''
  movieInfo.innerHTML = ''
  let movie = await axios.get(
    'https://api.themoviedb.org/3/search/movie?query=' +
      input.value +
      '&api_key=' +
      API_KEY
  )
  renderList(movie)
})
