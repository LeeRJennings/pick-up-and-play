# Pick Up & Play

Pick Up & Play is a web app for Ultimate Frisbee enthusiasts in the greater Nashville area. The Nashville Ultimate community currently uses 3 to 4 threads in the app GroupMe to plan and coordinate pick-up games. It can become confusing navigating through multiple threads and on-going conversations to find a game in your area, or on a specific date. Pick Up & Play provides users with a simple way to create and see any upcoming games, filter those games by different criteria, and even record their stats for previous games.

## Technologies
- HTML/CSS
- Javascript
- React
- JSON server
- ERD with drawSQL
- Canva
- Postman/Thunder Client
- Git/GitHub

## Run Locally

Clone the project

```bash
  git clone https://github.com/LeeRJennings/pick-up-and-play
```

Go to the API directory

```bash
  cd pick-up-and-play/api
```
Host the API

```bash
  json-server -p 1968 -w database.json
```
Go to the project directory

```bash
  cd ..
```

Install dependencies

```bash
  npm install
```

Host the project

```bash
  npm start
```

## Navigating Pick Up & Play

Upon serving to the correct hosts through your browser, you will be prompted to sign in or register as a new user. You may create a new account or sign in using an already existing user account. 

An already existing user account is `lee@nss.com`.

Once logged in you will be navigated to the main view which shows all games that are upcoming or on today's date. From this view you can press the "PLAYING" button on each game to indicate that you are planning on attending that game. Once pressed the player count for that game will update and the button will be replaced with a "CAN'T PLAY" button in case you can no longer attend that game. You can also filter the games by either area, skill level, or date using the dropdowns or date picker at the top of the page. Pressing the "SEE ALL GAMES" button will reset the view to show all upcoming games again. Provided that you have created a game, you will be presented with buttons to both edit or delete existing games.

Using the "Upcoming" and "Past" dropdown menus in the nav bar at the top of the screen you can navigate to different views showing you either all games or just your games. The "My Games" view shows you only games you have created with games by other users you've liked displayed below. There is also a dropdown menu to select other users, and see their created and liked games.  The views for past games are identical to the upcoming games views except they only show games that have previously happened.

All views have an "ADD GAME" button at the top which will navigate you to a form to create a new game.

Provided a game is on today's date or has already happened, and you have liked that game, you will be presented with a "RECORD STATS" button. This button will navigate you to a form used to record your stats for that particular game. Once stats have been recorded for a game you will be presented with a "SEE STATS" button that triggers a window showing the stats for that game, and allowing you to edit or delete those stats.

## Screenshots

![App Screenshot](/public/images/readme1.png)

![App Screenshot](/public/images/readme2.png)

![App Screenshot](/public/images/readme4.png)

## Planning

### Entity Relationship Diagram

![Pick Up & Play ERD ](/public/images/erd.png)

### Initial wireframes

![Main View Wireframe](/public/images/MainView.jpg)
![Game Card Wireframe](/public/images/GameCard.jpg)
![Game Form Wireframe](/public/images/updated-game-form.jpg)

## Favorite Code Snippet

```js
const getArrayToSetMyLikedGames = () => {
    let usersLikedGames = []
    getAllUpcomingGames()
    .then(everyGame => {
        getLikesByUserId(userId)
        .then(usersLikes => {
            for (const like of usersLikes) {
                const likedGame = everyGame.find(game => game.id === like.gameId)
                if (likedGame !== undefined) {
                    usersLikedGames.push(likedGame)
                }
            }
            const likedGamesWithoutCreatedOnes = usersLikedGames.filter(game => game.userId !== userId)
            setMyLikedGames(likedGamesWithoutCreatedOnes)
        })
    })
}
```

## Author Info
**Created by Lee Jennings**

- LinkedIn - [Lee Jennings](https://www.linkedin.com/in/leejennings/)
- GitHub - [@LeeRJennings](https://github.com/LeeRJennings)