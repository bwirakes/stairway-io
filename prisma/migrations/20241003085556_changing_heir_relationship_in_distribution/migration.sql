/*
  Warnings:

  - You are about to drop the column `heir_id` on the `Distribution` table. All the data in the column will be lost.
  - Added the required column `heirs_id` to the `Distribution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurring` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Distribution" DROP CONSTRAINT "Distribution_heir_id_fkey";

-- AlterTable
ALTER TABLE "Distribution" DROP COLUMN "heir_id",
ADD COLUMN     "heirs_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "recurring" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "_DistributionToHeir" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DistributionToHeir_AB_unique" ON "_DistributionToHeir"("A", "B");

-- CreateIndex
CREATE INDEX "_DistributionToHeir_B_index" ON "_DistributionToHeir"("B");

-- AddForeignKey
ALTER TABLE "_DistributionToHeir" ADD CONSTRAINT "_DistributionToHeir_A_fkey" FOREIGN KEY ("A") REFERENCES "Distribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DistributionToHeir" ADD CONSTRAINT "_DistributionToHeir_B_fkey" FOREIGN KEY ("B") REFERENCES "Heir"("id") ON DELETE CASCADE ON UPDATE CASCADE;
