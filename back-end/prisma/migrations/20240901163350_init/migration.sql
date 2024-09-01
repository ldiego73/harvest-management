-- CreateTable
CREATE TABLE "Fruit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Variety" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "fruitId" TEXT NOT NULL,
    CONSTRAINT "Variety_fruitId_fkey" FOREIGN KEY ("fruitId") REFERENCES "Fruit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Harvest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fruitId" TEXT NOT NULL,
    "varietyId" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Harvest_fruitId_fkey" FOREIGN KEY ("fruitId") REFERENCES "Fruit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Harvest_varietyId_fkey" FOREIGN KEY ("varietyId") REFERENCES "Variety" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Harvest_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Harvest_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Harvest_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Farmer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Field" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    CONSTRAINT "Field_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Fruit_name_key" ON "Fruit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Variety_name_key" ON "Variety"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Variety_fruitId_name_key" ON "Variety"("fruitId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_email_key" ON "Farmer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Field_name_location_key" ON "Field"("name", "location");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
