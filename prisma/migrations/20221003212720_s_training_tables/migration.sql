-- CreateTable
CREATE TABLE "ExerciseSet"
(
    "id"        TEXT NOT NULL PRIMARY KEY,
    "start"     DECIMAL,
    "increment" DECIMAL,
    "end"       DECIMAL
);

-- CreateTable
CREATE TABLE "Exercise"
(
    "id"             TEXT NOT NULL PRIMARY KEY,
    "notes"          TEXT,
    "trainingType"   TEXT NOT NULL,
    "repeatCount"    INTEGER,
    "weight"         DECIMAL,
    "duration"       INTEGER,
    "durationUnit"   TEXT,
    "equipmentId"    TEXT NOT NULL,
    "excerciseSetId" TEXT,
    "trainingId"     TEXT NOT NULL,
    CONSTRAINT "Exercise_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Exercise_excerciseSetId_fkey" FOREIGN KEY ("excerciseSetId") REFERENCES "ExerciseSet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
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
