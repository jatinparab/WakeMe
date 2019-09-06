import React, {Component} from 'react'
import { Text as ReactText ,View } from 'react-native'
import { LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text } from 'react-native-svg'

class Chart extends Component {

    constructor(props){
        super(props);
        this.state = { 
            chartData: [ 65, 70, 67, 65, 66, 74, 75, 71, 75, 73, 73, 74, 70, 70, 70 ]
        };
    }

    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
     }

    componentDidMount(){
      // Toggle the state every second
      
      setInterval(() => (
        this.setState(previousState => (
          { chartData: [...previousState.chartData.slice(1,16), this.randomInt(65,75)] }
        ))
      ), 5000); 
      
    }
  

  
    render() {
        const data = this.state.chartData;

        /**
         * Both below functions should preferably be their own React Components
         */

        const HorizontalLine = (({ y }) => (
            <Line
                key={ 'zero-axis' }
                x1={ '0%' }
                x2={ '100%' }
                y1={ y(50) }
                y2={ y(50) }
                stroke={ 'grey' }
                strokeDasharray={ [ 4, 8 ] }
                strokeWidth={ 2 }
            />
        ))

        const Tooltip = ({ x, y }) => (
            <G
                x={ x(5) - (75 / 2) }
                key={ 'tooltip' }
                onPress={ () => console.log('tooltip clicked') }
            >
                <G y={ 50 }>
                    <Rect
                        height={ 40 }
                        width={ 75 }
                        stroke={ 'grey' }
                        fill={ 'white' }
                        ry={ 10 }
                        rx={ 10 }
                    />
                    <Text
                        x={ 75 / 2 }
                        dy={ 20 }
                        alignmentBaseline={ 'middle' }
                        textAnchor={ 'middle' }
                        stroke={ 'rgb(134, 65, 244)' }
                    >
                        { `${data[13]}C` }
                    </Text>
                </G>
                <G x={ 75 / 2 }>
                    
                    <Circle
                        cy={ y(data[ 13 ]) }
                        r={ 7 }
                        stroke={ 'rgb(134, 65, 244)' }
                        strokeWidth={ 2 }
                        fill={ 'white' }
                    />
                </G>
            </G>
        )

        return (
            <View>
            <LineChart
                style={{ height: 150 }}
                data={ data }
                svg={{
                    stroke: 'rgb(134, 65, 244)',
                    strokeWidth: 2,
                }}
                yMin={0}
                yMax={70}
                contentInset={{ top: 20, bottom: 20 }}
                curve={ shape.curveLinear }
            >
                <Grid/>
                <HorizontalLine/>
                <Tooltip/>

            </LineChart>
            <ReactText style={{color:'white', fontSize:35}}> Current Skin Conductance: {this.state.chartData.slice(-2,-1)} </ReactText>

            </View>
        )
    }

}
  
  export default function SkinChart(){
      return (
        <View>
          <Chart />
        </View>
      );
  }
  