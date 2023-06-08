/*
  Warnings:

  - Added the required column `ball_x` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ball_y` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player1_x` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player1_y` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2_x` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2_y` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "ball_x" INTEGER NOT NULL,
ADD COLUMN     "ball_y" INTEGER NOT NULL,
ADD COLUMN     "player1_x" INTEGER NOT NULL,
ADD COLUMN     "player1_y" INTEGER NOT NULL,
ADD COLUMN     "player2_x" INTEGER NOT NULL,
ADD COLUMN     "player2_y" INTEGER NOT NULL;
