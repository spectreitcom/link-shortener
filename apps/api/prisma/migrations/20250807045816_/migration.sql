/*
  Warnings:

  - You are about to drop the `Vist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Vist";

-- CreateTable
CREATE TABLE "public"."Visit" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Visit_ownerId_idx" ON "public"."Visit"("ownerId");

-- CreateIndex
CREATE INDEX "Visit_urlId_idx" ON "public"."Visit"("urlId");

-- CreateIndex
CREATE INDEX "Visit_createdAt_idx" ON "public"."Visit"("createdAt");
