import React, { Component,Fragment } from 'react';
import { Button, Card, Header, Label, Dimmer, Loader} from 'semantic-ui-react'
import moment from 'moment';
import './style.css';


class JobsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        jobsfeed: props.jobsfeed,
        selectedSkills: props.selectedSkills
    }
  }

  componentWillReceiveProps(nextProps){
      let {jobsfeed,selectedSkills,selectedLocations} = nextProps;
      this.setState({jobsfeed,selectedSkills,selectedLocations});
  }



  render() {
    let {jobsfeed} = this.state;
    return (
      <Card.Group  itemsPerRow={3} doubling={true} stackable={true}>
    {
        (jobsfeed)?(
             jobsfeed.length > 0 ? (
              jobsfeed.map((job,key)=>{
                let {title,applylink,jd,companyname,location,experience,salary,type,skills,startdate,enddate,created,source,timestamp} = job;
                 skills = skills.split(', ');
                   return   <Card key={key} raised={true} >
                   <Card.Content>
                     <Card.Header>{title}</Card.Header>
                     <Card.Meta>{companyname}</Card.Meta>
                         <Header as='h4'>Job Description</Header>
                         <div className='skills'>
                        {
                           skills.length > 0 ? (
                            skills.map((skill)=>{
                                 return  <Fragment>
                                        {
                                            skill ?  <Label className='skillLabel' as='a'>{skill}</Label> : null
                                        }
                                         </Fragment> 
                            })
                           ) :(null)
                        }
                    </div>
                     {
                         (location)?(
                             <p className='margin5' as='h5' >Location - <span className="bold">{location}</span></p>
                         ):(null)
                     }
                    {
                         (experience)?(
                             <p className='margin5'>Experience - <span className="bold">{experience}</span></p>
                         ):(null)
                     }
                      {
                         (salary)?(
                             <p className='margin5'>Salary - <span className="bold">{salary}</span></p>
                         ):(null)
                     }
                     {
                         (type)?(
                             <p className='margin5'>Job type - <span className="bold">{type}</span></p>
                         ):(null)
                     }
                    {
                        (startdate && enddate)?(
                          <p className='margin5' as='h5' >Joining - <span className="bold">{moment(startdate).format("MMMM Do YYYY")}</span> to <span className="bold">{moment(enddate).format("MMMM Do YYYY")}</span></p>
                         ): (null)
                     }
                        {
                         (created)?(
                     <p className='margin5' as='h5' >Created - <span className="bold">{created}</span></p>
                         ): (null)
                     }

                     <Card.Description>{jd}</Card.Description>
                   </Card.Content>
                   <Card.Content extra>
                       <Button floated={'right'} style={{backgroundColor: 'rgb(1,149,130)'}} primary onClick={()=>  window.open(applylink, '_blank')}>
                          Apply
                       </Button>
                   </Card.Content>
                 </Card>
              })
             ) :( <Header as='h3' block>No results found with selected filters.</Header>)
        ):(
          <Dimmer active>
          <Loader inverted>Loading</Loader>
         </Dimmer>
        )
    }
      </Card.Group>
    )
  }
}

export default JobsList;
