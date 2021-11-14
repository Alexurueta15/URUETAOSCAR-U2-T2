let contextSW = 'URUETAOSCAR-U2-T2/sw.js';
let url = window.location.href;

let player = document.getElementById('player');


let btnCamera = document.getElementById('btnCamera');
let btnCameraBack = document.getElementById('btnCameraBack');
let btnPhoto = document.getElementById('btntakePhoto');

let listPhotos = document.getElementById('listPhotos');

const camera = new Camera(player);

let photo = new Photo();

btnCamera.addEventListener('click', () => {
    console.log("click en btncamera");
    camera.on()
        .then(res => {
            if (!res) {
                alert("error al iniciar la camara en app js");
            }
            photo.type = "Frontal";
        });
});

btnCameraBack.addEventListener('click', () => {
    console.log("click en btnCameraBack");
    camera.onBack()
        .then(res => {
            if (!res) {
                alert("error al iniciar la camara trasera en app js");
            }
            photo.type = "Principal";
        });
});

btnPhoto.addEventListener('click', () => {
    console.log("click en btnPhoto");
    camera.off();
    photo.src = camera.takePhoto();
    if (photo.type === undefined) {
        console.log("aún no has abierto la cámara");
    } else {
        let bdPhotos = JSON.parse(window.localStorage.getItem('bdPhotos'));
        if (bdPhotos == null) bdPhotos = [];
        bdPhotos.push(photo);
        window.localStorage.setItem("bdPhotos", JSON.stringify(bdPhotos));
        photo = new Photo();
        findAllPhotos();
    }
});

if (navigator.serviceWorker) {
    if (url.includes('localhost')) contextSW = '/sw.js';
    navigator.serviceWorker.register(contextSW);
}

function findAllPhotos() {
    let bdPhotos = JSON.parse(window.localStorage.getItem('bdPhotos'));
    if (bdPhotos != null) {
        listPhotos.innerHTML = '';
        bdPhotos.forEach(photo => {
            listPhotos.append(getPhotoCard(photo));
        });
    }
}

function getPhotoCard(photo) {
    const div = document.createElement('div');
    div.className = "card";
    div.setAttribute("style", "width: 18rem;");
    const img = document.createElement('img');
    img.src = photo.src;
    img.className = "card-img-top";
    const divBody = document.createElement('div');
    divBody.className = "card-body";
    const h5 = document.createElement('h5');
    h5.className = "card-title text-center";
    h5.append(photo.type);
    divBody.appendChild(h5);
    div.appendChild(img);
    div.appendChild(divBody);
    return div;
}
