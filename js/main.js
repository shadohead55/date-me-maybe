const game = {
  cash: 0,
  love: 0,
  isDay: true,
  timer: 30,
  interval: null,
  playerGender: null,
  init() {
    document.getElementById('btn-male').addEventListener('click', () => this.selectGender('male'));
    document.getElementById('btn-female').addEventListener('click', () => this.selectGender('female'));
    document.getElementById('btn-care').addEventListener('click', () => this.doSelfCare());
    document.getElementById('btn-date').addEventListener('click', () => this.goOnDate());
    document.getElementById('partner-sprite').src = partnerSprite;
    this.interval = setInterval(() => this.tick(), 1000);
    this.update();
  },
  selectGender(gender) {
    this.playerGender = gender;
    document.getElementById('player-sprite').src = gender === 'male' ? maleSprite : femaleSprite;
    document.getElementById('gender-selection').style.display = 'none';
    document.getElementById('player-sprite').style.display = 'inline';
    document.getElementById('partner-sprite').style.display = 'inline';
    this.log(`You chose ${gender}.`);
    this.update();
  },
  doSelfCare() {
    if (!this.isDay) {
      this.log('Self-care only works during the day.');
      return;
    }
    this.cash += 1;
    this.love += 1;
    this.log('You practiced self-care.');
    this.update();
  },
  goOnDate() {
    if (this.isDay) {
      this.log('Dates happen at night!');
      return;
    }
    if (this.love < 10 || this.cash < 10) {
      this.log('You need at least 10 cash and 10 love.');
      return;
    }
    this.love += 5;
    this.cash -= 10;
    this.log('You had a great date!');
    this.update();
  },
  tick() {
    this.timer--;
    if (this.timer <= 0) {
      this.isDay = !this.isDay;
      this.timer = 30;
      this.log(this.isDay ? 'A new day begins.' : 'Night falls.');
      this.update();
    }
    document.getElementById('timer').textContent = `Next ${this.isDay ? 'night' : 'day'} in ${this.timer}s`;
  },
  log(message) {
    const container = document.getElementById('log');
    const line = document.createElement('div');
    line.textContent = message;
    container.prepend(line);
  },
  update() {
    document.getElementById('cash').textContent = `💵 Cash: ${this.cash}`;
    document.getElementById('love').textContent = `❤️ Love: ${this.love}`;
    document.getElementById('time-period').textContent = this.isDay ? '☀️ Daytime' : '🌙 Nighttime';
    document.getElementById('background').style.backgroundImage = `url(${this.isDay ? dayBackground : nightBackground})`;
    document.getElementById('btn-date').disabled = !(this.love >= 10 && this.cash >= 10 && !this.isDay);
  }
};

window.addEventListener('DOMContentLoaded', () => game.init());
