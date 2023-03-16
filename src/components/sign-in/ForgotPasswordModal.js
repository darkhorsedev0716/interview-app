import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Container,
  Card,
  CardContent,
} from "@mui/material";
//redux
import { connect } from "react-redux";
import { forgotPassword } from "../../stores/auth/actions";

//helpers
import { showAlert } from "../../helpers/";

function ForgotPasswordModal(props) {
  const { open = false, onModalClose = () => {} } = props;
  const [btnLoading, setBtnLoading] = useState(false);
  const [email, setEmail] = useState("");
  const onSubmit = async (e) => {
    try {
      setBtnLoading(true);
      e.preventDefault();
      const resp = await props.forgotPassword({ email });
      showAlert({ title: "Success!", message: resp.message, type: "success" });
      onModalClose();
    } catch (err) {
      let message = "Something went wrong!";
      if (err?.response?.data?.message) {
        message = err?.response?.data?.message;
      }
      showAlert({ title: "Error!", message, type: "danger" });
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onModalClose}>
      <Container
        style={{
          marginTop: "40px",
        }}
        sx={{
          width: {
            sm: "90%",
            md: "60%",
            lg: "600px",
          },
        }}
      >
        <Card>
          <CardContent>
            <form onSubmit={onSubmit}>
              <p>
                Enter email associated with your account
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  variant="outlined"
                  label="Email"
                  value={email}
                  sx={{ width: "100%", marginBottom:"20px" }}
                  onInput={(e) => setEmail(e.target.value)}
                />
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={btnLoading}
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Modal>
  );
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  forgotPassword,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordModal);
