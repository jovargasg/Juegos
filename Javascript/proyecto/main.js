//Inicio variables
let uncoveredcards = 0; // Contador de cuántas cartas están actualmente descubiertas
let cards1 = null; // Elemento del DOM para la primera carta descubierta
let cards2 = null; // Elemento del DOM para la segunda carta descubierta
let firstResult = null; // Valor de la primera carta descubierta
let secondResult = null; // Valor de la segunda carta descubierta
let Movements = 0; // Contador de cuántos movimientos ha hecho el jugador
let Hits = 0; // Contador de cuántos pares de cartas coincidentes ha encontrado el jugador
let temporizador = false; // Registra si el temporizador está actualmente en funcionamiento
let timer = 30; // Tiempo restante en el juego
let timerInitial = 30; // Tiempo inicial cuando el juego comienza
let TimeRegressiveId = null; // ID del intervalo utilizado para contar hacia atrás el tiempo
let winAudio = new Audio('./sounds/win.wav'); //audio ganaste
let loseAudio = new Audio('./sounds/lose.wav'); // audio perdiste
let clickAudio = new Audio('./sounds/click.wav'); // audio click
let rigthAudio = new Audio('./sounds/rigth.wav'); //Fue correcta la seleccion 
let wrongAudio = new Audio('./sounds/wrog.wav'); //No es correcto la seleccion de pares

//Apuntando a documento HTML
let showMovements = document.getElementById('Movements');
let showHits = document.getElementById('Hits');
let showTime = document.getElementById('time-remaining');

//Generacion numeros
let number = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
number = number.sort(()=>{return Math.random()-0.5});
console.log(number);

//funciones
function contarTime(){
    TimeRegressiveId  = setInterval(()=>{
        timer--; // Decrementar el temporizador en 1 segundo
        showTime.innerHTML = `Time: ${timer} seconds`;
        if(timer == 0){
            clearInterval(TimeRegressiveId );
            blockCards();
            loseAudio.play();
        }
    },1000);
}
function blockCards(){
    for (let i = 0; i<=15; i++){
        let cardsBlocked =document.getElementById(i);
        cardsBlocked.innerHTML = `<img src="./images/${number[i]}.png" alt="">`;
        cardsBlocked.disabled = true;
    }
}

//funcion principal
function uncover(id){
    if(temporizador == false){
        contarTime();
        temporizador = true;
    }
    uncoveredcards++; //aumenta en uno
    if (uncoveredcards == 1){
        //Mostrar primer numero
        cards1 = document.getElementById(id);
        firstResult = number[id];
        cards1.innerHTML = `<img src="./images/${firstResult}.png" alt="">`;
        clickAudio.play();
        //Deshabilitar primer boton
        cards1.disabled = true;  
    }else if(uncoveredcards ==2 ){
        wrongAudio.play();
        //Mostrar segundo numero
        cards2=document.getElementById(id);
        secondResult = number[id];
        cards2.innerHTML = `<img src="./images/${secondResult}.png" alt="">`;

        //Deshabilitar segundo boton
        cards2.disabled = true;

        //Incrementar movimiento
        Movements++;
        showMovements.innerHTML = `Movements: ${Movements}`;
        
        if(firstResult == secondResult){
            //encerrar contador tarjetas destapadas
            uncoveredcards = 0;

            // Aumento aciertos
            Hits++;
            showHits.innerHTML = `Hits: ${Hits}`;
            rigthAudio.play()

        }else{
            wrongAudio.play();
            //Mostrar valores y tapar
            setTimeout(()=>{
                cards1.innerHTML = ' ';
                cards2.innerHTML = ' ';
                cards1.disabled = false; // si no son iguales
                cards2.disabled = false;
                uncoveredcards = 0; //para q se seleccione los pares
            },800); //tiempo hasta que se vuelva a tapar
        }

    }
    if(Hits == 8){
        winAudio.play();   
        clearInterval(TimeRegressiveId );
        showHits.innerHTML = `Hits: ${Hits}`
        showTime.innerHTML = `Delay ${timerInitial - timer} seconds`
        showMovements.innerHTML = `Movements: ${Movements}`//Coloca emoji o algo;
    }
}