/*
  Warnings:

  - The values [ANNUITY_NON_QUALIFIED,ANNUITY_QUALIFIED,BONDS,BROKERAGE_ACCOUNT,BUSINESS,CASH,COLLECTIBLE,CRYPTOCURRENCY,DEPOSIT_ACCOUNT,ESTATE_ACCOUNT,JEWELRY,LIFE_INSURANCE,LOAN,OTHER,PRECIOUS_METAL,REAL_ESTATE,REFUND,RETIREMENT,STOCKS,TRUST,VEHICLE] on the enum `AssetCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AssetCategory_new" AS ENUM ('Checking Account', 'Savings Account', 'Certificate of Deposit', 'Money Market Account', 'IRA', 'Roth IRA', '401K', 'Roth 401K', 'Pension', 'Trust', 'Brokerage Account', 'Annuity Non-Qualified', 'Annuity Qualified', 'Bonds', 'Real Estate', 'Collectible', 'Cryptocurrency', 'Life Insurance Policy', 'Business', 'Vehicle', 'Other', 'Maps');
ALTER TABLE "AssetInformation" ALTER COLUMN "asset_category" TYPE "AssetCategory_new" USING ("asset_category"::text::"AssetCategory_new");
ALTER TYPE "AssetCategory" RENAME TO "AssetCategory_old";
ALTER TYPE "AssetCategory_new" RENAME TO "AssetCategory";
DROP TYPE "AssetCategory_old";
COMMIT;
