/*
  Warnings:

  - You are about to drop the column `adotions_requirements` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "adotions_requirements",
ADD COLUMN     "adoptions_requirements" TEXT[];
