import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("rotapay.db");

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS shifts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      shift_type TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      break_minutes INTEGER DEFAULT 0,
      hourly_rate REAL DEFAULT 0,
      notes TEXT
    );
  `);

  try {
    db.execSync("ALTER TABLE settings ADD COLUMN week_start_day TEXT DEFAULT 'Monday';");
  } catch (error) { }

  try {
    db.execSync("ALTER TABLE settings ADD COLUMN pay_day TEXT DEFAULT 'Friday';");
  } catch (error) { }

  db.execSync(`
  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    default_hourly_rate REAL DEFAULT 0,
    payment_type TEXT DEFAULT 'monthly',
    custom_start_day INTEGER DEFAULT 1,
    custom_end_day INTEGER DEFAULT 31,
    default_break_minutes INTEGER DEFAULT 0,
    currency_symbol TEXT DEFAULT '£',
    currency_code TEXT DEFAULT 'GBP',
    week_start_day TEXT DEFAULT 'Monday',
    pay_day TEXT DEFAULT 'Friday'
  );
`);

  try {
  db.execSync("ALTER TABLE settings ADD COLUMN currency_symbol TEXT DEFAULT '£';");
} catch (error) {}

try {
  db.execSync("ALTER TABLE settings ADD COLUMN currency_code TEXT DEFAULT 'GBP';");
} catch (error) {}

try {
  db.execSync("ALTER TABLE settings ADD COLUMN week_start_day TEXT DEFAULT 'Monday';");
} catch (error) {}

try {
  db.execSync("ALTER TABLE settings ADD COLUMN pay_day TEXT DEFAULT 'Friday';");
} catch (error) {}
}

export function addShift(shift) {
  db.runSync(
    `INSERT INTO shifts 
    (date, shift_type, start_time, end_time, break_minutes, hourly_rate, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      shift.date,
      shift.shift_type,
      shift.start_time,
      shift.end_time,
      shift.break_minutes,
      shift.hourly_rate,
      shift.notes,
    ]
  );
}

export function getSettings() {
  const settings = db.getFirstSync("SELECT * FROM settings WHERE id = 1");

  if (!settings) {
    db.runSync(
      `INSERT INTO settings 
      (
        id,
        default_hourly_rate,
        payment_type,
        custom_start_day,
        custom_end_day,
        default_break_minutes,
        currency_symbol,
        currency_code,
        week_start_day,
        pay_day
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        1,
        0,
        "monthly",
        1,
        31,
        0,
        "£",
        "GBP",
        "Monday",
        "Friday",
      ]
    );

    return db.getFirstSync("SELECT * FROM settings WHERE id = 1");
  }

  return settings;
}

export function updateSettings(settings) {
  db.runSync(
    `UPDATE settings SET 
      default_hourly_rate = ?,
      payment_type = ?,
      custom_start_day = ?,
      custom_end_day = ?,
      default_break_minutes = ?,
      currency_symbol = ?,
      currency_code = ?,
      week_start_day = ?,
      pay_day = ?
    WHERE id = 1`,
    [
      Number(settings.default_hourly_rate),
      settings.payment_type,
      Number(settings.custom_start_day),
      Number(settings.custom_end_day),
      Number(settings.default_break_minutes),
      settings.currency_symbol,
      settings.currency_code,
      settings.week_start_day,
      settings.pay_day,
    ]
  );
}

export function deleteShift(id) {
  db.runSync("DELETE FROM shifts WHERE id = ?", [id]);
}

export function getShifts() {
  return db.getAllSync("SELECT * FROM shifts ORDER BY date ASC");
}