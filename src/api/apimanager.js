import React from "react"; 
import datasetOne from '../datasets/dataset1.json';
import datasetTwo from '../datasets/dataset2.json';
import datasetThree from '../datasets/dataset3.json';

class APIManager{
    
    // API call to GET total marks for each subject
    getTotalMarksForSubject(){
        // fetch('https://api.npms.io/v2/search?q=react')
        // .then(response => response.json())
        // .then(data => this.setState({ totalReactPackages: data.total }));
        return datasetOne;
    }

    // API call to GET total marks for each subject for given Student ID
    getTotalMarksForSubjectForStudentId(id){
        // fetch('https://api.npms.io/v2/search?q=react')
        // .then(response => response.json())
        // .then(data => this.setState({ totalReactPackages: data.total }));
        return datasetTwo;
    }

    // API call to GET total marks for given student, year and semester
    getStudentSummary(id,year,semester,subject){
        // fetch('https://api.npms.io/v2/search?q=react')
        // .then(response => response.json())
        // .then(data => this.setState({ totalReactPackages: data.total }));
        return datasetThree;
    }

    // API call to GET student, year and semester data 
    getOptionDataForDropDown(){
        // fetch('https://api.npms.io/v2/search?q=react')
        // .then(response => response.json())
        // .then(data => this.setState({ totalReactPackages: data.total }));
    }

}
const instance = new APIManager(); 
export default instance;