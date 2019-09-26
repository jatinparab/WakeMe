import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Path } from 'react-native-svg'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import socket from '../../services/socket-client'


class Chart extends Component {

    constructor(props){
        super(props);
        this.state = { 
            chartData: this.shuffle([ 81, 68, 74, 70, 76, 83, 60, 62, 74, 78, 81, 86, 77, 83, 85 ]) 
        };

        socket.on('sensor', (d) => {
            console.log(d);

            this.setState(previousState =>({
                chartData: [...previousState.chartData.slice(1,15), this.stringToJSON(d).BPM],
                data: this.stringToJSON(d).BPM
            }));
            //this.setState({data: d, chartData: [...this.state.chartData, d]})
        })
    }

    stringToJSON(string){
        return JSON.parse(string)
    }

    shuffle(arr){
        var i,
        j,
        temp;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
     }

    componentDidMount(){
      // Toggle the state every second
      
    //   setInterval(() => (
    //     this.setState(previousState => (
    //       { chartData: [...previousState.chartData.slice(1,16), this.randomInt(65,75)] }
    //     ))
    //   ), 2000); 
      
    }
  

  
    render() {
        const data = this.state.chartData;
        const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'rgb(200, 60, 0)'}
                fill={'none'}
            />
        )

        return (
            <View>
                <AreaChart
                    yMax={90}
                    yMin={50}

                    style={{ height: 200 }}
                    data={data}
                    contentInset={{ top: 30, bottom: 30 }}
                    curve={shape.curveNatural}
                    svg={{ fill: 'rgba(200, 60, 0, 0.2)' }}
                    >
                    <Grid/>
                    <Line/>
                </AreaChart>
                <Text style={{color:'white', fontSize:35}}> Current Heart Rate: {this.state.data} BPM </Text>
            </View>
            
        )
    }

}
  
  export default function HeartChart(){
      return (
        <View>
          <Chart />
        </View>
      );
  }
  