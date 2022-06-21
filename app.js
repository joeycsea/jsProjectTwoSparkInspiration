// Credit to the Giphy App code-along: https://github.com/HackerYou/con-ed-javascript/blob/main/Asynchronous%20JavaScript/api-codealong.md

// When user loads the page, there should be examples of photos loaded already on the page
// When the user submits the form, we get the value they wrote in the input field
   // Add an event listener for the form submitted
   // Prevent the default submit behaviour of reloading the page
// Put the user's search input onto the page
// Use that value to make an AJAX call to the photo API and to ask for photos related to the user's input
//Once we get the data back, loop through the results and put each one on the page as an image


//Create an object to act as a namespace for our app. 
const app = {};

//Unsplash API hardcoded info:
app.key = `TT53e2r8QJZnT9bMeIzr3VgzNHD9s-hSC1s3hJgBnzE`;
app.endpoint = `https://api.unsplash.com/search/photos`;

//Cache results section from the page:
app.$results = $('.results');


// Initializer
app.init = () => {
   app.getFirstImages();

   $('form').on('submit', function(event) {
      event.preventDefault();
      const userSelection = $('select').val();
      app.getImages(userSelection);
   });
}


// Function to make an API call to Unsplash with Watercolor Painting photos already loaded on the page:
app.getFirstImages = () => {
   $.ajax({
      url: app.endpoint,
      method: 'GET',
      dataType: 'json',
      data: {
         client_id: app.key,
         query:`watercolour`,
         per_page: 16
      }
   })
      .then((response) => {
      app.displayImages(response.results);
   });
}   


// Function to make an API call to Unsplash and get us user's selected choice of images:
app.getImages = (userSearch) => {
   $.ajax({
      url: app.endpoint,
      method: 'GET',
      dataType: 'json',
      data: {
         client_id: app.key,
         query: userSearch,
         per_page: 12
      }
   })
      .then((response) => {
      app.$results.empty();
      app.displayImages(response.results);
      });
}   

// Function to take the results of API call and display them on the page:
app.displayImages = (data) => {
   data.forEach((photo) => {
      const photoHtml = `
            <div class="photo-box">
               <div class="img-box">
                  <a href="${photo.urls.raw}" target="_blank"> 
                  <img src="${photo.urls.raw}" alt="${photo.alt_description}"></a>
               </div>
            </div>
         `
      app.$results.append(photoHtml);
   });
}

// Document ready:
$(document).ready(() => {
   app.init();
});