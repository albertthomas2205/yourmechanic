import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBCardFooter,
  MDBInputGroup,
} from "mdb-react-ui-kit";

export default function Chatmodal() {
  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="8" lg="6" xl="4">
          <MDBCard>
            <MDBCardHeader
              className="d-flex justify-content-between align-items-center p-3"
              style={{ borderTop: "4px solid #ffa900" }}
            >
              <h5 className="mb-0">Chat messages</h5>
              <div className="d-flex flex-row align-items-center">
                <span className="badge bg-warning me-3">20</span>
                <MDBIcon fas icon="minus" size="xs" className="me-3 text-muted" />
                <MDBIcon fas icon="comments" size="xs" className="me-3 text-muted" />
                <MDBIcon fas icon="times" size="xs" className="me-3 text-muted" />
              </div>
            </MDBCardHeader>
            <div
              style={{ overflowY: "auto", maxHeight: "400px", position: "relative" }}
            >
              <MDBCardBody>
                {/* Your chat content goes here */}
                {/* ... */}
              </MDBCardBody>
            </div>
            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
              <MDBInputGroup className="mb-0">
                <input
                  className="form-control"
                  placeholder="Type message"
                  type="text"
                />
                <MDBBtn color="warning" style={{ paddingTop: ".55rem" }}>
                  Button
                </MDBBtn>
              </MDBInputGroup>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
