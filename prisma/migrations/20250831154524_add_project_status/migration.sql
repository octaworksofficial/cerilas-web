-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
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
    "status" TEXT NOT NULL DEFAULT 'Not Started',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("applications", "budget", "createdAt", "date", "description", "grants", "id", "overview", "partners", "researchTopics", "slug", "staff", "subtitle", "sustainability", "technology", "title", "universities", "updatedAt", "usp") SELECT "applications", "budget", "createdAt", "date", "description", "grants", "id", "overview", "partners", "researchTopics", "slug", "staff", "subtitle", "sustainability", "technology", "title", "universities", "updatedAt", "usp" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
