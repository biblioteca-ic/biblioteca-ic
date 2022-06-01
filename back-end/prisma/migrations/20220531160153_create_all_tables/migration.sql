-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('AVAILABLE', 'LOST');

-- CreateEnum
CREATE TYPE "CopyStatus" AS ENUM ('AVAILABLE', 'RENTED', 'MISPLACED', 'LATE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "registration_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "published_in" DATE NOT NULL,
    "publishing_house" TEXT NOT NULL,
    "authors" TEXT[],
    "categories" TEXT[],
    "status" "BookStatus" NOT NULL DEFAULT E'AVAILABLE',
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_copies" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "CopyStatus" NOT NULL DEFAULT E'AVAILABLE',
    "lease_date" TIMESTAMP(3),
    "devolution_date" TIMESTAMP(3),
    "located_by" TEXT,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "book_copies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "view_books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "published_in" TEXT NOT NULL,
    "publishing_house" TEXT NOT NULL,
    "authors" TEXT[],
    "categories" TEXT[],
    "status" "BookStatus" NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "copies" INTEGER NOT NULL,
    "borrowed_copies" INTEGER NOT NULL,
    "lost_copies" INTEGER NOT NULL,
    "available_copies" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "view_rented_copies" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "book_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_registration_number_key" ON "users"("registration_number");

-- CreateIndex
CREATE UNIQUE INDEX "books_code_key" ON "books"("code");

-- CreateIndex
CREATE UNIQUE INDEX "view_books_id_key" ON "view_books"("id");

-- CreateIndex
CREATE UNIQUE INDEX "view_books_code_key" ON "view_books"("code");

-- CreateIndex
CREATE UNIQUE INDEX "view_rented_copies_book_id_key" ON "view_rented_copies"("book_id");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_copies" ADD CONSTRAINT "book_copies_located_by_fkey" FOREIGN KEY ("located_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_copies" ADD CONSTRAINT "book_copies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_copies" ADD CONSTRAINT "book_copies_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
