import React from "react";
import { Box, Grid, Typography, Button, TextField } from "@mui/material"
import Header from "../components/candidate-interview/Header";
//redux
import { connect } from "react-redux";
import { authLogout } from "../stores/auth/actions";
const NotVerified = (props) => {
    return (
        <div>
            <Header title="We are Verifying Your Account Details!" />
            <div className="container" style={{ textAlign: "center" }}>
                <img src="/assets/images/clock.jpg" />
                <br />
                <Button 
                    variant="outlined" 
                    color="error"
                    onClick={()=>props.authLogout()}
                >Logout</Button>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    profile: state.profile.profile
});
const mapDispatchToProps = {
    authLogout
};
export default connect(mapStateToProps, mapDispatchToProps)(NotVerified);