//Author: Ing(c) Anderson Adarve Valencia
//primer Bootcamp "piscina-42" UTP sobre fullstack
//date 2023-01-13
//technologic University of Pereira

let cardContainer = document.querySelector('.cardContainer'); // card container
generateCards(); // function that generate of cards

let children = Array.from(document.querySelectorAll('.child2'));  // back-face of card
let parentContainer = Array.from(document.querySelectorAll('.parentContainer')); // This contains back and front face of card
let arrayImage = ['imagenes/parejas-001.png','imagenes/parejas-001.png','imagenes/parejas-002.png', 'imagenes/parejas-002.png','imagenes/parejas-003.png','imagenes/parejas-003.png','imagenes/parejas-004.png','imagenes/parejas-004.png','imagenes/parejas-005.png','imagenes/parejas-005.png','imagenes/parejas-006.png','imagenes/parejas-006.png','imagenes/parejas-007.png','imagenes/parejas-007.png','imagenes/parejas-008.png','imagenes/parejas-008.png']; // directions of images for cards
let arrayShuffle = []; // array for card shuffle
let arrayNames = ['maria','jose', 'melchor', 'baltazar', 'gaspar', 'dios', 'mula', 'pastor']; // array for names of each pair
let arrayAudio = ['.audioMaria','.audioJose','.audioMelchor','.audioBaltazar', '.audioGaspar','.audioJesus', '.audioMula', '.audioPastor'];
let arrayNumber = [4,5,2,1,3,6,7,8]; // array for position of each image on html
let arrayInformation = ['La primera celebración navideña en la que se montó un pesebre para la conmemoración del nacimiento de Jesús, fue en la nochebuena del año 1223, realizada por San Francisco de Asís.', 'En Ecuador, México, Colombia, Guatemala, El Salvador, Venezuela, Perú, Argentina, Chile y Canarias,  la figura del Niño Jesús se coloca después de la llegada de la Navidad.', 'El villancico es un género de canción cuya letra hace referencia a la Navidad.', 'A la nanita nana es un villancico compuesto por Jeremías Quintero, oriundo de Barbacoas, Nariño.', 'La palabra Tutaina es utilizada en Perú para referirse coloquialmente a una fiesta pequeña, por lo que el título de este villancico se refiere a la celebración de la tradicional novena de aguinaldos.','El villancico es un género de canción cuya letra hace referencia a la Navidad.', 'En las posadas, cada uno de los nueve días representa un valor, como humildad, fortaleza, desapego, caridad, confianza, justicia, pureza, alegría y generosidad.','A las novenas se les llama “Las Posadas” y  son fiestas populares en México, Honduras, Guatemala, El Salvador, Costa Rica, Nicaragua y Panamá.'] // array for each phrase of pairs
randomImage(); // this function random images on the array
insertImage(); // this function insert images on html

let clickCount = true, block = true, firstClass = 0, secondClass = 0, firstParent = 0, secondParent = 0, countPairs = 0; //son valores booleanos y contadores con los cuales podremos cambiar el camino en la ejecucuion del codigo
let grandpaModal = document.querySelector('.grandpaContainerPop'); // Container of modal pesebre
let button = document.querySelector('.beginButton'); // button intro modal
let modal = document.querySelector('.containerIntro'); // container modal intro
let body = document.querySelector('body'); // body of html
let background = document.querySelector('.backgroundModal'); // background modal intro
let arrayCover = Array.from(document.querySelectorAll('.grandpaContainerPop .containerPop .containerPuzzle .containerImage img')); // every image of pesebre cover
let buttonModalCover = document.querySelector('.buttonModal'); // button of pesebre modal
let paragraphModal = document.querySelector('.paragraphModal'); // paragraph of pesebre modal
let footerModal = document.querySelector('.containerIconsGameOver'); // footer end modal
let titleModal = document.querySelector('.grandpaContainerPop .containerPop .containerPuzzle .containerText h1'); //titutlo del modal 
let reload = false;//booleano que usaremos para saber cuando se encontraron las 8 parejas

