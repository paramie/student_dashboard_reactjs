import React, { Component } from "react";
import APIManager from '../api/apimanager';

import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBBadge, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import SummaryCard from "../components/summarycard.component";
import BarChart from "../components/barchart.component";
import StackedChart from "../components/stackedchart.component";


class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary_modal: false,
            chart_modal: false,
            filter_options_bar_chart: [
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
            ],
            filter_options_stack_chart: [
                {
                    text: "Students",
                    value: 1
                },
                {
                    text: "Grade",
                    value: 2
                },
            ],
            filter_options_summary: [
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
            ],
            chart_options: [
                {
                    text: "Marks for subjects",
                    value: 1
                },
                {
                    text: "Marks for all the years",
                    value: 2
                },
            ],
            summaries: [],
            charts_type_one: [],
            charts_type_two: [],
            title: '',
            total: '',
            filter: '',
            chart_type: ''

        };
    }


    // API Manager function call to get summary data for given filter
    getTotalMarksForSummary(filter) {
        const responseData = APIManager.getSummaryData(filter);
        return responseData;
    }

    // API Manager function call to get chart data for given filter
    getTotalMarksForSubjectsChart(filter) {
        const responseData = APIManager.getChartOneData(filter);
        return responseData;
    }

    // API Manager function call to get chart data for given filter
    getMarksProgressChart(filter) {
        const responseData = APIManager.getChartTwoData(filter);
        return responseData;
    }

    // Validate inputs in summary card and chart forms
    validateInputs() {
        if (this.state.title.trim() == null || this.state.title.trim() == '') {
            alert("invalid Title");
            return false
        }
        if (this.state.chart_type.trim() == null || this.state.chart_type == '') {
            alert("invalid Chart Type");
            return false
        }
        return true
    }

    // Create and add summary object to 'summeries' array in the state
    addSummary = () => {
        if (this.state.title.trim() == null || this.state.title.trim() == '') {
            alert("invalid Title");
            return false
        }
        else {
            var total_marks = this.getTotalMarksForSummary(this.state.filter)

            var newArray = [...this.state.summaries];
            newArray.push({
                id: newArray.length ? newArray[newArray.length - 1].id + 1 : 1,
                title: this.state.title,
                total: total_marks,
                filter: this.state.filter == '' ? 'None' : this.state.filter
            })
            this.setState({ summaries: newArray });

            return true;
        }

    };

    // Create and add chart object to 'charts_type_one' and 'charts_type_two' arrays in the state
    addChart = () => {
        if (this.state.title.trim() == null || this.state.title.trim() == '') {
            alert("invalid Title");
            return false
        }
        else if (this.state.chart_type.trim() == null || this.state.chart_type.trim() == '') {
            alert("invalid Chart type");
            return false
        }
        else {
            if (this.state.chart_type == 1) {
                var datasetArr = this.getTotalMarksForSubjectsChart(this.state.filter)
                var newArray = [...this.state.charts_type_one];
                newArray.push({
                    data: datasetArr,
                    title: this.state.title,
                    filter: this.state.filter
                })
                this.setState({ charts_type_one: newArray });
            } else {
                var dataset = this.getMarksProgressChart(this.state.filter)
                var newArr = [...this.state.charts_type_two];
                newArr.push({
                    data: dataset,
                    title: this.state.title,
                    filter: this.state.filter
                })
                this.setState({ charts_type_two: newArr });

            }

            return true;
        }

    };

    // handle inputs with states
    handleInputChange = inputName => value => {

        let nextValue = value;
        if (!(inputName == 'title')) {
            nextValue = value.target.value
        }
        this.setState({
            [inputName]: nextValue
        });
    };

    // toggles summary form model 
    toggleSummaryModal = () => {
        this.setState({
            summary_modal: !this.state.summary_modal
        });
    };

    // toggles chart form model 
    toggleModal = () => {
        this.setState({
            chart_modal: !this.state.chart_modal
        });
    };


    render() {
        return (
            <React.Fragment>
                <MDBContainer>
                    <MDBRow>
                        <h2 className="text-uppercase my-3">Student DashBoard</h2>
                    </MDBRow>
                    <MDBRow className="ml-0">
                        <MDBCol xl="5" md="5" className="mx-left text-center">
                            <MDBBtn color="info" rounded onClick={this.toggleSummaryModal}>
                                Add Summary
                        </MDBBtn>
                            <MDBBtn color="info" rounded onClick={this.toggleModal}>
                                Add Chart
                        </MDBBtn>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol md="5" className="mb-l">
                            <h4 className="text-uppercase my-3">Summary Cards</h4>
                            <div id="summary">

                                {this.state.summaries.map(summary => (
                                    <SummaryCard
                                        total={summary.total}
                                        title={summary.title}
                                        filter={summary.filter}
                                    />
                                ))}
                            </div>

                        </MDBCol>

                        <MDBCol md="7">
                            <h4 className="text-uppercase my-3">Summary Charts</h4>
                            <div id="chart">
                                {this.state.charts_type_two.map((chart, index) => (

                                    <StackedChart
                                        title={chart.title}
                                        filter={chart.filter}
                                        dataset={chart.data}
                                    />


                                ))}

                                {this.state.charts_type_one.map((chart, index) => (
                                    <BarChart
                                        title={chart.title}
                                        filter={chart.filter}
                                        dataset={chart.data}
                                    />
                                ))}
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

                {/* Summary Modal */}
                <MDBModal isOpen={this.state.summary_modal} toggle={this.toggleSummaryModal}>
                    <MDBModalHeader
                        className="text-center"
                        titleClass="w-100 font-weight-bold"
                        toggle={this.toggleSummaryModal}
                    >
                        Add New Summary
                </MDBModalHeader>
                    <MDBModalBody>
                        <form className="mx-3 grey-text">
                            <MDBInput
                                name="title"
                                label="Title"
                                icon="edit"
                                hint="Summary Title"
                                group
                                type="text"
                                getValue={this.handleInputChange("title")}
                            />

                            <div>
                                <label>Select Filter</label>
                                <select className="browser-default custom-select" onChange={this.handleInputChange("filter")}>
                                    <option value={'None'}>None</option>
                                    {this.state.filter_options_summary.map((option) =>
                                        <option value={option.text}>{option.text}</option>
                                    )}
                                </select>
                            </div>

                        </form>
                    </MDBModalBody>
                    <MDBModalFooter className="justify-content-center">
                        <MDBBtn
                            color="info"
                            onClick={() => {
                                if (this.addSummary()) {
                                    this.toggleSummaryModal();
                                    this.setState({
                                        filter: "",
                                        total: "",
                                        title: ""
                                    });
                                }

                            }}
                        >
                            Add
                </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                {/* End of Summary Modal */}

                {/* Chart Modal */}
                <MDBModal isOpen={this.state.chart_modal} toggle={this.toggleModal}>
                    <MDBModalHeader
                        className="text-center"
                        titleClass="w-100 font-weight-bold"
                        toggle={this.toggleModal}
                    >
                        Add New Chart
                </MDBModalHeader>
                    <MDBModalBody>
                        <form className="mx-3 grey-text">
                            <MDBInput
                                name="title"
                                label="Title"
                                icon="edit"
                                hint="Summary Title"
                                group
                                type="text"
                                getValue={this.handleInputChange("title")}
                            />

                            <div>
                                <label>Select Chart Type</label>
                                <select className="browser-default custom-select" onChange={this.handleInputChange("chart_type")}>
                                    <option value={''}>None</option>
                                    {this.state.chart_options.map((option) =>
                                        <option value={option.value}>{option.text}</option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label>Select Filter</label>
                                <select className="browser-default custom-select" onChange={this.handleInputChange("filter")}>
                                    <option value={'None'}>None</option>
                                    {this.state.chart_type == 2 ?
                                        this.state.filter_options_stack_chart.map((option) =>
                                            <option value={option.text}>{option.text}</option>
                                        ) :

                                        this.state.filter_options_bar_chart.map((option) =>
                                            <option value={option.text}>{option.text}</option>
                                        )}
                                </select>
                            </div>

                        </form>
                    </MDBModalBody>
                    <MDBModalFooter className="justify-content-center">
                        <MDBBtn
                            color="info"
                            onClick={() => {
                                if (this.addChart()) {
                                    this.toggleModal();
                                    this.setState({
                                        filter: "",
                                        chart_type: "",
                                        title: "",
                                    });
                                }

                            }}
                        >
                            Add
                </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                {/* End of Chart Modal */}
            </React.Fragment>
        )
    }
}
export default DashBoard;
