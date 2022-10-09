-- CreateTable
CREATE TABLE "ExerciseSet"
(
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Exercise"
(
    "id"            TEXT    NOT NULL PRIMARY KEY,
    "notes"         TEXT             DEFAULT '',
    "weight"        INTEGER NOT NULL DEFAULT 0,
    "repeatCount"   INTEGER NOT NULL DEFAULT 0,
    "duration"      TEXT             DEFAULT '',
    "equipmentId"   TEXT    NOT NULL,
    "exerciseSetId" TEXT,
    "trainingId"    TEXT    NOT NULL,
    CONSTRAINT "Exercise_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Exercise_exerciseSetId_fkey" FOREIGN KEY ("exerciseSetId") REFERENCES "ExerciseSet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Exercise_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Training"
(
    "id"         TEXT     NOT NULL PRIMARY KEY,
    "executedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt"  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"  DATETIME NOT NULL,
    "userId"     TEXT     NOT NULL,
    CONSTRAINT "Training_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
