import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../canvasjs.stock.min';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  addSymbols(e){
    const suffixes = ['', 'K', 'M', 'B'];
    let order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1) {
      order = suffixes.length - 1;
    }
    const suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }

  ngOnInit(): void {
    const dataPoints1 = [];
    const dataPoints2 = [];
    const dataPoints3 = [];
    const dataPoints4 = [];
    const dpsLength = 0;
    const chart = new CanvasJS.StockChart('chartContainer', {
      theme: 'light2',
      exportEnabled: true,
      title: {
        text: 'Bike Activity Chart'
      },
      subtitles: [{
        text: '10-10-2020'
      }],
      charts: [{
        toolTip: {
          shared: true
        },
        axisX: {
          lineThickness: 5,
          tickLength: 0,
          labelFormatter(e) {
            return '';
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter(e) {
              return '';
            }
          }
        },
        axisY: {
          tickLength: 0,
          title: 'Speed',
        },
        legend: {
          verticalAlign: 'top'
        },
        data: [{
          name: 'Speed',
          yValueFormatString: '#,### km/h',
          xValueFormatString: 'HH:mm:ss',
          dataPoints : dataPoints1
        }]
      }, {
        height: 100,
        toolTip: {
          shared: true
        },
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: 'HH:mm:ss'
          }
        },
        axisY: {
          prefix: '$',
          tickLength: 0,
          title: 'Power',
          labelFormatter: this.addSymbols
        },
        legend: {
          verticalAlign: 'top'
        },
        data: [{
          name: 'Power',
          yValueFormatString: '# W',
          xValueFormatString: 'HH:mm:ss',
          dataPoints : dataPoints2
        }]
      }
      , {
        height: 100,
        toolTip: {
          shared: true
        },
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: 'HH:mm:ss'
          }
        },
        axisY: {
          prefix: '$',
          tickLength: 0,
          title: 'Heart Rate',
          labelFormatter: this.addSymbols
        },
        legend: {
          verticalAlign: 'top'
        },
        data: [{
          name: 'Heart Rate',
          yValueFormatString: '# bpm',
          xValueFormatString: 'HH:mm:ss',
          dataPoints : dataPoints4
        }]
      }],
      navigator: {
        data: [{
          dataPoints: dataPoints3
        }],
        slider: {
          minimum: new Date('2018-10-10'),
          maximum: new Date('2018-09-10')
        }
      }
    });
    fetch('assets/data.json')
      .then( data => data.json())
      .then( data => {
      for (const e of data){
        console.log('x', new Date(e.timestamp));
        dataPoints1.push({x: new Date(e.timestamp), y: Number(e.speed)});
        dataPoints2.push({x: new Date(e.timestamp), y: Number(e.power)});
        dataPoints3.push({x: new Date(e.timestamp), y: Number(e.speed)});
        dataPoints4.push({x: new Date(e.timestamp), y: Number(e.heartrate)});
      }
      chart.render();
    });
  }
}
