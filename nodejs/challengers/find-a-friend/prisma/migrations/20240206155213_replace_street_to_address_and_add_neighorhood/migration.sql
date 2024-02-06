/*
  Warnings:

  - You are about to drop the column `street` on the `institutions` table. All the data in the column will be lost.
  - Added the required column `address` to the `institutions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_number` to the `institutions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `institutions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institutions" DROP COLUMN "street",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "address_number" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL;
