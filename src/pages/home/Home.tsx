import SpacexList from '../../componets/spacexv3-launch/SpacexList';
import SpacexSearchBar from '../../componets/spacexv3-launch/SpacexSearchBar';
import SpacexFilterBar from '../../componets/spacexv3-launch/SpacexFilterBar';

const Home = () => {
  return (
    <div>
      <SpacexSearchBar />
      <SpacexFilterBar />
      <SpacexList />
    </div>
  );
};

export default Home;
