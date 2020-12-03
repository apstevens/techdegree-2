/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// Select the header class from the DOM

let searchLocation = document.querySelector('.header');

// Create HTML markup for search bar

let searchBtn = `
   <label for="search" class="student-search">
      <input id="search" placeholder="Search for student...">
      <button type="button"><img src="img/icn-search.svg" alt="Search student"></button>
   </label>
`;

// Add the search bar and input button

searchLocation.insertAdjacentHTML("beforeend", searchBtn);

search.addEventListener('keyup', (e) => {
   const input = e.target.value.toLowerCase();
   let results = [];

   for (let i = 0; i < data.length; i++) {
      const name = `${data[i].name.first.toLowerCase()} ${data[i].name.last.toLowerCase()}`;

      if (name.includes(input)) {
         results.push(data[i]);
      }
   };

   showPage(results, 1);
   addPagination(results);
});

let searchIcon = searchLocation.querySelector('button[type="button"]');

searchIcon.addEventListener('click', (e) => {
   const input = searchLocation.querySelector('input#search');
   const searchValue = input.value.toLowerCase();

   let results = [];

   for (let i = 0; i < data.length; i++) {
      const name = `${data[i].name.title.toLowerCase()} ${data[i].name.first.toLowerCase()} ${data[i].name.last.toLowerCase()}`;
      
      if (name.includes(searchValue)) {
         results.push(data[i])
      }
   };

   showPage(results, 1);
   addPagination(results);
});

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   const startIndex = (page * 9) - 9;

   const endIndex = page * 9;

   const student = document.querySelector('.student-list');
   
   student.innerHTML = '';

   if(list.length > 0) {
      for (let i = 0; i < list.length; i++) {
         if ( i >= startIndex && i < endIndex) {
            student.insertAdjacentHTML("beforeend", `
               <li class="student-item cf">
                  <div class="student-details">
                     <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
                     <h3>${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
                     <span class="email">${list[i].email}</span>
                  </div>
                  <div class="joined-details">
                     <span class="date">Joined ${list[i].registered.date}</span>
                  </div>
               </li>
               `);
         } 
      }
   } else {
      student.insertAdjacentHTML("beforeend", `<li class="student-item cf"><h3>Sorry, no results</h3></li>`)
   };
   
};

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   const pages = Math.ceil(list.length / 9);
   const ul = document.querySelector('.link-list');
   ul.innerHTML = '';

   for (let i = 0; i < pages.valueOf(); i++){
      ul.insertAdjacentHTML("beforeend", `<li><button type="button">${i + 1}</button><li>`);
      let first = document.querySelector('ul.link-list li:first-child button');
      first.className = 'active';
   }

   ul.addEventListener('click', (e) => {
      if(e.target.tagName == "BUTTON") {
         ul.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
      }
   });
}


// Call functions

showPage(data, 1);

addPagination(data);
