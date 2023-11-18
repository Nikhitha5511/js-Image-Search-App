
const accessKey='PSamZAYc_GPjgMKg9L2BpIWS0Mp7tz2jSPNZsy-iE3c';
const perPage = 10;
let page = 1;
let currentQuery = '';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const imageContainer = document.getElementById('imageContainer');
const showMoreButton = document.getElementById('showMoreButton');
const loader = document.getElementById('loader');

searchButton.addEventListener('click',()=>{
currentQuery= searchInput.value;
page=1;
imageContainer.innerHTML='';
fetchImages(currentQuery);
});

showMoreButton.addEventListener('click',()=>{
page++;
fetchImages(currentQuery);
});

function fetchImages(query){
loader.style.display='block';
showMoreButton.style.display = 'none';
fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=${accessKey}`)
.then(response=>response.json())
.then((data)=>{
  displayImages(data.results);
  loader.style.display = 'none';

})
.catch(error=>{
 console.error('Error fetching Imgaes',error);
 loader.style.display='none';
})
}

function displayImages(images) {
  images.forEach(imageData => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = imageData.urls.small;
    image.alt = imageData.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = imageData.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = imageData.alt_description;

    const saveButton = document.createElement('button');
    saveButton.innerHTML = '<i class="far fa-bookmark"></i>';
    saveButton.classList.add('save-button');
    saveButton.addEventListener('click', () => {
      saveButton.innerHTML = '<i class="fas fa-bookmark"></i>';
      saveButton.style.color = 'black';
      console.log('Save clicked for image:', imageData.id);
    });

    const favoriteButton = document.createElement('button');
    const heartIcon = document.createElement('i');
    heartIcon.classList.add('far', 'fa-heart'); 
    favoriteButton.classList.add('favorite-button');
    favoriteButton.appendChild(heartIcon);
    favoriteButton.addEventListener('click', () => {
      heartIcon.classList.remove('far');
      heartIcon.classList.add('fas', 'fa-heart');
      heartIcon.style.color = 'red';
      console.log('Favorite clicked for image:', imageData.id);
    });

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    imageWrapper.appendChild(saveButton);
    imageWrapper.appendChild(favoriteButton);
    imageContainer.appendChild(imageWrapper);

  });
     
    if (images.length === perPage) {
         showMoreButton.style.display = 'block';
       } 
    else {
         showMoreButton.style.display = 'none';
       }
 }
  
