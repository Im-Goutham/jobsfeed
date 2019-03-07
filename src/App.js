import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Container, Divider} from 'semantic-ui-react'
import JobsList from './components/JobsList'
import Header from './components/Header'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        jobsfeed: null,
        allJobs: [],
        skills: [],
        selectedSkills: [],
        locations: [],
        selectedLocations: [],

    }
  }

  componentDidMount(){
    this.getJobs();
  }


  // Getting all jobs on page load
  getJobs(){
    var _this = this;
    axios.get('https://api.myjson.com/bins/kez8a')
      .then(function (response) {
        // handle success
        if(response.data){
             let {jobsfeed} = response.data;
             let skills = [];
             let locations = [];
             jobsfeed.map((job,key)=>{
                   let jobskills = job.skills;
                   jobskills = jobskills.split(', ');
                   jobskills.map(skill=>{
                        if(skill){
                           let skillObj = { key: skill, text: skill, value: skill };
                           skills.push(skillObj);
                        }
                   })
                   if(job.location){
                        let locationObj = { key: job.location, text: job.location, value: job.location };
                        locations.push(locationObj)
                   }
             })
             // Getting unique locations and skills 
             locations = _.uniqBy(locations,'key');
             skills = _.uniqBy(skills,'key');
             _this.setState({allJobs:jobsfeed, jobsfeed,skills,locations});
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

}

// Getting filtered results based on options selected
  getFilteredResults(){
      this.setState({jobsfeed:null})
      let {allJobs,selectedSkills,selectedLocations,selectedExperience} = this.state;
      function compare(arr1,arr2){
        const finalarray =[];
        arr1.forEach((e1)=>{
         arr2.forEach((e2)=>{
             if(e1 == e2){
                 finalarray.push(e1);
             }
           })
        })
        return finalarray;
     }
     let filteredJobs = [];
     allJobs.map((job)=>{
                let {location,skills,experience} = job;
                 skills = skills.split(', ');
                  let show = true;
                  if(selectedSkills.length>0){
                      let matchedSkills = compare(skills,selectedSkills);
                      if(matchedSkills.length == 0){
                         show= false;
                      }
                  }
                  if(selectedLocations.length>0){
                   let matchedLocations = compare([location],selectedLocations);
                       if(matchedLocations.length == 0){
                         show= false;
                       }
                   }
                   if(selectedExperience){
                        if(selectedExperience == 'Fresher'){
                             if(selectedExperience != experience){
                                show= false;
                             }
                        }
                        else if(selectedExperience == 'All') {
                              show= true;
                        }
                        else {
                              if(experience == 'Fresher'){
                                show= false;
                            }
                        }
                    }
                  if(show){
                      filteredJobs.push(job);
                  }
                })
         this.setState({jobsfeed:filteredJobs});

  }


  render() {
    let {jobsfeed,skills,selectedSkills,locations,selectedLocations} = this.state;
    return (
    <Container>
             <Header
                 skills={skills}
                 selectedSkills={(selectedSkills)=> {
                   this.setState({selectedSkills},()=>{
                       this.getFilteredResults();
                   })
                  }}
                 locations={locations}
                 selectedLocations={(selectedLocations)=> {
                  this.setState({selectedLocations},()=>{
                      this.getFilteredResults(); 
                  })
                 }}
                 selectedExperience={(selectedExperience)=> {
                  this.setState({selectedExperience},()=>{
                    console.log('Experience is .. ',selectedExperience);
                      this.getFilteredResults(); 
                  })
                 }}

             />
             {
                (jobsfeed)?(
                    <Divider horizontal>Total Jobs - {jobsfeed.length}</Divider>
                ):(null)
             }
             <JobsList
               jobsfeed={jobsfeed}
               selectedSkills={selectedSkills}
               selectedLocations={selectedLocations}
               />
    </Container>
    )
  }
}

export default App;
