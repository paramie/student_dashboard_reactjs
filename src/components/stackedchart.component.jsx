import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Legend
} from '@devexpress/dx-react-chart-material-ui';


import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack, Animation } from '@devexpress/dx-react-chart';


const dataset = [{
    state: 'Germany',
    young: 6.7,
    middle: 28.6,
    older: 5.1,
}, {
    state: 'Japan',
    young: 9.6,
    middle: 43.4,
    older: 9,
}, {
    state: 'Russia',
    young: 13.5,
    middle: 49,
    older: 5.8,
}]


class StackedChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.dataset,
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
                                <ArgumentScale factory={scaleBand} />
                                <ArgumentAxis />
                                <ValueAxis />

                                <BarSeries
                                    valueField="maths"
                                    argumentField="year"
                                    name="Maths"
                                />
                                <BarSeries
                                    valueField="science"
                                    argumentField="year"
                                    name="Science"
                                />
                                <BarSeries
                                    valueField="english"
                                    argumentField="year"
                                    name="English"
                                />
                                <BarSeries
                                    valueField="history"
                                    argumentField="year"
                                    name="History"
                                />
                                <BarSeries
                                    valueField="ict"
                                    argumentField="year"
                                    name="ICT"
                                />
                                <BarSeries
                                    valueField="social"
                                    argumentField="year"
                                    name="Social"
                                />
                                <BarSeries
                                    valueField="econ"
                                    argumentField="year"
                                    name="Econ"
                                />
                                <BarSeries
                                    valueField="accounting"
                                    argumentField="year"
                                    name="Accounting"
                                />
                                <BarSeries
                                    valueField="commerce"
                                    argumentField="year"
                                    name="Commerce"
                                />
                                <Stack />
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

export default StackedChart;