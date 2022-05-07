/*
  Warnings:

  - The values [LOST] on the enum `CopyStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CopyStatus_new" AS ENUM ('AVAILABLE', 'RENTED', 'MISPLACED', 'LATE');
ALTER TABLE "book_copies" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "book_copies" ALTER COLUMN "status" TYPE "CopyStatus_new" USING ("status"::text::"CopyStatus_new");
ALTER TYPE "CopyStatus" RENAME TO "CopyStatus_old";
ALTER TYPE "CopyStatus_new" RENAME TO "CopyStatus";
DROP TYPE "CopyStatus_old";
ALTER TABLE "book_copies" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;
