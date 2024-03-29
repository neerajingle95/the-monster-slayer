new Vue({
  el: "#app",

  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },

  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },

    attack: function(e) {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster for " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
      e.target.blur();
    },

    specialAttack: function(e) {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster hard for " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
      e.target.blur();
    },

    heal: function(e) {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player heals for 10"
      });
      this.monsterAttacks();
      e.target.blur();
    },

    giveUp: function() {
      this.gameIsRunning = false;
    },

    monsterAttacks: function() {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits Player for " + damage
      });
      this.checkWin();
    },

    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },

    checkWin: function() {
      if (this.monsterHealth <= 0) {
        this.monsterHealth = 0;
        this.msg("won!");
      } else if (this.playerHealth <= 0) {
        this.playerHealth = 0;
        this.msg("lost!");
      }
    },

    msg(text) {
      setTimeout(
        function() {
          if (confirm("You " + text + " Start new game?")) {
            this.startGame();
          } else {
            this.gameIsRunning = false;
          }
        }.bind(this),
        500
      );
    }
  }
});
