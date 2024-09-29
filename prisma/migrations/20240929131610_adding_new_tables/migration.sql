-- CreateEnum
CREATE TYPE "AssetCategory" AS ENUM ('ANNUITY_NON_QUALIFIED', 'ANNUITY_QUALIFIED', 'BONDS', 'BROKERAGE_ACCOUNT', 'BUSINESS', 'CASH', 'COLLECTIBLE', 'CRYPTOCURRENCY', 'DEPOSIT_ACCOUNT', 'ESTATE_ACCOUNT', 'JEWELRY', 'LIFE_INSURANCE', 'LOAN', 'OTHER', 'PRECIOUS_METAL', 'REAL_ESTATE', 'REFUND', 'RETIREMENT', 'STOCKS', 'TRUST', 'VEHICLE');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('OPEN', 'CLOSED', 'TRANSFERRED');

-- CreateEnum
CREATE TYPE "AccountPlan" AS ENUM ('INDIVIDUAL', 'JOINT', 'PAYABLE_ON_DEATH', 'TRANSFERRED');

-- CreateTable
CREATE TABLE "AssetInformation" (
    "id" SERIAL NOT NULL,
    "asset_name" TEXT NOT NULL,
    "account_id" TEXT,
    "account_number" TEXT,
    "financial_institution" TEXT,
    "account_owner" TEXT,
    "current_value" DOUBLE PRECISION NOT NULL,
    "attachments" TEXT[],
    "notes" TEXT,
    "asset_category" "AssetCategory" NOT NULL,
    "distribution_id" INTEGER,
    "is_probate" BOOLEAN NOT NULL DEFAULT false,
    "sold" BOOLEAN NOT NULL DEFAULT false,
    "cost_basis" DOUBLE PRECISION,
    "task_id" INTEGER,
    "asset_location" TEXT,
    "user_id" INTEGER NOT NULL,
    "asset_contact_number" TEXT,
    "asset_contact_name" TEXT,
    "asset_contact_email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "account_status" "AccountStatus" NOT NULL DEFAULT 'OPEN',
    "account_plan" "AccountPlan" NOT NULL,

    CONSTRAINT "AssetInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstateInformation" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_initial" TEXT,
    "last_name" TEXT NOT NULL,
    "ssn" TEXT NOT NULL,
    "estate_ein" TEXT,
    "probate_case_num" TEXT,
    "residence_phone" TEXT,
    "mobile_phone" TEXT,
    "email" TEXT,
    "suffix" TEXT,
    "legal_res_street_address_1" TEXT NOT NULL,
    "legal_res_street_address_2" TEXT,
    "legal_res_city" TEXT NOT NULL,
    "legal_res_state" TEXT NOT NULL,
    "legal_res_zipcode" TEXT NOT NULL,
    "will" TEXT,
    "funeral_wishes" TEXT,
    "death_certificate" TEXT,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "date_of_death" TIMESTAMP(3),
    "death_city" TEXT,
    "death_state" TEXT,
    "death_country" TEXT,
    "birth_city" TEXT NOT NULL,
    "birth_state" TEXT NOT NULL,
    "birth_country" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstateInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distribution" (
    "id" SERIAL NOT NULL,
    "distribution_share_id" INTEGER,
    "heir_id" INTEGER NOT NULL,
    "account" TEXT,
    "share_of_distribution" DOUBLE PRECISION NOT NULL,
    "distribution_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Distribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Heir" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_initial" TEXT,
    "last_name" TEXT NOT NULL,
    "ssn" TEXT NOT NULL,
    "suffix" TEXT,
    "street_address_1" TEXT NOT NULL,
    "street_address_2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "target_percentage" DOUBLE PRECISION NOT NULL,
    "relation" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Heir_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AssetInformation" ADD CONSTRAINT "AssetInformation_distribution_id_fkey" FOREIGN KEY ("distribution_id") REFERENCES "Distribution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD CONSTRAINT "Distribution_heir_id_fkey" FOREIGN KEY ("heir_id") REFERENCES "Heir"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
