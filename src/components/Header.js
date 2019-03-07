import React, {Component} from 'react'
import { Header,Dropdown, Grid,  Icon, Segment } from 'semantic-ui-react'


class PageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
        styles: [],
        cart: [],
        selectedStyle: '',
        skills: []
    }
  }

  componentWillReceiveProps(nextProps){
      let {skills,locations,styles,cart} = nextProps;
      this.setState({skills,locations,styles,cart});
  }

  handleSkillChange = (e, { value }) =>{
       this.props.selectedSkills(value);
  }

  handleLocationChange = (e, { value }) =>{
      this.props.selectedLocations(value);
  }

  handleExperienceChange = (e, { value }) =>{
    this.props.selectedExperience(value);
  }


  render() {
    const options = [
      { key: 'all', text: 'All', value: 'All' },
      { key: 'fresher', text: 'Fresher', value: 'Fresher' },
      { key: 'experienced', text: 'Experienced', value: 'Experienced' }
    ]

    let {skills,locations} = this.state;

    return (
      <div>
          <Header as='h2' icon textAlign='center'>
            <Icon name='briefcase' circular />
            <Header.Content>Jobs Feed</Header.Content>
          </Header>
          <Segment>
     <Grid columns={3} stackable textAlign='center'>
     <Grid.Row verticalAlign='middle'>
       <Grid.Column>
         <Dropdown 
              onChange={this.handleSkillChange}
              placeholder='Keywords or Skills' fluid multiple search selection options={skills} />
       </Grid.Column>

       <Grid.Column>
       <Dropdown 
              onChange={this.handleLocationChange}
              placeholder='Select Location' fluid multiple search selection options={locations} />
       </Grid.Column>
       <Grid.Column>
        <Dropdown 
                  onChange={this.handleExperienceChange}
                  placeholder='Select Experience' fluid search selection options={options} />
       </Grid.Column>
     </Grid.Row>
   </Grid>
 </Segment>

        </div>
    )
  }
}

export default PageHeader;
