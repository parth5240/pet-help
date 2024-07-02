// Load the JSON file containing pet data
fetch('pet-data.json')
  .then(response => response.json())
  .then(data => {
    // Iterate over the pet groups
    data.pets.forEach(group => {
      // Create a container div for the group
      const groupContainer = document.createElement('div');
      groupContainer.classList.add('one-line-card');
      
      // Iterate over the pets within the group
      group.pets.forEach(pet => {
        // Create a div for the pet card
        const petCard = document.createElement('div');
        petCard.classList.add('main-card', 'card-height', 'shadow-2xl');
        petCard.style.backgroundColor = '#9EC8B9';
        
        // Create HTML markup for the pet details
        const petHtml = `
          <div class="main-img">
            <div class="hv rounded-lg shadow-lg max-w-xs card-img-div">
              <a href="#">
                <img class="card-img-size" src="${pet.image}" alt="${pet.name}" />
              </a>
            </div>
          </div>
          <div class="main-text">
            <div class="p-4 flex flex-col gap-2">
              <h5 class="text_3 md:text-[40px] font-bold mb-2 text-center">${pet.name}</h5>
              <ul class="grid grid-cols-2 gap-5 text_4">
                <li class="flex gap-2 text-xl justify-self-center">
                  <img class="w-5 icon h-auto" src="../Assets/Images/${pet.species.toLowerCase()}-icon.svg" alt="${pet.species}" />
                  <span>${pet.species}</span>
                </li>
                <li class="flex text-xl justify-self-center"><span>${pet.age}</span></li>
                <li class="flex text-xl justify-self-center"><span>${pet.gender}</span></li>
                <li class="flex text-xl justify-self-center"><span>${pet.breed}</span></li>
                <li class="flex text-xl justify-self-center"><span>${pet.color}</span></li>
                <li class="flex gap-2 text-xl justify-self-center">
                  <img class="w-5 icon h-auto" src="../Assets/Images/location-icon.svg" alt="Location" />
                  <span>${pet.location}</span>
                </li>
              </ul>
              <a class="self-center" href="../pet-detail/${pet.detail_link}">
                <button type="button" class="hover-button">Adopt me</button>
              </a>
            </div>
          </div>
        `;
        
        // Set the inner HTML of the pet card
        petCard.innerHTML = petHtml;
        
        // Append the pet card to the group container
        groupContainer.appendChild(petCard);
      });
      
      // Append the group container to the section with class 'pet-card-flex'
      document.querySelector('.pet-card-flex').appendChild(groupContainer);
    });
  })
  .catch(error => console.error('Error fetching pet data:', error));
