import React from 'react';
import { connect } from 'react-redux';
import { AppRootStateType } from '../../store/store';
import { NewPasswordEnter } from './NewPasswordEnter';
import {changePassword, sendNewPassword} from '../../store/enterNewPass-reducer'

const mapStateToProps = (state:AppRootStateType) =>{
    return {
        newPassword: state.enterNewPass.newPassword,
        error: state.enterNewPass.error,
        succes: state.enterNewPass.succes
    }
}

 
export default connect(mapStateToProps, {changePassword,sendNewPassword})(NewPasswordEnter)