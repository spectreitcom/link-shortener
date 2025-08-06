/*
  Warnings:

  - You are about to drop the column `shortCode` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Url_shortCode_key";

-- AlterTable
ALTER TABLE "public"."Url" DROP COLUMN "shortCode",
ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Url_code_key" ON "public"."Url"("code");
