import { StreamingServices, User, Movie, Episode, Series } from './classes/index.js';
const movie1 = new Movie('The Shawshank Redemption', 'triller', new Date(1994, 11, 31), 142);
const movie2 = new Movie('One Flew Over the Cuckoo\'s Nest', 'drama', new Date(1975, 11, 31), 133);
const movie3 = new Movie('Hoy', 'drama', new Date(2022, 11, 31), 130);
const movie4 = new Movie('The Deep House', 'horror', new Date(2021, 11, 31), 130);
const movie5 = new Movie('Army of the Dead', 'horror', new Date(2021, 11, 31), 130);
const ep1 = new Episode('Fist Episode', 'fantasy', new Date(2011, 11, 31), 160);
const ep2 = new Episode('Second Episode', 'fantasy', new Date(2011, 11, 31), 160);
const ep3 = new Episode('Third Episode', 'fantasy', new Date(2011, 11, 31), 160);
const serial1 = new Series('Game of Thrones', 'fantasy', new Date(2011, 11, 31), 100);
serial1.addEpisode(ep1);
serial1.addEpisode(ep2);
serial1.addEpisode(ep3);
const ss1 = new StreamingServices([serial1, movie3]);
const ss2 = new StreamingServices([movie1, movie2, movie4, movie5]);
const user1 = new User();
const user2 = new User();
const subscr1 = user1.subscribe(ss1);
const subscr2 = user1.subscribe(ss2);
const subscr3 = user2.subscribe(ss2);
//- this throw error
//subscr1.watch('The Shawshank Redemption'); 
subscr2.watch('The Shawshank Redemption');
subscr3.watch('The Shawshank Redemption');
//- this throw error
//subscr3.watch('Hoy');
subscr1.watch('Second Episode');
subscr1.watch('Hoy');
subscr1.watch('Hoy');
subscr1.watch('Hoy');
const trending = subscr1.getRecommendationTrending();
if (trending)
    console.log('trending: ', trending.name);
const recommended = subscr2.getRecommendationByGenre('horror');
if (recommended)
    console.log('recommended horror: ', recommended.name);
else
    console.log(`cold't recommend horror`);
console.log('serial duration: ', serial1.getDuration());
