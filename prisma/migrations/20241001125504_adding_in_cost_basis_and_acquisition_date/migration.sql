/*
  Warnings:

  - Added the required column `acquisition_date` to the `AssetInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost_basis` to the `AssetInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssetInformation" ADD COLUMN     "acquisition_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "cost_basis" DOUBLE PRECISION NOT NULL;
