/* 
  아래에 코드를 작성해주세요.
*/

// const fetchAlbums = function (page=1, limit=10) {
//   alert('확인!')
// }
const URL = 'http://ws.audioscrobbler.com/2.0/?method=album.search&&api_key=YOUR_API_KEY&format=json'
let page = 1
const fetchAlbums = function (page=1, limit=10) {
  const keyword = document.querySelector('.search-box__input').value
  const resultBox = document.querySelector('.search-result')
  
  axios({
    method : 'get',
    url : URL,
    params : {
      api_key : '67b3463e72ca050df806f54ef953afcf',
      album : keyword,
      page : page,
      limit : limit,
    }
  })
  .then((response) => {
    const albums = response.data.results.albummatches.album
    resultBox.innerHTML = ''
    
    for (const album of albums) {

      const box = document.createElement('div')
      box.classList.add('search-result__card')

      const imgTag = document.createElement('img')
      imgTag.setAttribute('src', album.image[2]['#text'])
      box.appendChild(imgTag)

      const nameBox = document.createElement('div')
      nameBox.classList.add('search-result__text')

      const artist = document.createElement('h2')
      artist.textContent = album.artist
      nameBox.appendChild(artist)

      const title = document.createElement('p')
      title.textContent = album.name
      nameBox.appendChild(title)

      box.appendChild(nameBox)
      resultBox.appendChild(box)
    }
    })
  .catch((error) => {
    alert('잠시 후 다시 시도해주세요')
  })
}

// const inputTag = document.querySelector('.search-box__input')
const searchBtn = document.querySelector('.search-box__button')
searchBtn.addEventListener('click', () => {
  page = 1
  fetchAlbums()
})
window.addEventListener('scroll', () => {
  // 문서 전체 높이
  const documentHeight = document.documentElement.scrollHeight;
  // 현재 스크롤 위치 + 뷰포트 높이
  const windowHeight = window.innerHeight;
  const scrollPosition = window.scrollY;

  // 스크롤이 최하단에 도달했는지 확인
  if (scrollPosition + windowHeight >= documentHeight) {
      page += 1
      // 여기서 원하는 이벤트를 처리합니다.
      fetchAlbums(page, 10)
  }
});
