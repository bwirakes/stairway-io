/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TaskCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TaskCategories" DROP CONSTRAINT "_TaskCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskCategories" DROP CONSTRAINT "_TaskCategories_B_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_TaskCategories";
