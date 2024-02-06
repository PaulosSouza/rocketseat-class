-- CreateEnum
CREATE TYPE "SIZES" AS ENUM ('SMALL', 'STANDARD', 'BIG');

-- CreateEnum
CREATE TYPE "LEVELS" AS ENUM ('LOW', 'MODERATE', 'NORMAL', 'HIGH', 'PEAK');

-- CreateTable
CREATE TABLE "institutions" (
    "id" TEXT NOT NULL,
    "owner_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "zipCode" VARCHAR(8) NOT NULL,
    "phone_number" VARCHAR(12) NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "size" "SIZES" NOT NULL,
    "environment" "SIZES" NOT NULL,
    "energy" "LEVELS" NOT NULL,
    "autonomy" "LEVELS" NOT NULL,
    "images" TEXT[],
    "adotions_requirements" TEXT[],
    "institution_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "institutions_email_key" ON "institutions"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
