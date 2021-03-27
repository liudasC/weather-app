import React, { Component } from 'react'
import styles from "./styles.module.css";
import wind from "../images/wind.png"
import sunny from "../images/sunny.png"
import sunnyCloud from "../images/sunny-cloud.webp"
import cloud from "../images/cloud.webp"

export class Weather extends Component {

    weatherImg = () => {
        if (this.props.data.cloudPercentage <= 15)
            return sunny
        if (this.props.data.cloudPercentage > 15 && this.props.data.cloudPercentage <= 65)
            return sunnyCloud
        if (this.props.data.cloudPercentage > 65)
            return cloud
    }

    windDirection = () => {
        // this.props.data.windDeg

    }


    render() {
        console.log(this.props.data);
        return (
            <div className={styles.Day}>

                <span>{this.props.data.weekDate}</span>
                <span>{this.props.data.temp} &#8451;</span>
                <span>Weather<img src={this.weatherImg()} alt="" width="40px" /></span>
                <span>Wind direct
                <img src={wind} alt="" width="40px" style={{ transform: `rotate(${180 + this.props.data.windDeg}deg)`}}/></span>


            </div>
        )
    }
}

export default Weather

