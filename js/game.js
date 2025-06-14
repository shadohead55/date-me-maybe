
let cash = 0;
let love = 0;
let isDay = true;

function updateDisplay() {
    document.getElementById("cash").textContent = `💵 Cash: ${cash}`;
    document.getElementById("love").textContent = `❤️ Love: ${love}`;
    document.getElementById("time-period").textContent = isDay ? "☀️ Daytime" : "🌙 Nighttime";
    document.getElementById("background").style.backgroundImage = isDay
        ? "url('assets/images/backgrounds/day.png')"
        : "url('assets/images/backgrounds/night.png')";

    document.getElementById("date-btn").disabled = !(love >= 10 && cash >= 10 && !isDay);
}

function doTask() {
    if (isDay) {
        cash += 1;
        love += 1;
        updateDisplay();
    }
}

function goOnDate() {
    if (!isDay && love >= 10 && cash >= 10) {
        love += 5;
        cash -= 10;
        document.getElementById("partner-sprite").style.display = "inline";
        alert("You had a great date! 💞");
        updateDisplay();
    }
}

function toggleDayNight() {
    isDay = !isDay;
    updateDisplay();
}

setInterval(toggleDayNight, 30000); // 30 seconds cycle
updateDisplay();
