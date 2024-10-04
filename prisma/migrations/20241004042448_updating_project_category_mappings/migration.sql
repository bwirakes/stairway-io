/*
  Warnings:

  - The values [LEGAL,FINANCES,DISTRIBUTIONS,ONBOARDING] on the enum `ProjectCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProjectCategory_new" AS ENUM ('Real Estate', 'Legal', 'Finances', 'Distributions', 'Onboarding');
ALTER TABLE "Project" ALTER COLUMN "projectCategory" TYPE "ProjectCategory_new" USING ("projectCategory"::text::"ProjectCategory_new");
ALTER TYPE "ProjectCategory" RENAME TO "ProjectCategory_old";
ALTER TYPE "ProjectCategory_new" RENAME TO "ProjectCategory";
DROP TYPE "ProjectCategory_old";
COMMIT;
