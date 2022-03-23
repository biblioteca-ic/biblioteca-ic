-- AlterTable
ALTER TABLE "books" ALTER COLUMN "published_in" SET DATA TYPE DATE;

-- CreateTable
CREATE TABLE "view_books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "published_in" TIMESTAMP(3) NOT NULL,
    "publishing_house" TEXT NOT NULL,
    "authors" TEXT[],
    "categories" TEXT[],
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "copies" INTEGER NOT NULL,
    "borrowed_copies" INTEGER NOT NULL,
    "lost_copies" INTEGER NOT NULL,
    "available_copies" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "view_books_id_key" ON "view_books"("id");

-- CreateIndex
CREATE UNIQUE INDEX "view_books_code_key" ON "view_books"("code");