// game memorama
parentContainer.forEach((card)=>{ //esta funcion permite controlar que tarjeta fue tocada, si la primera o la segunda carta y saber si ya fue abierta o si ya fue descubierta la pareja
  card.addEventListener('click',() =>{
    if(block){// sirve para bloquear el click y que no se pueda clikear otra mientras se voltean las cartas
      if(clickCount){ // se pregunta si block devuelve un true para saber si la carta ya fue elegida antes, ya que en el momento de seleccionar una carta se le a cambia el valor booleano a esta variable
        if(!card.classList.contains('pair')){ //se ptregunta si la carta contiene la clase pair, ya que cuando se encuentra una pareja esas cartas reciben la clase pair
          functionClick1(card); //en caso de que no se haya abierto ya esa carta, se le permite seleccionarla
        }
      }else if(!clickCount){//en este caso es para el segundo click ya que el primero ya actuo
          if(!card.classList.contains('click')){//se pregunta si tiene esta clase para saber si ya se le dio click
              if(!card.classList.contains('pair')){//se pregunta para saber si ya no fue encontrada
                functionClick2(card);//se llama a la funcion para dar el segundo click
                setTimeout(() => {
                  if(firstClass == secondClass){//estas dos variables contienen el trozo de javascript de la primera y segunda carta tocada y las compara para saber si son iguales
                    processComparing();//llama a la funcion para cambiar las propiedades de las cartas
                    let audioCorrecta = document.querySelector('.audioCorrecta');//toma el audio del html
                    audioCorrecta.play();//reproduce el audio
                  }else{
                      removeClass();//en caso de que las dos cartas fueran diferentes se llama a la funcion removeClass para quitar las clases agregadas durante el proceso del juego
                  }
                  block = !block;//se desbloquea el click para otras tarjetas
              },800);
              clickCount = !clickCount; //se vuelve a cambiar para saber que es el primer click
              }

          }
        }
    }
  })
})

// Event for modal pesebre button
buttonModalCover.addEventListener('click', () => { //esta funcion permite volver al juego despues de colocar el modal del pesebre
  if(!buttonModalCover.classList.contains('gameOver')){//se pregunta si contiene la clase gameOver para saber si es la ultima imagen ya que el boton cambia si es la ultima
    grandpaModal.classList.add('grandpaHidden');//se le agrega esta clase para quitar el modal
    body.classList.remove('overflow');
    audioCard.pause()//se pausa el audio en curso
  }else{
    if(!reload){
      audioCard.pause();
      let endAudio = document.querySelector('.audioFinal'); //se extrae el sonido del html
      endAudio.play();//se reprouce el audio final
      footerModal.classList.remove('hidden');//es el final del juego por lo que quita una clase para que aparezca el footer del modal final
      buttonModalCover.textContent = 'Repetir';//cambia el texto del boton
      paragraphModal.textContent = 'Y junto con la esperanza de la llegada del Niño Dios te deseamos de todo corazón que ese regalo que tanto has anhelado llegue a ti en esta navidad.' //se ingresa la frase del final
      titleModal.classList.add('propiety')//se agrga esta clase para poder cambiar el tamaño de la fuente del titulo
      titleModal.textContent = 'Armaste tu pesebre'//el titulo cambia
      reload = true;
    }else{
      location.reload();
    }
  }
})

// Event for modal intro button
button.addEventListener('click', () => { //funcion para darle funcionalidad al boton del comienzo del juego
  modal.classList.add('hidden');
  body.classList.remove('overflow');
  background.classList.add('hidden');
  let audio = document.querySelector('.intro');
  audio.play();
})

// function: removing class
function removeClass(){ //funcion para remover clases cuando dos cartas no son iguales
  secondParent.classList.remove('rotation');
  firstParent.classList.remove('rotation');
  firstParent.classList.remove('click');
  secondParent.classList.remove('click');
  let audioIncorrecta = document.querySelector('.audioIncorrecta')
  audioIncorrecta.play();
}

