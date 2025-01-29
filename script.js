// Global variables
let currentDate = new Date();
let selectedDate = null;
let interviews = [];

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeCalendar();
  setupEventListeners();
});

function initializeCalendar() {
  updateMonthDisplay();
  renderCalendarDays();
}

function updateMonthDisplay() {
  const monthDisplay = document.getElementById("currentMonth");
  monthDisplay.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
}

function renderCalendarDays() {
  const calendarGrid = document.getElementById("calendarGrid");
  calendarGrid.innerHTML = "";

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const today = new Date();

  // Add empty cells for days before first day of month
  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "calendar-day empty";
    calendarGrid.appendChild(emptyDay);
  }

  // Add days of month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";
    dayElement.textContent = i;

    // Check if this day is today
    if (
      today.getDate() === i &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    ) {
      dayElement.classList.add("today");
    }

    // Check if this day is selected
    if (
      selectedDate &&
      selectedDate.getDate() === i &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    ) {
      dayElement.classList.add("selected");
    }

    dayElement.addEventListener("click", () => selectDate(i));
    calendarGrid.appendChild(dayElement);
  }
}

function selectDate(day) {
  selectedDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    day
  );
  renderCalendarDays();
  updateTimeSlots();
}

function updateTimeSlots() {
  const timeSlotsContainer = document.getElementById("timeSlots");
  timeSlotsContainer.innerHTML = "";

  if (!selectedDate) return;

  // Generate time slots from 9 AM to 5 PM
  for (let hour = 9; hour < 17; hour++) {
    const timeSlot = document.createElement("div");
    timeSlot.className = "time-slot";

    const timeString = `${hour.toString().padStart(2, "0")}:00`;
    timeSlot.innerHTML = `
                    <span>${timeString}</span>
                    <i class="fas fa-chevron-right"></i>
                `;

    const isBooked = interviews.some(
      (interview) =>
        interview.date.getDate() === selectedDate.getDate() &&
        interview.date.getHours() === hour
    );

    if (isBooked) {
      timeSlot.classList.add("booked");
    } else {
      timeSlot.addEventListener("click", () => {
        alert(`Selected time slot: ${timeString}`);
        // Add your booking logic here
      });
    }

    timeSlotsContainer.appendChild(timeSlot);
  }
}

function setupEventListeners() {
  // Month navigation
  document.getElementById("prevMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    initializeCalendar();
  });

  document.getElementById("nextMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    initializeCalendar();
  });

  // Modal handling
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const loginForm = document.getElementById("loginForm");

  loginBtn.addEventListener("click", () => {
    loginModal.style.display = "block";
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = "none";
    }
  });

  // Handle login form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("Login attempted:", { email, password });
    loginModal.style.display = "none";
    loginForm.reset();
  });
}

// Initialize the calendar
initializeCalendar();
