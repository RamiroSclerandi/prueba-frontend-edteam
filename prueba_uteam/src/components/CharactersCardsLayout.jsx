import { Card, Button, Row, Col } from 'react-bootstrap';

const CharactersCardsLayout = ({ characters, onModify, onDelete }) => {
  return (
    <Row>
      {characters.map((character, index) => (
        <Col key={index} md={4} className="mb-4">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={character.image} alt={character.name} />
            <Card.Body>
              <Card.Title>{character.name}</Card.Title>
              <Card.Text>
                {/* Otros campos del personaje aquí */}
              </Card.Text>
              <Button variant="warning" onClick={() => onModify(character)}>Modificar</Button>
              <Button variant="danger" onClick={() => onDelete(character.id)} className="ms-2">Eliminar</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CharactersCardsLayout;
