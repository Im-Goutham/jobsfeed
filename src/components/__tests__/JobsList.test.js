import React from 'react';
import { shallow } from '../../enzyme';

import JobsList from '../JobsList';

var jobsfeed = [{"_id":"5b2b8a9e263a5020388e87ff","title":"DFX Engineer","applylink":"https://www.techgig.com/jobs/DFX-Engineer/59650","jd":"","companyname":"Intel Technology India Pvt Ltd","location":"Bengaluru/Bangalore","experience":"8-13 yrs","salary":"","type":"","skills":"clusterring, Computing, HTML, CSS","startdate":"","enddate":"","created":"","source":"techgig","timestamp":1528959791.958316,"__v":0},{"_id":"5b2bd7f09d73a1001456c2ec","title":"College Ambassador of E-Cell, IIT Bombay","applylink":"https://dare2compete.com/o/college-ambassador-of-e-cell-iit-bombay-61622","jd":"A student would be selected as a College Ambassador from every college based on his aptitude for business and entrepreneurship who will then get to interact with the E-Cell, IIT Bombay actively. The selected College Ambassador, in his entire tenure, would represent E-Cell, IIT Bombay in their college and would be equipped with tools that would be aimed to bring about his personal development as well as advancement of the entrepreneurial eco-system in his college.","companyname":"","location":"","experience":"","salary":"","type":"internships","skills":"","startdate":"2018-07-14 00:00:00","enddate":"2019-02-02 00:00:00","created":"","source":"dare2compete","timestamp":1529599983.2246094,"__v":0}]
var selectedSkills = [];
var selectedLocations = [];

describe('JobsList tests', () => {

  it('renders Jobs', () => {
    const wrapper = shallow(<JobsList jobsfeed={jobsfeed} selectedSkills={selectedSkills} selectedLocations={selectedLocations} />);

    // Expect the wrapper object to be defined
    expect(wrapper.find('.jobcard')).toBeDefined();
    expect(wrapper.find('.jobcard')).toHaveLength(jobsfeed.length);
  });

});