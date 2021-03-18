import React from "react";
import datasetOne from '../datasets/dataset1.json';
import datasetTwo from '../datasets/dataset2.json';
import datasetThree from '../datasets/dataset3.json';

const filter_options_bar_chart = [
    {
        text: "Students",
        value: 1
    },
    {
        text: "Grade",
        value: 2
    },
    {
        text: "Semester",
        value: 3
    },
    {
        text: "Year",
        value: 4
    }
]

const filter_options_stack_chart = [
    {
        text: "Students",
        value: 1
    },
    {
        text: "Grade",
        value: 2
    },
]

const filter_options_summary = [
    {
        text: "Students",
        value: 1
    },
    {
        text: "Grade",
        value: 2
    },
    {
        text: "Semester",
        value: 3
    },
    {
        text: "Year",
        value: 4
    },
    {
        text: "Subject",
        value: 5
    },
]

class APIManager {

    // GET total marks for each subject
    getChartOneData() {
        var newArray = [];
        datasetOne.forEach(mark => {
            newArray.push({
                subject: mark.subject_name,
                total: Math.floor(Math.random() * 18000) + 15000,
                average: Math.floor(Math.random() * 12000) + 9000,
            })
        })
        return newArray;
    }

    // GET marks for each year and semester for given filter
    getChartTwoData() {
        var newArray = [];
        datasetTwo.forEach(mark => {
            newArray.push({
                year: mark.year,
                maths: Math.floor(Math.random() * 2700) + 1800,
                science: Math.floor(Math.random() * 2700) + 1800,
                english: Math.floor(Math.random() * 2700) + 1800,
                history: Math.floor(Math.random() * 2700) + 1800,
                social: Math.floor(Math.random() * 2700) + 1800,
                econ: Math.floor(Math.random() * 2700) + 1800,
                accounting: Math.floor(Math.random() * 2700) + 1800,
                commerce: Math.floor(Math.random() * 2700) + 1800,
                ict: Math.floor(Math.random() * 2700) + 1800
            })
        })
        return newArray;
    }

    // GET total marks for given student, year and semester
    getSummaryData(filter) {
        let total = Math.floor(Math.random() * 900) + 300;
        return total;
    }

    // GET filter options for bar chart
    getBarChartOptions(){
        return filter_options_bar_chart;
    }

    // GET filter options for stack chart
    getStackChartOptions(){
        return filter_options_stack_chart;
    }

    // GET filter options for summary
    getSummaryOptions(){
        return filter_options_summary;
    }
    

}
const instance = new APIManager();
export default instance;