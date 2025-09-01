-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "overview" TEXT,
    "applications" TEXT,
    "usp" TEXT,
    "technology" TEXT,
    "sustainability" TEXT,
    "researchTopics" TEXT,
    "date" TEXT,
    "grants" TEXT,
    "universities" TEXT,
    "staff" TEXT,
    "partners" TEXT,
    "budget" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
