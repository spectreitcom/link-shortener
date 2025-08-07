/*
  Warnings:

  - Added the required column `ownerId` to the `AnalyticsUrl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Vist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."AnalyticsUrl" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Vist" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "AnalyticsUrl_ownerId_idx" ON "public"."AnalyticsUrl"("ownerId");

-- CreateIndex
CREATE INDEX "AnalyticsUrl_urlId_idx" ON "public"."AnalyticsUrl"("urlId");

-- CreateIndex
CREATE INDEX "Vist_ownerId_idx" ON "public"."Vist"("ownerId");

-- CreateIndex
CREATE INDEX "Vist_urlId_idx" ON "public"."Vist"("urlId");

-- CreateIndex
CREATE INDEX "Vist_createdAt_idx" ON "public"."Vist"("createdAt");
