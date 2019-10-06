import React from 'react';
import { Segment } from 'semantic-ui-react';
import { TopMenu } from '../../components/Homepage';

const Home = () => {
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



