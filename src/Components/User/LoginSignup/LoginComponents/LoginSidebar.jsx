import React from 'react-dom';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginSidebar = ({hostlink})=>{

    return (
	<div id="login-panel" className="login-panel offscreen-panel">
		<div className="backdrop"></div>
		<div className="panel">
			<div className="hamburger-menu button-close active">
				<span className="menu-text">Close</span>
				<div className="hamburger-box">
					<div className="hamburger-inner"></div>
				</div>
			</div>
			<div className="panel-content" style={{ overflow: 'hidden' }}>
				
				<LoginForm noClasses={true} hostlink={hostlink}/>
				
			</div>
		</div>
	</div>
    )
}

export default LoginSidebar;