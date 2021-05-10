import { SpacexCard as SpacexCardType } from '../../redux/slices/spacexv3/spacexSlice';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

interface SpacexCardProps {
  spacex: SpacexCardType;
}

const SpacexCard: React.FC<SpacexCardProps> = (props) => {
  const spacex = props.spacex;
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <div className="p-md-2 p-1">
        <Card className="pt-1">
          <Card.Img
            variant="top"
            src={spacex.links.mission_patch_small}
            alt={spacex.mission_name}
            className="img-fluid"
          />
          <Card.Body>
            <Card.Title>{spacex.mission_name}</Card.Title>
            <Card.Text>{spacex.rocket.rocket_name}</Card.Text>
            <Card.Text>
              Launch:{' '}
              {spacex.launch_success ? (
                <Badge variant="success">success</Badge>
              ) : (
                <Badge variant="danger">fail</Badge>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};

export default SpacexCard;
