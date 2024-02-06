/*
  Warnings:

  - You are about to drop the column `latitude` on the `institutions` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `institutions` table. All the data in the column will be lost.
  - Added the required column `city` to the `institutions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `institutions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `institutions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institutions" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" CHAR(2) NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
