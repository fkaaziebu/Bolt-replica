import React, { useState } from "react";
import { Navbar, Nav, Container, ListGroup } from "react-bootstrap";
import {
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaInbox,
  FaEnvelope,
} from "react-icons/fa";

const drawerWidth = 240;

const MiniDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>Mini variant drawer</Navbar.Brand>
          <Navbar.Toggle
            onClick={handleDrawerOpen}
            aria-controls="navbar-nav"
          >
            <FaBars />
          </Navbar.Toggle>
        </Container>
      </Navbar>
      <Container fluid className={`d-flex ${open ? "open" : ""}`}>
        <Nav className={`flex-column bg-light sidebar ${open ? "open" : ""}`}>
          <Nav.Item>
            <Nav.Link onClick={handleDrawerClose}>
              {open ? <FaChevronLeft /> : <FaChevronRight />}
            </Nav.Link>
          </Nav.Item>
          <hr className="my-2" />
          <ListGroup>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListGroup.Item key={text} className="d-block p-0">
                <Nav.Link className="d-flex align-items-center">
                  <span className="me-3">
                    {index % 2 === 0 ? <FaInbox /> : <FaEnvelope />}
                  </span>
                  <span className={`${open ? "" : "d-none"}`}>{text}</span>
                </Nav.Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <hr className="my-2" />
          <ListGroup>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListGroup.Item key={text} className="d-block p-0">
                <Nav.Link className="d-flex align-items-center">
                  <span className="me-3">
                    {index % 2 === 0 ? <FaInbox /> : <FaEnvelope />}
                  </span>
                  <span className={`${open ? "" : "d-none"}`}>{text}</span>
                </Nav.Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Nav>
        <Container fluid className="main-content p-3">
          <h1>Content</h1>
          <p>Sample text</p>
        </Container>
      </Container>
    </>
  );
};

export default MiniDrawer;
