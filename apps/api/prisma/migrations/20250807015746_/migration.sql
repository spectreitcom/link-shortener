-- AlterTable
ALTER TABLE "public"."Url" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."AnalyticsUrl" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "visitCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AnalyticsUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vist" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnalyticsUrl_urlId_key" ON "public"."AnalyticsUrl"("urlId");
