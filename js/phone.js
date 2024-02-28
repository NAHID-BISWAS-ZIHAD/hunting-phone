const loadPhone = async (inputText = "13", showAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`);
    const data = await res.json();
    const phone = data.data;
    myPhone(phone, showAll);
}

const myPhone = (phones, showAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('all-load-container');
    if (phones.length > 12 && !showAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    if (!showAll) {
        phones = phones.slice(0, 10);
    }
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
                            alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>Yes This is iPhone</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    spinnerHandler(false);
}

const buttonHandle = (showAll) => {
    spinnerHandler(true);
    const inputSearch = document.getElementById('input-search');
    const inputText = inputSearch.value;
    loadPhone(inputText, showAll);

}

const spinnerHandler = (isTrue) => {
    const spinnerContainer = document.getElementById('spinner-container');

    if (isTrue) {
        spinnerContainer.classList.remove('hidden');
    }
    else {
        spinnerContainer.classList.add('hidden');
    }
}

// show details container

const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showDetailsModalHandler(phone);
}

const showDetailsModalHandler = phone => {
    // console.log(phone);
    show_details_modal.showModal();
    
    const showDetails = document.getElementById('show-details-phone');
    showDetails.classList.add('space-y-6')
    showDetails.innerHTML = `
    <img src="${phone.image}" alt="">
    <h3 class="font-bold text-lg">${phone.name}</h3>
    <p class="font-medium">Storage: ${phone.mainFeatures.storage}</p>
    <p class="font-medium">Display Size: ${phone.mainFeatures.displaySize}</p>
    <p class="font-medium">Chipset: ${phone.mainFeatures.chipSet}</p>
    <p class="font-medium">Memory: ${phone.mainFeatures.memory}</p>
    <p class="font-medium">Slug: ${phone.slug}</p>
    <p class="font-medium">Release Date: ${phone.releaseDate}</p>
    <p class="font-medium">Brand: ${phone.brand}</p>
    <p class="font-medium">GPS: ${phone?.others?.GPS}</p>
    `;
}

const showAll = () => {
    buttonHandle(true);
}

loadPhone();