import React from "react";
import PropTypes from "prop-types";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import InputAdornment from "material-ui/Input/InputAdornment";

// material-ui-icons
import Face from "material-ui-icons/Face";
import Email from "material-ui-icons/Email";
import LockOutline from "material-ui-icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import LoginCard from "components/Cards/LoginCard.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      username:"",
      password:"",
      logins:[{un:"dileep0553@gmail.com",pwd:"12345670"},
              {un:"saikiranp79@gmail.com",pwd:"12345@12345"}]
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  handleunChange = (event) => {
    this.setState({ username: event.target.value });
  }
  handlepwdChange = (event) => {
    this.setState({ password: event.target.value });
  }
  formSubmit = (event) => {
    let logStatus = false;
    this.state.logins.map(({un,pwd})=>{
      console.log(un+" "+this.state.username)
      if(un==this.state.username && pwd==this.state.password){
        logStatus = true;
        this.props.history.push("/upload");
      }
    })
    if(logStatus == false){
      alert("Invalid Credentials.")
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <ItemGrid xs={12} sm={6} md={4}>
              <form onSubmit={this.formSubmit}>
                <LoginCard
                  customCardClass={classes[this.state.cardAnimaton]}
                  headerColor="rose"
                  cardTitle="Login"
                  cardSubtitle="Or Be Classical"
                  footerAlign="center"
                  footer={
                    <input type="submit" value="LOGIN" color="roseNoBackground" wd size="lg" />
                      
                  }
                  // socials={[
                  //   "fab fa-facebook-square",
                  //   "fab fa-twitter",
                  //   "fab fa-google-plus"
                  // ].map((prop, key) => {
                  //   return (
                  //     <Button
                  //       color="simple"
                  //       justIcon
                  //       key={key}
                  //       customClass={classes.customButtonClass}
                  //     >
                  //       <i className={prop} />
                  //     </Button>
                  //   );
                  // })}
                  content={
                    <div>
                      {/* <CustomInput
                        labelText="First Name.."
                        id="firstname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      /> */}
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        required="true"
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          value: this.state.username,
                          type:"email",
                          required:true,
                          onChange:this.handleunChange
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type:"password", 
                          value: this.state.password,
                          required:true,
                          onChange:this.handlepwdChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockOutline
                                className={classes.inputAdornmentIcon}
                              />
                            </InputAdornment>
                          )
                        }}
                      /> 
                    </div>
                  }
                />
              </form>
            </ItemGrid>
          </GridContainer>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
