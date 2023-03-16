import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { changePassword } from "../stores/profile/actions";

//helpers
import { showAlert } from "../helpers/";
function UpdatePassword(props) {
    const [credentials, setCredentials] = useState({
        oldPassword: '',
        password: '',
        confPassword: ''
    })
    const [btnLoading, setBtnLoading] = useState(false)

    const onSubmit = async (e) => {
        try{
          setBtnLoading(true)
          e.preventDefault()
          await props.changePassword(credentials)
          showAlert({ title: "Success!", message: "Password Changed Successfully!", type: "success" })
          setCredentials({
            oldPassword: '',
            password: '',
            confPassword: ''
          })
        }catch(err){
          let message = "Invalid Email/Password";
          if(err?.response?.data?.message){
            message = err?.response?.data?.message
          }
          showAlert({ title: "Error!", message, type: "danger" })
        }finally{
          setBtnLoading(false)
        }
    }

    const onInputCredentials = (fieldName, value) => {
        setCredentials({
            ...credentials,
            [fieldName]: value
        })
    }

    return (
        <form onSubmit={onSubmit} style={{width: "50%"}}>
            <Box sx={{ padding: '16px' }}>
                <TextField onInput={e => { onInputCredentials("oldPassword", e.target.value) }} sx={{ width: '100%', margin: '4px' }} variant="outlined" label="Old Password" type="password" value={credentials.oldPassword}/>
                <TextField onInput={e => { onInputCredentials("password", e.target.value) }} sx={{ width: '100%', margin: '4px' }} variant="outlined" type="password" label="New Password" value={credentials.password}/>
                <TextField onInput={e => { onInputCredentials("confPassword", e.target.value) }} sx={{ width: '100%', margin: '4px' }} variant="outlined" type="password" label="Confirm Password" value={credentials.confPassword}/>
                <Button 
                    color="primary" 
                    variant="contained" 
                    type="submit" 
                    disabled={btnLoading}
                    style={{marginTop: 10}}
                >
                    Submit
                </Button>
            </Box>
        </form>
    )
}
const mapStateToProps = (state) => ({
    token: state.auth.token,
});
const mapDispatchToProps = {
    changePassword
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);