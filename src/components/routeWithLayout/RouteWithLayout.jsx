import React, {useEffect} from "react";
import { Outlet, Navigate } from "react-router-dom";

//redux
import { connect } from "react-redux";
import {fetchProfile} from "../../stores/profile/actions";

const RouteWithLayout = (props) => {
  const {
    restricted,
    access,
  } = props;
  useEffect(()=>{
    if(props.token){
      props.fetchProfile();
    }
  }, [props.token])
  if (access === "public")
    return (props.token !== null) && restricted ? <Navigate to="/dashboard" /> : <Outlet />;
  else if (access === "private")
    return props.token !== null ? <Outlet /> : <Navigate to="/" />;
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  profile: state.profile.profile
});
const mapDispatchToProps = {
  fetchProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(RouteWithLayout);