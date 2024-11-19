import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <h1>Welcome to Kitchen Whispers, {user.username}</h1>
      <h3>Your Recipe Sharing Community Awaits!</h3>

      <h4>
      Discover new recipes,share your favorites,
      and connect with fellow food enthusiasts.
      Let's cook, share, and inspire one another!
      </h4>
    </main>
  );
};

export default Dashboard;
