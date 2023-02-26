const dataLoad = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url);
    const data = await res.json()
    displayData(data.data, dataLimit)
}

const displayData = (data, dataLimit) => {
    console.log(data)


    // show all button
    const showAll = document.getElementById('show-all');
    if (dataLimit == 10 && data.length > 10) {
        data = data.slice(0, 10)
        showAll.classList.remove('d-none')
    } else {
        showAll.classList.add('d-none')
    }

    // data found message
    const mes = document.getElementById('result-mes')
    if (data.length === 0) {
        mes.classList.remove('d-none')
        spine.classList.add('d-none')

    } else {
        mes.classList.add('d-none')

    }

    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = '';

    data.forEach(phone => {



        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `

     <div class="card">
                <img src="${phone.image}" class="card-img-top mx-auto mt-2 w-50" alt="Your Phone">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick =" details('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">More Details</button>
                </div>
            </div>
    `
        cardContainer.appendChild(div)
        spine.classList.add('d-none')
    });
}
// search btn
document.getElementById('btn-search').addEventListener('click', function () {
    dataProssec(10)
})

// spin /loading data
let spine = document.getElementById('spiner')

// data prossec
const dataProssec = dataLimit => {
    const searchField = document.getElementById('search-field').value;
    spine.classList.remove('d-none')
    dataLoad(searchField, dataLimit)
}

// search by clicking enter
document.getElementById('search-field').addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        dataProssec(10)
    }
})



// show all data
document.getElementById('btn-all').addEventListener('click', function () {
    dataProssec()
})



// default value of serach field
dataLoad('apple')

const details = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayModalDe(data.data)
}

// const displayModalDe = (detail) => {
//     document.getElementById('modal-title').innerText = detail.name;
// }
const displayModalDe = (detail) => {

    document.getElementById('modal-title').innerText = detail.name;
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
    <p><b>Release Date: </b> ${detail.releaseDate}</p>
    <b>Brand: </b> ${detail.brand}
    <h5> Features: </h5>
    <p><b> ChipSet: </b> ${detail.mainFeatures ? detail.mainFeatures.chipSet : 'No Chipset Availbe'}</p>
    <p><b>display Size: </b> ${detail.mainFeatures.displaySize}<p>
    <p><b>Memory: </b> ${detail.mainFeatures.memory}<p>
    <p><b> Sensors: </b> ${detail.mainFeatures.sensors ? detail.mainFeatures.sensors.join(' , ') : 'No sensore availbe'}</p>
    <p><b> Storage: </b> ${detail.mainFeatures.storage}</p>
    `
}
