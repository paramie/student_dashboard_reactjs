import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  SplineSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale, Animation } from '@devexpress/dx-react-chart';
  

class BarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
          data:this.props.dataset,
        };
      }
    
    render() {
        const { data: chartData } = this.state;
        return (
            <React.Fragment>
                <div class="card mb-5">
                    <p className="p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5">
                        Marks for subjects Chart [ {this.props.title} ]
                    </p>
                    
                    <div className="media-body mb-3 mb-lg-3">
                    <Paper>
                        <Chart
                        data={chartData}
                        >
                        <ValueScale name="marks" />
                        <ValueScale name="total" />

                        <ArgumentAxis />
                        <ValueAxis scaleName="marks" showGrid={false} showLine showTicks />
                        
                        <BarSeries
                            name="Total Marks"
                            valueField="total"
                            argumentField="subject"
                            scaleName="marks"
                        />

                        <SplineSeries
                            name="Average Marks"
                            valueField="average"
                            argumentField="subject"
                            scaleName="marks"
                        />
                        <Animation />
                        <Legend />
                        </Chart>
                    </Paper>
                    </div>
                <p className="p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5">
                        Filtered by - {this.props.filter}
                    </p>
                </div>

            </React.Fragment>
        );
    }
}

export default BarChart