var arrayrandommovie = ['mulan', 'Wonder Woman', 'Aves de Presa'];
var numberrandom = Math.floor((Math.random() * arrayrandommovie.length - 1) + 1);
var randommovie = arrayrandommovie[numberrandom];
var e = 0;
console.log(10 % 5);
var se = 'batman';
var pag = 10;
var f = 1;
firebase.initializeApp({
    apiKey: "AIzaSyBvWAwkse4Vh_QABLtfwsj2GJLBtrzy8co",
    authDomain: "almac-ff6a4.firebaseapp.com",
    projectId: "almac-ff6a4"
});

var db = firebase.firestore();

function buscarPopup() {


    var s = document.getElementById('txtsearch').value;
    console.log(s);
    if (s !== null) {
        e = 0;
        f = 1;
        se = s;
        document.getElementById('pt').innerHTML = e + "  " + f;
        apiCall();
    }

}
let un;

function savePopup() {

    console.log(un);

    db.collection("/Usuarios/1/Peliculas").add({
            Nombre: un

        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });


}

function apiCall() {

    $.getJSON('https://www.omdbapi.com/?i=tt3896198&apikey=f1d6c99&s=' + se + '&page=' + f).then(function(response) {

            console.log(response.Search);
            console.log(response.Search[e].Released);

            var image = response.Search[e].Poster;

            add(response.Search[e].imdbID);

        }

    );



}


function abrirPopup() {

    if (e < pag - 1) {
        e += 1;
        document.getElementById('pt').innerHTML = e + "  " + f;
        console.log(e);
        console.log(pag);
        apiCall();
    } else {
        f = f + 1;
        e = 0;
        apiCall();
    }
}

function cerrarPopup() {

    if (e < pag - 1 && e >= 1) {
        e -= 1;
        document.getElementById('pt').innerHTML = e + "  " + f;
        console.log(e);
        console.log(pag);
        apiCall();
    } else {

        f = f - 1;
        e = 0;
        apiCall();
    }
}

function add(id_imdb) {
    $.getJSON('https://www.omdbapi.com/?i=' + id_imdb + '&apikey=f1d6c99').then(function(response) {

            console.log(response);


            var image = response.Poster;

            $('img').attr('src', image);
            un = response.Title;
            document.getElementById('cont1').innerHTML = response.Title;
            document.getElementById('anio').innerHTML = response.Year + "  " + response.Released;
            document.getElementById('descripcion').innerHTML = response.Plot;

        }

    );
}

apiCall();