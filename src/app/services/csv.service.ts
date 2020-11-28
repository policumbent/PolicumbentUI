import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {BikeData} from '../models/bikeData.model';
import {Bike} from '../models/bike.model';

@Injectable({ providedIn: 'root' })
export class CsvService {
  private subject = new Subject<any>();
  downloadCsv(): void {
    this.subject.next({ message: 'csv' });
  }


  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  downloadFile(data: BikeData[], filename= 'data'): void {
    if (data.length === 0) {
      return;
    }
    // console.log(Object.keys(data[0]));
    const headers = Object.keys(data[0]).filter(e => e !== 'timestampT');
    console.log(headers);
    // const csvData = this.convertToCSV(data, ['name', 'age', 'average', 'approved', 'description']);
    const csvData = this.convertToCSV(data, headers);
    // console.log(csvData);
    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
    if (isSafariBrowser) {  // if Safari open in new window to save file with random filename.
      downloadLink.setAttribute('target', '_blank');
    }
    downloadLink.setAttribute('href', url);
    downloadLink.setAttribute('download', filename + '.csv');
    downloadLink.style.visibility = 'hidden';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  convertToCSV(objArray, headerList): string {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    headerList.forEach(element => {
      row += element + ',';
    });
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      headerList.forEach(element => {
        line += ',' + array[i][element];
      });
      str += line + '\r\n';
    }
    return str;
  }

  getFileName(startTime: Date, bikeName: string, deviceName: string): string{
    return `${startTime.getDate()}-${startTime.getMonth()}-${startTime.getDate()} ` +
      `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()} ` +
      `${bikeName} ${deviceName}`;
  }
}