// function: processs for comparing pairs
function processComparing(){
  firstParent.classList.add('pair');//se les da la clase pair para saber que ya fue encontrada esta pareja
  secondParent.classList.add('pair');
  countPairs++;// se aumenta el numero de pares hechos
  if(countPairs != 8){ //se ejecuta cuando no hayan terminado las parejas
    body.classList.add('overflow');//desactiva el scroll
    window.scroll(0,0)//lleva la pantalla hacia arriba
    grandpaModal.classList.remove('grandpaHidden');//se muestra el modal del pesebre
    for(let i = 0; i < 8; i++){ //busca en bucle hasta que contenga la clase con el nombre correspondiente dentro del array 
      if(firstParent.classList.contains(arrayNames[i])){
        audioCard = document.querySelector(arrayAudio[i]);//pone el audio con respecto al a la clae de la carta
        audioCard.play();
        paragraphModal.textContent = arrayInformation[i];
        setTimeout(()=>{
          setTimeout(()=>{arrayCover[arrayNumber[i]].classList.add('hidden');},2000);
          arrayCover[arrayNumber[i]].classList.add('fall');
        },2000);
        arrayCover[arrayNumber[i]].classList.add('vibration');
      }
    }
  }else{ //es para cuando sea el ultimo par
    body.classList.add('overflow');
    window.scroll(0,0)
    grandpaModal.classList.remove('grandpaHidden');
    for(let i = 0; i < 8; i++){//busca el nombre correspondiente dentro del array 
      if(firstParent.classList.contains(arrayNames[i])){
        audioCard = document.querySelector(arrayAudio[i]);
        audioCard.play();
        paragraphModal.textContent = arrayInformation[i];
        setTimeout(()=>{
          setTimeout(()=>{arrayCover[arrayNumber[i]].classList.add('hidden');},2000);
          arrayCover[arrayNumber[i]].classList.add('fall');
        },2000);
        arrayCover[arrayNumber[i]].classList.add('vibration');
      }
    }
    buttonModalCover.classList.add('gameOver');//se le agrega esta clase para que cuando se le de click al boton vaya a al ultimo modal
    buttonModalCover.textContent = 'Finalizar';//cabia el texto dentro del boton
  }
}

// function: second click
function functionClick2(card){ //se le agregan las clases a la carta para poder continuar con el juego
  secondClass = Array.from(card.childNodes)[1].outerHTML;
    secondParent = card;
    card.classList.add('rotation');
    block = !block;
}

// function: first click
function functionClick1(card){ //se le agregan las clases a la carta para poder continuar con el jue
  card.classList.add('rotation');
  card.classList.add('click');
  firstClass = Array.from(card.childNodes)[1].outerHTML;
  firstParent = card;
  clickCount = !clickCount;
}

// function: insertion images in child2
function insertImage(){
    let contador = 0;
    while(contador < 16){
        let newImage = document.createElement('img');
        newImage.setAttribute('src',arrayShuffle[contador]);
        newImage.setAttribute('Alt','image');
        children[contador].appendChild(newImage);//se ingresa el elemento imagen dentro del children 
        if('imagenes/parejas-001.png' == arrayShuffle[contador]){ //compara el nombre de la imagen dentro del array y si coincide ingresa esa imagen dentro de esa posicion
            children[contador].parentNode.classList.add('maria');
          }else if('imagenes/parejas-002.png' == arrayShuffle[contador]){
            children[contador].parentNode.classList.add('jose');
          }else if('imagenes/parejas-003.png' == arrayShuffle[contador]){
            children[contador].parentNode.classList.add('dios');
          }else if('imagenes/parejas-004.png' == arrayShuffle[contador]){
            children[contador].parentNode.classList.add('melchor');
          }else if('imagenes/parejas-005.png' == arrayShuffle[contador]){
            children[contador].parentNode.classList.add('gaspar');
          }else if('imagenes/parejas-006.png' == arrayShuffle[contador]){
            children[contador].parentNode.classList.add('baltazar');
          }else if('imagenes/parejas-007.png' == arrayShuffle[contador]){
            children[contador].parentNode.classList.add('pastor');
          }else if('imagenes/parejas-008.png' == arrayShuffle[contador]){
            children[contador].parentNode.classList.add('mula');
          }
        contador++;
    }
}

// function: loop of random image
function randomImage(){//crea el array random 
    let contador = 0;
    while(contador < 16){
        let random = Math.trunc(Math.random()*16);
        if(arrayImage[random] != 0){
          contador++;
          arrayShuffle.push(arrayImage[random]);
          arrayImage[random] = 0;
        } 
    }
}

// function: generation of cards
function generateCards(){ //genera los div para contener las cartas, las cartas y las parte trasera de la carta
    for(let i = 0; i < 16; i++){
        let grandpa = document.createElement('div');
        grandpa.classList.add('grandpaContainer');
        let parent = document.createElement('div');
        parent.classList.add('parentContainer');
        let child1 = document.createElement('div');
        child1.classList.add('child1');
        let img = document.createElement('img');
        img.setAttribute('src','imagenes/tarjeta_cubierta.png');
        img.setAttribute('Alt', 'image');
        img.classList.add('card');
        child1.appendChild(img);
        let child2 = document.createElement('div');
        child2.classList.add('child2');
        parent.appendChild(child1);
        parent.appendChild(child2);
        grandpa.appendChild(parent);
        cardContainer.appendChild(grandpa);
    }
} 

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
