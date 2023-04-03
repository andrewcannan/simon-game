/**
 * @jest-environment jsdom
 */

const {game, newGame, showScore, addTurn, lightsOn} = require('../scripts/game.js')
beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test('choices contain correct keys', () =>{
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4'])
    });
});

describe('newGame works correctly', () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ['button1', 'button2'];
        game.currentGame = ['button3', 'button4'];
        document.getElementById('score').innerText = '42';
        newGame();
    });
    test('should reset score to zero', () => {
        expect(game.score).toEqual(0);
    });
    test('should clear playerMoves array', () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test('should be one element in the computer moves array', () => {
        expect(game.currentGame.length).toBe(1);
    })
    test('element with id of score should show zero', () =>{
        expect(document.getElementById('score').innerText).toEqual(0);
    });
});

describe('gameplay works correctly', () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame= [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame= [];
        game.playerMoves = [];
    });
    test('addTurn adds a new turn to the game', () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    })
    test('correct class added to element to light it up', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    })
})