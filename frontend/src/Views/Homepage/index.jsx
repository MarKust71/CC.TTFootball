import React from 'react';
import { Segment } from 'semantic-ui-react';
import { TopMenu } from '../../components/Homepage';

// const me = JSON.parse(localStorage.me);

// const Home = () => {
//   console.log(me);
//   return (
//     <div className="container">
//       <main>
//         <p>
//           O co chodzi? Gramy ligę!! Dobierz się w drużynę, zapisz do rozgrywek, zapisuj wyniki, sprawdzaj kto kogo
//           złoił. Wyłonimy zwycięzcę! :) Wanna Join?
//         </p>
//       </main>
//     </div>
//   );
// };
const Home = () => {
  // console.log(me);
  return (
    <Segment>
      <TopMenu></TopMenu>
      <main>
        <p>
          O co chodzi? Gramy ligę!! Dobierz się w drużynę, zapisz do rozgrywek, zapisuj wyniki, sprawdzaj kto kogo
          złoił. Wyłonimy zwycięzcę! :) Wanna Join?
       </p>
      </main>
    </Segment>
  );
};

export default Home;



