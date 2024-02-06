/*
  Warnings:

  - You are about to drop the column `zipCode` on the `institutions` table. All the data in the column will be lost.
  - Added the required column `zip_code` to the `institutions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institutions" DROP COLUMN "zipCode",
ADD COLUMN     "zip_code" VARCHAR(8) NOT NULL;
