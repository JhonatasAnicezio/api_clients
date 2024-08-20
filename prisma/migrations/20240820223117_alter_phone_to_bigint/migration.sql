/*
  Warnings:

  - You are about to alter the column `phone` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_clients" ("email", "id", "name", "password", "phone", "role") SELECT "email", "id", "name", "password", "phone", "role" FROM "clients";
DROP TABLE "clients";
ALTER TABLE "new_clients" RENAME TO "clients";
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");
CREATE UNIQUE INDEX "clients_phone_key" ON "clients"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
