-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "dateAndTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT pending,
    "treatment" TEXT NOT NULL,
    "payment" REAL NOT NULL,
    CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("dateAndTime", "doctorId", "id", "patientId", "payment", "status", "treatment") SELECT "dateAndTime", "doctorId", "id", "patientId", "payment", "status", "treatment" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
CREATE TABLE "new_Nurse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "employeedAt" TEXT NOT NULL,
    "salary" REAL NOT NULL,
    "departmentId" INTEGER NOT NULL,
    CONSTRAINT "Nurse_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Nurse" ("address", "avatar", "departmentId", "email", "employeedAt", "fullName", "id", "phoneNumber", "salary") SELECT "address", "avatar", "departmentId", "email", "employeedAt", "fullName", "id", "phoneNumber", "salary" FROM "Nurse";
DROP TABLE "Nurse";
ALTER TABLE "new_Nurse" RENAME TO "Nurse";
CREATE UNIQUE INDEX "Nurse_email_key" ON "Nurse"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
