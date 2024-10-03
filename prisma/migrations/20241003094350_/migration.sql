/*
  Warnings:

  - You are about to drop the column `attachments` on the `AssetInformation` table. All the data in the column will be lost.
  - Added the required column `asset_information_id` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `asset_information_id` to the `Distribution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssetInformation" DROP COLUMN "attachments";

-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "asset_information_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Distribution" ADD COLUMN     "asset_information_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_asset_information_id_fkey" FOREIGN KEY ("asset_information_id") REFERENCES "AssetInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
