import React, { Component } from "react";

class SummaryCard extends Component {

    render() {
        return (
            <React.Fragment>
                <div class="card mb-5">
                    <p className="p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5">
                        Total Marks for the {this.props.filter}
                    </p>
                    <h3 className="h3-responsive font-weight-bold mr-3">
                        Filtered By - {this.props.filter}
                    </h3>
                    <div className="media-body mb-3 mb-lg-3">
                        <hr className="hr-bold my-2" />
                        <h6 className="mt-0 font-weight-bold">Total Marks: {this.props.total}</h6>{" "}
                        <hr className="hr-bold my-2" />
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default SummaryCard