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
    ball_speed : number,
    gameStatus : gameState,
    winner : null | String
}

export interface Player {
    id : String,
    inThegame : boolean,
    paddleX : number,
    paddleY : number,
    score : number
}

export interface gameState {
    update_t : number,
    status : null | 'waiting' | 'started' | 'finished' | 'canceled' | 'pause' | 'stopped';
}