export function calculateShiftPay(shift) {
  const start = shift.start_time.split(":");
  const end = shift.end_time.split(":");

  const startHour = Number(start[0]);
  const startMinute = Number(start[1]);

  const endHour = Number(end[0]);
  const endMinute = Number(end[1]);

  let startTotalMinutes = startHour * 60 + startMinute;
  let endTotalMinutes = endHour * 60 + endMinute;

  if (endTotalMinutes <= startTotalMinutes) {
    endTotalMinutes += 24 * 60;
  }

  const totalMinutes = endTotalMinutes - startTotalMinutes;
  const paidMinutes = totalMinutes - Number(shift.break_minutes || 0);
  const paidHours = paidMinutes / 60;

  const pay = paidHours * Number(shift.hourly_rate || 0);

  return {
    totalHours: totalMinutes / 60,
    paidHours,
    pay,
  };
}

export function calculateTotalPay(shifts) {
  let total = 0;

  shifts.forEach((shift) => {
    const result = calculateShiftPay(shift);
    total += result.pay;
  });

  return total;
}

export function filterShiftsByPeriod(shifts, settings, selectedDate) {
  if (!settings) return shifts;

  const period = getPayPeriod(settings, selectedDate);

  return shifts.filter((shift) => {
    const shiftDate = new Date(shift.date);
    return shiftDate >= period.startDate && shiftDate <= period.endDate;
  });
}

export function getPayPeriod(settings, selectedDate) {
  const currentDate = selectedDate ? new Date(selectedDate) : new Date();

  if (settings.payment_type === "weekly") {
  const days = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const weekStart = days[settings.week_start_day || "Monday"];

  const current = new Date(currentDate);
  current.setHours(0, 0, 0, 0);

  const currentDay = current.getDay();

  let diff = currentDay - weekStart;

  if (diff < 0) {
    diff += 7;
  }

  const startDate = new Date(current);
  startDate.setDate(current.getDate() - diff);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  return { startDate, endDate };
}


  if (settings.payment_type === "monthly") {
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    return { startDate, endDate };
  }

  if (settings.payment_type === "custom") {
    const startDay = Number(settings.custom_start_day);
    const endDay = Number(settings.custom_end_day);

    let startDate;
    let endDate;

    if (currentDate.getDate() >= startDay) {
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        startDay
      );

      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        endDay
      );
    } else {
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        startDay
      );

      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        endDay
      );
    }

    return { startDate, endDate };
  }

  return {
    startDate: new Date("2000-01-01"),
    endDate: new Date("2100-12-31"),
  };
}