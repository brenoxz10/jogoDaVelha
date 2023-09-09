const tabuleiro = document.querySelectorAll(".cells"); // pego todas celulas para juntar em um so elemento
let player;

const game = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]; // condições para ganhar o jogo

const scores = {
    X: [],
    O: [],
}; // pontuação de cada jogador

tabuleiro.forEach((el) => {
    el.addEventListener("click", manageBoard); // chamo a função sem paretenses pois vou usar o EVENT(e) que funcionara como o elemento que quero fazer as mudanças, fiz isso pois mais a frente poderei usar o removeEventListener
})

function manageBoard(e) {
    player = player === "X" ? "O" : "X"; // uso ternario para definir o valor inicial de player como "X" e apartir da proxima iteração vai ficar alternando
    e.target.innerText = player; 
    scores[player].push(e.target.getAttribute("data-i")); // pego valor data-i que coloquei no elemento que foi clicado e coloco ele no scores do respectivo player
    e.target.removeEventListener("click", manageBoard);
    gameState();
}

function gameState() {
    game.forEach((el) => {
        if (el.every(i => scores[player].includes(String(i)))) { // aqui eu basicamente faço um FOR OF no array que representa as condições de vitoria, e entao eu boto a condição "every" que retornara true caso o scores do player inclua todos os numeros de um dos elementos do array game.
            tabuleiro.forEach(el => el.removeEventListener("click", manageBoard)); // remove o click de todos elementos para que o jogo acabe e as pessoas nao consigam continuar clicando enquanto o timeout esta preperando
            setTimeout(() => {
                alert(`Player ${player} won! `);
                location.reload()
                return;
            }, 500) // esse timeout so serve para funções esteticas visto que a unica coisa que muda é o tempo de delay que tera para mostrar o vencedor e dar reload na pagina.
        }
    })
    scores["X"].length + scores["O"].length === 9 ? location.reload() : null; // caso todos os quadrados sejam clicados e nao tenha vitoria de nenhum dos jogadores, o jogo dara reload automatico
}
