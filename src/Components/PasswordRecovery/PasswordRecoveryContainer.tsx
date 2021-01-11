import React from "react";
import { connect } from "react-redux";
import { sendRecoveryMess,addUserEmail } from "../../store/recoveryPass-reducer";
import { AppRootStateType } from "../../store/store";
import { PasswordRecovery } from "./PasswordRecovery";


 const mapStateToProps = (state: AppRootStateType) => ({
   error: state.recoveryPass.error,
   email: state.recoveryPass.email,
   emailSended: state.recoveryPass.emailSended
 })



const PasswordRecoveryContainer = connect(mapStateToProps,{sendRecoveryMess, addUserEmail})(PasswordRecovery)

export default PasswordRecoveryContainer

