import SpacexList from '../../componets/spacexv3-launch/SpacexList';
import SpacexSearchBar from '../../componets/spacexv3-launch/SpacexSearchBar';
import SpacexFilterBar from '../../componets/spacexv3-launch/SpacexFilterBar';
import Container from 'react-bootstrap/Container';

const Home = () => {
  return (
    <Container className="mt-5 mt-sm-2">
      <SpacexSearchBar />
      <SpacexFilterBar />
      <SpacexList />
    </Container>
  );
};

export default Home;
