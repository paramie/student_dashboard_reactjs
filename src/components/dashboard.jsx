import React, { Component } from "react";
import APIManager from '../api/apimanager';

import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
// import { MDBSelect } from "mdbreact";
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBBadge, MDBContainer, MDBRow, MDBCol } from "mdbreact";


class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            student_options: [
                {
                    text: "Kyle",
                    value: 148
                },
                {
                    text: "Gibson",
                    value: 147
                },
                {
                    text: "Jude",
                    value: 146
                },
                {
                    text: "Alice",
                    value: 145
                },
            ],
            year_options: [
                {
                    text: "2010",
                    value: 2010
                },
                {
                    text: "2011",
                    value: 2011
                },
                {
                    text: "2012",
                    value: 2012
                },
                {
                    text: "2013",
                    value: 2013
                },
                {
                    text: "2014",
                    value: 2014
                },
                {
                    text: "2015",
                    value: 2015
                },
            ],
            semester_options: [
                {
                    text: "Semester 1",
                    value: 1
                },
                {
                    text: "Semester 2",
                    value: 2
                },
            ],
            subject_options: [
                {
                    text: "Mathematics",
                    value: "Mathematics"
                },
                {
                    text: "Science",
                    value: "Science"
                },
                {
                    text: "English",
                    value: "English"
                },
                {
                    text: "Hisrory",
                    value: "English"
                },
            ],
            summaries: [

            ],
            events: [
                {
                    id: 1,
                    time: "10:00",
                    title: "Breakfast with Simon",
                    location: "Lounge Caffe",
                    description: "Discuss Q3 targets"
                },
                {
                    id: 2,
                    time: "10:30",
                    title: "Daily Standup Meeting (recurring)",
                    location: "Warsaw Spire Office",
                    description: "Discuss Q3 targets"
                }
            ],
            student: '',
            title: '',
            subject: '',
            total: '',
            year: '',
            semester: ''

        };
    }



    // API Manager function call to get total marks for all subjects  
    getTotalMarksForSubject() {
        const responseData = APIManager.getTotalMarksForSubject();

    }

    // API Manager function call to get total marks for all subjects for a given student id
    getTotalMarksForSubjectPerStudent(id) {
        alert(id);
        const responseData = APIManager.getTotalMarksForSubjectForStudentId();
        alert(responseData);
    }

    // API Manager function call to get total subject marks for given StudentId, Year and Semester
    getTotalMarksForSummary(id, year, semester, subject) {
        const responseData = APIManager.getStudentSummary(id, year, semester, subject);
        alert(responseData[0].total + '-Summary');
        return responseData[0].total;
    }

    validateInputs() {
        if (this.state.title.trim() == null || this.state.title.trim() == '') {
            alert("invalid Title");
            return false
        }
        if (this.state.student == null || this.state.student == '') {
            alert("invalid Student");
            return false
        }
        if (this.state.year == null || this.state.year == '') {
            alert("invalid Year");
            return false
        }
        if (this.state.semester == null || this.state.semester == '') {
            alert("invalid Semester");
            return false
        }
        if (this.state.subject == null || this.state.subject == '') {
            alert("invalid Subject");
            return false
        }


        return true
    }

    addSummary = () => {
        if (this.validateInputs()) {
            var total_marks = this.getTotalMarksForSummary(this.state.student,this.state.year, this.state.semester, this.state.subject)

            var newArray = [...this.state.summaries];
            newArray.push({
                id: newArray.length ? newArray[newArray.length - 1].id + 1 : 1,
                title: this.state.title,
                student: this.state.student,
                year: this.state.year,
                semester: this.state.semester,
                subject: this.state.subject,
                total: total_marks
            })
            this.setState({ summaries: newArray });
            this.setState({
                student: "",
                title: "",
                year: "",
                semester: "",
                subject: "",
                total: ""
            });

            return true;
        }else{
            return false;
        }

    };

    // addEvent = () => {
    //     var newArray = [...this.state.events];
    //     newArray.push({
    //         id: newArray.length ? newArray[newArray.length - 1].id + 1 : 1,
    //         time: this.state.time,
    //         title: this.state.title,
    //         location: this.state.location,
    //         description: this.state.description
    //     });
    //     this.setState({ events: newArray });
    //     this.setState({
    //         time: "",
    //         title: "",

    //         location: "",
    //         description: ""
    //     });
    // };

    handleInputChange = inputName => value => {
        let nextValue = value;
        if (!(inputName == 'title')) {
            nextValue = value.target.value
        }
        if (nextValue == 'none') {
            nextValue = null;
        }

        // alert(value);

        this.setState({
            [inputName]: nextValue
        });
    };
    handleDelete = eventId => {
        const events = this.state.events.filter(e => e.id !== eventId);
        this.setState({ events });
    };
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    };




    render() {
        // const listItems = data.map((student) =>  <li>{student.name}</li>);
        return (
            // <div>
            //     {/* {listItems} */}
            //     {/* <button onClick={()=>{
            //         this.getTotalMarksForSummary(15,2019,2);
            //     }}>get</button> */}

            //     <div>
            //         <button>Add Summary</button>
            //         <button>Add Chart</button>
            //     </div>

            //     <SummaryDialog/>

            // </div>
            <React.Fragment>
                <MDBContainer>
                    <MDBRow>
                        <h2 className="text-uppercase my-3">Student DashBoard</h2>
                    </MDBRow>
                    <MDBRow className="ml-0">
                        <MDBCol xl="5" md="5" className="mx-left text-center">
                            <MDBBtn color="info" rounded onClick={this.toggleModal}>
                                Add Summary
                        </MDBBtn>
                            <MDBBtn color="info" rounded onClick={this.toggleModal}>
                                Add Chart
                        </MDBBtn>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol md="5" className="mb-l">
                            <h2 className="text-uppercase my-3">Summary Cards</h2>
                            <div id="events">
                                {this.state.summaries.map(summary => (
                                    <div></div>
                                ))}
                                {/* {this.state.events.map(event => (
                            <Event
                            key={event.id}
                            id={event.id}
                            time={event.time}
                            title={event.title}
                            location={event.location}
                            description={event.description}
                            onDelete={this.handleDelete}
                            />
                        ))} */}
                                {this.state.summaries.map(summary => (
                                    <Event
                                        student={summary.student}
                                        subject={summary.subject}
                                        year={summary.year}
                                        semester={summary.semester}
                                        title={summary.title}
                                        total={summary.total}
                                    // onDelete={this.handleDelete}
                                    />
                                ))}
                            </div>

                        </MDBCol>
                        <MDBCol md="7">
                            <h3 className="text-uppercase my-3">Summary Charts</h3>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

                <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <MDBModalHeader
                        className="text-center"
                        titleClass="w-100 font-weight-bold"
                        toggle={this.toggleModal}
                    >
                        Add new Summary
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
                                <label>Select Student</label>
                                <select className="browser-default custom-select" onChange={this.handleInputChange("student")}>
                                    <option value={'none'} >Student</option>
                                    {this.state.student_options.map((option) =>
                                        <option value={option.text}>{option.text}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label>Select Year</label>
                                <select className="browser-default custom-select" onChange={this.handleInputChange("year")}>
                                    <option value={'none'} >Year</option>
                                    {this.state.year_options.map((option) =>
                                        <option value={option.value}>{option.text}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label>Select Semester</label>
                                <select className="browser-default custom-select" onChange={this.handleInputChange("semester")}>
                                    <option value={'none'} >Semester</option>
                                    {this.state.semester_options.map((option) =>
                                        <option value={option.value}>{option.text}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label>Select Subject</label>
                                <select className="browser-default custom-select" onChange={this.handleInputChange("subject")}>
                                    <option value={'none'} >Subject</option>
                                    {this.state.subject_options.map((option) =>
                                        <option value={option.value}>{option.text}</option>
                                    )}
                                </select>
                            </div>

                        </form>
                    </MDBModalBody>
                    <MDBModalFooter className="justify-content-center">
                        <MDBBtn
                            color="info"
                            onClick={() => {

                                // this.addEvent();
                                if(this.addSummary()){
                                    this.toggleModal();
                                }
                                
                            }}
                        >
                            Add
                </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </React.Fragment>
        )
    }
}
export default DashBoard;


class Event extends Component {
    render() {
        return (
            <React.Fragment>
                <div class="card mb-5">
                    <p className="p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5">
                        {this.props.title}
                        {/* Alice - 2020Y/Sem2/Mathematics */}
                    </p>
                    <h3 className="h3-responsive font-weight-bold mr-3">
                        {/* Student Name */}
                        {this.props.student}
                    </h3>
                    <div className="media-body mb-3 mb-lg-3">
                        <hr className="hr-bold my-2" />
                        <h6 className="mt-0 font-weight-bold">Total Marks: {this.props.total}</h6>{" "}
                        <hr className="hr-bold my-2" />
                    </div>

                    <p className="p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5">
                        [YYYY/SEMESTER/SBJ] - {this.props.year}/{this.props.semester}/{this.props.subject}
                    </p>
                </div>

            </React.Fragment>
        );
    }
}