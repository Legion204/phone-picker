// load phones
const loadPhone = async (searchText, isShowAll) => {
    const response = await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await response.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

// load phone data
const loadPhoneData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const phoneData = await res.json();
    const phoneSpec = phoneData.data
    phoneDetails(phoneSpec);
}
// display phones
const displayPhones = (phones, isShowAll) => {
    //1: get container div
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = "";

    // show all btn 
    const showAllBtn = document.getElementById('show-all-btn');
    if (phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden')
    }
    else {
        showAllBtn.classList.add('hidden')
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    else {

    }

    phones.forEach(phone => {
        // console.log(phone)
        // 2: create a div
        const phoneContainer = document.createElement('div');
        phoneContainer.classList = 'card w-96 bg-base-100 shadow-xl'
        phoneContainer.innerHTML = ` 
        <figure><img src=${phone.image}></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handelShowPhoneDetails('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>`;
        // 3: append div
        phonesContainer.appendChild(phoneContainer);
    });

    toggleLoadingSpinner(false);
}

// display phone details

const phoneDetails = (phoneDetails)=>{
    console.log(phoneDetails)

    const phoneName= document.getElementById('phone-name');
    const phoneDetailsContainer= document.getElementById('phone-details-container');
    phoneDetailsContainer.innerHTML=`
    <div class="flex justify-center items-center"><img src="${phoneDetails.image}" alt=""></div>
    <h3 class="font-bold text-3xl">${phoneDetails.name}</h3>
    <h4><span class="font-semibold text-xl">Storage:</span>${phoneDetails.mainFeatures.memory}</h4>
    <h4><span class="font-semibold text-xl">display Size:</span>${phoneDetails.mainFeatures?.displaySize}</h4>
    <h4><span class="font-semibold text-xl">Chipset:</span>${phoneDetails.mainFeatures?.chipSet}</h4>
    <h4><span class="font-semibold text-xl">Memory:</span>${phoneDetails.mainFeatures?.memory}</h4>
    <h4><span class="font-semibold text-xl">Release date:</span>${phoneDetails.releaseDate}</h4>
    <h4><span class="font-semibold text-xl">Sensors:</span>${phoneDetails.mainFeatures?.sensors}</h4>
    <h4><span class="font-semibold text-xl">GPS:</span>${phoneDetails?.others?.GPS || 'No'}</h4>
    <h4><span class="font-semibold text-xl">Radio:</span>${phoneDetails.others?.radio || 'No'}</h4>
    <h4><span class="font-semibold text-xl">Brande:</span>${phoneDetails.brand}</h4>

    `

    // show modal
    show_details_modal.showModal();
}

const handelSearch = (isShowAll) => {
    const searchArea = document.getElementById('search-area');
    const searchText = searchArea.value;
    toggleLoadingSpinner(true);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const LoadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        LoadingSpinner.classList.remove('hidden');
    }
    else {
        LoadingSpinner.classList.add('hidden');
    }
}

const showAll = () => {
    handelSearch(true);
};

const handelShowPhoneDetails = (id) => {
    loadPhoneData(id);
};