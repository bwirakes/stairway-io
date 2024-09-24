-- CreateEnum
CREATE TYPE "Project" AS ENUM ('Real Estate', 'LEGAL', 'FINANCES', 'DISTRIBUTIONS');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "project" "Project" NOT NULL DEFAULT 'LEGAL';
