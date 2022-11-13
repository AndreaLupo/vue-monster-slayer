function getRandomValue (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


const vue = Vue.createApp({
    data () {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null
        };
    },
    computed: {
        monsterBarStyle() {
            if(this.monsterHealth < 0 ) {
                return {width: '0%'};
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyle() {
            if(this.playerHealth < 0) {
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'};
        },
        specialAttackAvailable() {
            return this.currentRound % 3 === 0;
        }
    },
    watch: {
        playerHealth() {
            if(this.playerHealth <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if(this.playerHealth <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth() {
            if(this.monsterHealth <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if(this.monsterHealth <= 0) {
                this.winner = 'player';
            }
        }
    },
    methods: {
        attackMonster () {
            this.currentRound++;
            const damage = getRandomValue(5, 12);
            this.monsterHealth -= damage;
            this.attackPlayer();
        },
        attackPlayer () {
            const damage = getRandomValue(8, 15);
            this.playerHealth -= damage;
        },
        specialAttackMonster () {
            this.currentRound++;
            const damage = getRandomValue(10, 25);
            this.monsterHealth -= damage;
            this.attackPlayer();
        },
        healPlayer () {
            this.currentRound++;
            const heal = getRandomValue(8, 20);
            if(this.playerHealth + heal < 100) {
                this.playerHealth += heal;
            } else {
                this.playerHealth = 100;
            }
            this.attackPlayer();
        },
        startNewGame () {
            this.currentRound = 0;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
        },
        surrender () {
            this.winner = 'monster';
        }
    }
});
vue.mount('#game');