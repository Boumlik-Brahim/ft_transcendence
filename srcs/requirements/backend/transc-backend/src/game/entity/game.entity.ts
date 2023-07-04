export interface GameEntity {
    id : String,
    W_screen : number,
    H_screen : number,
    ball_x : number,
    ball_y : number,
    vx : number,
    radius : number,
    vy : number,
    player1 : Player,
    player2 : Player,
    w_paddle : number,
    h_paddle : number,
    playerSpeed : number,
    scoreLimit : number,
    // gameLevel? : String,
    ball_speed : number,
    gameStatus : null | 'waiting' | 'started' | 'finished' | 'canceled' | 'inThequeue';
}

export interface Player {
    id : String,
    paddleX : number,
    paddleY : number,
    score : number
}