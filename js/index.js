const loadPhone = async (searchText,isShowAll) => {
    const response = await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await response.json();
    const phones = data.data;
    displayPhones(phones,isShowAll);
}


const displayPhones = (phones,isShowAll) => {
    //1: get container div
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent="";

    // show all btn 
    const showAllBtn= document.getElementById('show-all-btn');
    if(phones.length>12 && !isShowAll){
        showAllBtn.classList.remove('hidden')
    }
    else{
        showAllBtn.classList.add('hidden')
    } 
    
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    else{

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
                        <button class="btn btn-primary">Show Details</button>
                      </div>
                    </div>`;
        // 3: append div
        phonesContainer.appendChild(phoneContainer);
    });

    toggleLoadingSpinner(false);
}


const handelSearch= (isShowAll)=>{
    const searchArea=document.getElementById('search-area');
    const searchText= searchArea.value;
    toggleLoadingSpinner(true);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner= (isLoading)=>{  
    const LoadingSpinner=document.getElementById('loading-spinner');
    if(isLoading){
        LoadingSpinner.classList.remove('hidden');
    }
    else{
        LoadingSpinner.classList.add('hidden');
    }
}

const showAll =()=>{
    handelSearch(true);
}