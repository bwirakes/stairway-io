-- DropForeignKey
ALTER TABLE "AssetInformation" DROP CONSTRAINT "AssetInformation_distribution_id_fkey";

-- CreateTable
CREATE TABLE "_AssetInformationToDistribution" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AssetInformationToDistribution_AB_unique" ON "_AssetInformationToDistribution"("A", "B");

-- CreateIndex
CREATE INDEX "_AssetInformationToDistribution_B_index" ON "_AssetInformationToDistribution"("B");

-- AddForeignKey
ALTER TABLE "_AssetInformationToDistribution" ADD CONSTRAINT "_AssetInformationToDistribution_A_fkey" FOREIGN KEY ("A") REFERENCES "AssetInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssetInformationToDistribution" ADD CONSTRAINT "_AssetInformationToDistribution_B_fkey" FOREIGN KEY ("B") REFERENCES "Distribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
