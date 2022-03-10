/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "books_code_key" ON "books"("code");
