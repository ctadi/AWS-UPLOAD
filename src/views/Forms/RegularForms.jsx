import React from "react";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import FormLabel from "material-ui/Form/FormLabel";
import FormControlLabel from "material-ui/Form/FormControlLabel";
import Radio from "material-ui/Radio";
import Checkbox from "material-ui/Checkbox";
import Chip from "material-ui/Chip";
import TextField from "material-ui/TextField";
import Textarea from "material-ui/Input/Textarea";
// material-ui-icons
import MailOutline from "material-ui-icons/MailOutline";
import Check from "material-ui-icons/Check";
import Contacts from "material-ui-icons/Contacts";
import FiberManualRecord from "material-ui-icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import IconCard from "components/Cards/IconCard.jsx";
import HeaderCard from "components/Cards/HeaderCard.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
// import AWS from 'aws-sdk'
import * as AWS from 'aws-sdk'
import { ConfigurationOptions } from 'aws-sdk'

const configuration = {
    region: 'us-east-1',
    secretAccessKey: 'SsVkNxh884N/3y9zlzXOKcy2EZMf/zMc+0wL1fGM',
    accessKeyId: 'AKIA4ZL7MCV7GYDHJY6O'
}

AWS.config.update(configuration)

const S3_BUCKET ='s3eventcloudcomputing';
const REGION ='us-east-1';

const docClient = new AWS.DynamoDB.DocumentClient()

// AWS.config.update({
//     accessKeyId: 'AKIA4ZL7MCV7GYDHJY6O',
//     secretAccessKey: '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'
// })
class RegularForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [24, 22],
      selectedFile: null,
      selectedEnabled: "b",
      progress:0,
      email1:"",
      email2:"",
      email3:"",
      email4:"",
      email5:"",
      myBucket : new AWS.S3({
        params: { Bucket: S3_BUCKET},
        region: REGION,
    })
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }
  handleChange(event) {
    this.setState({ selectedValue: event.target.value });
  }
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }
  handleupdateEmail = (n) => (event) =>{
    this.setState({ [`email${n}`]: event.target.value});
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }

  handleFileInput = (e) => {
    this.setState({selectedFile:e.target.files[0]})
}
putData = (tableName , data) => {
  var params = {
      TableName: tableName,
      Item: data
  }
  
  docClient.put(params, function (err, data) {
      if (err) {
          console.log('Error', err)
          alert("Upload Failed")
      } else {
          alert("Upload Success")
          console.log('Success', data)
          window.location.reload();
      }
  })
}
addDataToDynamoDB = async () => {
  var email=""
  for (let index = 1; index <= 5; index++) {
    if(this.state[`email${index}`]){
      email = email+""+this.state[`email${index}`]+",";
    }
    
  }
  const userData = {
    filename:this.state.selectedFile.name,
    email_address: email
  }
  
  await this.putData('filesharing' , userData)
 
}

uploadFile = (file) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
    };

    this.state.myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            this.setState({progress:Math.round((evt.loaded / evt.total) * 100)});
            console.log(Math.round((evt.loaded / evt.total) * 100));
            this.addDataToDynamoDB();
        })
        .send((err) => {
            if (err) console.log(err)
        })
}
  render() {
    const { classes } = this.props;
    return (
      <GridContainer style={{padding:"10px 30px"}}>
        <ItemGrid xs={12} sm={12} md={12} style={{padding:"30px !important"}}>
          <HeaderCard
            cardTitle="Upload Form"
            headerColor="rose"
            content={
              <form onSubmit={this.uploadFile(this.state.selectedFile)}>
                <GridContainer>
                  <ItemGrid xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal} style={{paddingBottom:'20px', paddingTop: 0}}>
                      Select File
                    </FormLabel>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={10}>
                    <input required={true} type="file" name="file" onChange={this.handleFileInput}/>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal} style={{paddingBottom:'20px', paddingTop: 0}}>
                      Email
                    </FormLabel>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={10}>
                   <input required={true} type="email" name="email1" value={this.state.email1} onChange={this.handleupdateEmail(1)}/>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal} style={{paddingBottom:'20px', paddingTop: 0}}>
                      Email
                    </FormLabel>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={10}>
                   <input type="email" name="email2" value={this.state.email2} onChange={this.handleupdateEmail(2)}/>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal} style={{paddingBottom:'20px', paddingTop: 0}}>
                      Email
                    </FormLabel>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={10}>
                   <input type="email" name="email3" value={this.state.email3} onChange={this.handleupdateEmail(3)}/>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal} style={{paddingBottom:'20px', paddingTop: 0}}>
                      Email
                    </FormLabel>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={10}>
                   <input type="email" name="email4" value={this.state.email4} onChange={this.handleupdateEmail(4)}/>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal} style={{paddingBottom:'20px', paddingTop: 0}}>
                      Email
                    </FormLabel>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={10}>
                   <input type="email" name="email5" value={this.state.email5} onChange={this.handleupdateEmail(5)}/>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  
                  <ItemGrid xs={12} sm={8} className={classes.center} style={{textAlign:"center"}}>
                  <input type="submit" value="Upload" round color="primary" />

                  </ItemGrid>
                </GridContainer>
                </form>
            }
          />
        </ItemGrid>
      </GridContainer>
    );
  }
}

export default withStyles(regularFormsStyle)(RegularForms);
