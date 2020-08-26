import { ElementRef, Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { Dashboard1Data } from '../model/dashboard1data';
import { Dashboard2Data } from '../model/dashboard2data';
import { Dashboard5Data } from '../model/dashboard5data';
import { Dashboard4Data } from '../model/dashboard4data';
import { MONTHS, PIE_COLOR } from '../other/constant';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  public static drawDashboard1Chart(data: Dashboard1Data[], canvas: ElementRef): Chart {
    const planned = data.map(dataUnit => dataUnit.planned);
    const inFact = data.map(dataUnit => dataUnit.actual);

    const ctx = canvas.nativeElement.getContext('2d');

    const blueGradient = ctx.createLinearGradient(0, 0, 0, 400);
    blueGradient.addColorStop(0, '#1d8eba');
    blueGradient.addColorStop(1, '#0e6ea0');

    const purpleGradient = ctx.createLinearGradient(0, 0, 0, 400);
    purpleGradient.addColorStop(0, '#bf7bad');
    purpleGradient.addColorStop(1, '#a85b93');

    const dataArray = [
      {
        label: 'PLAN',
        backgroundColor: '#316FFF',
        hoverBackgroundColor: '#316FFF',
        data: planned,
        datalabels: {
          color: '#316FFF',
        }
      },
      {
        label: 'FACT',
        backgroundColor: '#8EB0FF',
        hoverBackgroundColor: '#8EB0FF',
        data: inFact,
        datalabels: {
          color: '#8EB0FF',
        }
      }
    ]

    const options = {
      //events: [],
      responsive: true,
      maintainAspectRatio: false,
      hover: {
        animationDuration: 0
      },
      plugins: {
        datalabels: {
          align: 'center',
          anchor: 'center',
          font: {
            size: '18',
            weight: '700'
          },
          rotation: 270,
          formatter: function (value) {
            return value !== 0 ? value : null;
          }
        }
      },
      legend: {
        onClick: (e) => e.stopPropagation(),
        display: true,
        position: 'top',
        labels: {
          fontFamily: '\'Montserrat\', sans-serif',
          fontSize: 16,
          fontColor: '#000'
        }
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return tooltipItem.yLabel.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
          }
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontSize: 16,
            fontStyle: 'bold'
            //fontColor: '#000'                           
          }
        }],
        xAxes: [{
          ticks: {
            fontSize: 16,
            fontStyle: 'bold',
            //fontColor: '#000'   
            //padding: 50                    
          }
        },
        {
          type: 'category',
          offset: true,
          position: 'top',
          ticks: {
            fontColor: "#000",
            fontSize: 18,
            fontStyle: 'bold',
            callback: function (value, index, values) {
              // let total = 0;
              // for (let i = 0; i < dataArray.length; i++)
              //   total += dataArray[i].data[index];
              // if (total != 0)
              return "";
            }
          }
        }
        ]
      },
      animation: {
        duration: 1,
        onComplete: function () {
          var chartInstance = this.chart,
            ctx = chartInstance.ctx;
          var fontSize = 16;
          var fontStyle = 'bold';
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'center';

          this.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
              if (dataset.data[index] > 0) {
                var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                ctx.save();
                ctx.translate(bar._model.x, bar._model.y);
                //ctx.translate(bar._model.x, bar._model.y + bar.height() / 2);
                ctx.rotate(-0.5 * Math.PI);
                ctx.fillText(data, 35, 0);
                ctx.restore();
              }
            });
          });
        }
      },
      onResize: function (chart, size) {
        chart.options.scales.xAxes[0].ticks.display = size.width > 0;       
        //chart.options.scales.yAxes[0].ticks.display = size.width > 300;       
        //chart.options.legend.display = size.width > 300;        
        if (size.width <= 300) {
          chart.options.animation.onComplete = function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            var fontSize = 8;
            var fontStyle = 'normal';
            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'center';
  
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                if (dataset.data[index] > 0) {
                  //if (dataset.label == 'PLAN'){
                  var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  ctx.save();
                  ctx.translate(bar._model.x, bar._model.y);                 
                  ctx.rotate(-0.5 * Math.PI);
                  ctx.fillText(data, 35, 0);
                  ctx.restore();
                  //}
                  // if (dataset.label == 'FACT'){
                  //   var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  //   ctx.save();
                  //   ctx.translate(bar._model.x, bar._model.y + bar.height());                    
                  //   ctx.rotate(0.5 * Math.PI);
                  //   ctx.fillText(data, 25, 0);
                  //   ctx.restore();
                  //   }
                }
              });
            });
          };

          chart.options.scales.yAxes[0].ticks.fontSize = 11;

          chart.options.scales.xAxes[0].ticks.fontSize = 9;
          chart.options.scales.xAxes[0].ticks.maxRotation = 90;
          chart.options.scales.xAxes[0].ticks.minRotation = 90;
          chart.options.scales.xAxes[0].ticks.autoSkip = false;
          chart.options.scales.xAxes[0].ticks.padding = 0;

          chart.options.legend.labels.fontSize = 9;
          chart.options.legend.labels.boxWidth = 10;          
        }
        chart.update();
      }
    }

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: MONTHS,
        datasets: dataArray
      },
      options: options
    });
  }

  public static drawDashboard2Chart(data: Dashboard2Data[], canvas: ElementRef) {
    const planProfit = data.map(dataUnit => dataUnit.p_profit);
    const planExpenses = data.map(dataUnit => dataUnit.p_expenses);
    const planSalary = data.map(dataUnit => dataUnit.p_salary);
    const factProfit = data.map(dataUnit => dataUnit.f_profit);
    const factExpenses = data.map(dataUnit => dataUnit.f_expenses);
    const factSalary = data.map(dataUnit => dataUnit.f_salary);

    const ctx = canvas.nativeElement.getContext('2d');

    const dataArray = [
      {
        label: 'REVENUES PLAN',
        backgroundColor: '#316FFF',
        hoverBackgroundColor: '#316FFF',
        stack: '0',
        data: planProfit,
        datalabels: {
          color: '#316FFF',
        }
      },
      {
        label: 'SALARY PLAN',
        backgroundColor: 'crimson',
        hoverBackgroundColor: 'crimson',
        stack: '1',
        data: planSalary,
        datalabels: {
          color: 'crimson',
        }
      },
      {
        label: 'EXPENSES PLAN',
        backgroundColor: '#71c016',
        hoverBackgroundColor: '#71c016',
        stack: '1',
        data: planExpenses,
        datalabels: {
          color: '#71c016',
        }
      },
      {
        label: 'ACTUAL REVENUES',
        backgroundColor: '#8EB0FF',
        hoverBackgroundColor: '#8EB0FF',
        stack: '2',
        data: factProfit,
        datalabels: {
          color: '#8EB0FF',
        }
      },
      {
        label: 'ACTUAL SALARY',
        backgroundColor: '#f1617e',
        hoverBackgroundColor: '#f1617e',
        stack: '3',
        data: factSalary,
        datalabels: {
          color: '#f1617e',
        }
      },
      {
        label: 'ACTUAL EXPENSES',
        backgroundColor: '#A9D973',
        hoverBackgroundColor: '#A9D973',
        stack: '3',
        data: factExpenses,
        datalabels: {
          color: '#A9D973',
        }
      }
    ]

    const options = {
      //events: [],   
      responsive: true,
      maintainAspectRatio: false,
      hover: {
        animationDuration: 0
      },
      plugins: {
        datalabels: {
          display: true,
          align: 'center',
          anchor: 'center',
          font: {
            size: '18',
            weight: '700'
          },
          rotation: 270,
          formatter: function (value, context) {
            return value !== 0 ? value : null;
          }
        }
      },
      legend: {
        onClick: (e) => e.stopPropagation(),
        display: true,
        position: 'top',
        //align:'start',       
        labels: {
          fontFamily: '\'Montserrat\', sans-serif',
          fontSize: 14,
          fontColor: '#000',  
        //   generateLabels: function(chart) {            
        //     var dataset = chart.data.datasets;
        //     const labels = chart.data.datasets.map(ds => ds.label);            
        //     var legend = labels.map(function(label, index) {
        //        return {
        //           datasetIndex: 0,
        //           fillStyle: dataset[index].backgroundColor,                  
        //           text: label
        //        }
        //     });
        //     return legend;
        //  }        
        }
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return tooltipItem.yLabel.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
          }
        }
      },
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            fontSize: 15,
            fontStyle: 'normal',
            padding: 100
          }
        },
        {
          type: 'category',
          offset: true,
          position: 'top',
          ticks: {
            fontColor: "#000",
            fontSize: 18,
            fontStyle: 'bold',
            callback: function (value, index, values) {
              // let total = 0;
              // for (let i = 0; i < dataArray.length; i++)
              //   total += dataArray[i].data[index];
              // if (total != 0)
              return "";
            }
          }
        }
        ],
        yAxes: [{
          stacked: true,
          ticks: {
            fontSize: 15,
            fontStyle: 'normal'
          },
        }],
      },
      animation: {
        duration: 1,
        onComplete: function () {
          var chartInstance = this.chart,
            ctx = chartInstance.ctx;
          var fontSize = 15;
          var fontStyle = 'normal';
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'center';

          this.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
              if (dataset.data[index] > 0) {
                if (dataset.stack == '0') {
                  var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  ctx.save();
                  ctx.translate(bar._model.x, bar._model.y + bar.height());
                  ctx.rotate(0.5 * Math.PI);
                  ctx.fillText(data, 35, 0);
                  ctx.restore();
                }
                else if (dataset.stack == '1' && dataset.label == 'EXPENSES PLAN') {
                  var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  ctx.save();
                  ctx.translate(bar._model.x, bar._model.y);
                  ctx.rotate(-0.5 * Math.PI);
                  ctx.fillText(data, 35, 0);
                  ctx.restore();
                }
                else if (dataset.stack == '1' && dataset.label == 'SALARY PLAN') {
                  var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  ctx.save();
                  ctx.translate(bar._model.x, bar._model.y + bar.height());
                  ctx.rotate(0.5 * Math.PI);
                  ctx.fillText(data, 35, 0);
                  ctx.restore();
                }
                else if (dataset.stack == '2') {
                  var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  ctx.save();
                  ctx.translate(bar._model.x, bar._model.y + bar.height());
                  ctx.rotate(0.5 * Math.PI);
                  ctx.fillText(data, 35, 0);
                  ctx.restore();
                }
                else if (dataset.stack == '3' && dataset.label == 'ACTUAL EXPENSES') {
                  var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  ctx.save();
                  ctx.translate(bar._model.x, bar._model.y);
                  ctx.rotate(-0.5 * Math.PI);
                  ctx.fillText(data, 35, 0);
                  ctx.restore();
                }
                else if (dataset.stack == '3' && dataset.label == 'ACTUAL SALARY') {
                  var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  ctx.save();
                  ctx.translate(bar._model.x, bar._model.y + bar.height());
                  ctx.rotate(0.5 * Math.PI);
                  ctx.fillText(data, 35, 0);
                  ctx.restore();
                }
              }
            });
          });
        }
      },
      onResize: function (chart, size) {        
        chart.options.scales.xAxes[0].ticks.display = size.width > 0;
        //chart.options.scales.yAxes[0].ticks.display = size.width > 300;       
        //chart.options.legend.display = size.width > 300; 
        if (size.width <= 300) {          
          chart.options.animation.onComplete = function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            var fontSize = 8;
            var fontStyle = 'normal';
            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'center';
  
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                if (dataset.data[index] > 0) {
                  if (dataset.stack == '0') {
                    var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                    ctx.save();
                    ctx.translate(bar._model.x, bar._model.y + bar.height());
                    ctx.rotate(0.5 * Math.PI);
                    ctx.fillText(data, 35, 0);
                    ctx.restore();
                  }
                  else if (dataset.stack == '1' && dataset.label == 'EXPENSES PLAN') {
                    var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                    ctx.save();
                    ctx.translate(bar._model.x, bar._model.y);
                    ctx.rotate(-0.5 * Math.PI);
                    ctx.fillText(data, 35, 0);
                    ctx.restore();
                  }
                  else if (dataset.stack == '1' && dataset.label == 'SALARY PLAN') {
                    var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                    ctx.save();
                    ctx.translate(bar._model.x, bar._model.y + bar.height());
                    ctx.rotate(0.5 * Math.PI);
                    ctx.fillText(data, 35, 0);
                    ctx.restore();
                  }
                  else if (dataset.stack == '2') {
                    var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                    ctx.save();
                    ctx.translate(bar._model.x, bar._model.y + bar.height());
                    ctx.rotate(0.5 * Math.PI);
                    ctx.fillText(data, 35, 0);
                    ctx.restore();
                  }
                  else if (dataset.stack == '3' && dataset.label == 'ACTUAL EXPENSES') {
                    var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                    ctx.save();
                    ctx.translate(bar._model.x, bar._model.y);
                    ctx.rotate(-0.5 * Math.PI);
                    ctx.fillText(data, 35, 0);
                    ctx.restore();
                  }
                  else if (dataset.stack == '3' && dataset.label == 'ACTUAL SALARY') {
                    var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                    ctx.save();
                    ctx.translate(bar._model.x, bar._model.y + bar.height());
                    ctx.rotate(0.5 * Math.PI);
                    ctx.fillText(data, 35, 0);
                    ctx.restore();
                  }
                }
              });
            });
          };

          chart.options.scales.yAxes[0].ticks.fontSize = 11;          

          chart.options.scales.xAxes[0].ticks.fontSize = 9;
          chart.options.scales.xAxes[0].ticks.maxRotation = 90;
          chart.options.scales.xAxes[0].ticks.minRotation = 90;
          chart.options.scales.xAxes[0].ticks.autoSkip = false;
          chart.options.scales.xAxes[0].ticks.padding = 60;

          chart.options.legend.labels.fontSize = 9;
          chart.options.legend.labels.boxWidth = 10;
          chart.options.legend.align = 'start';
        }
        chart.update();
      }
    }

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: MONTHS, 
        datasets: dataArray
      },
      options: options
    });
  }

  public static drawDashboard5Chart(data: Dashboard5Data[], canvas: ElementRef): Chart {
    const ctx = canvas.nativeElement.getContext('2d');
    const sales = data.map(dataUnit => dataUnit.sales);

    // const blueGradient = ctx.createLinearGradient(0, 0, 0, 400);
    // blueGradient.addColorStop(0, '#1d8eba');
    // blueGradient.addColorStop(1, '#0e6ea0');

    const dataArray = [
      {
        label: 'SALE',
        backgroundColor: '#316FFF',
        hoverBackgroundColor: '#1d8eba',
        data: sales,
        datalabels: {
          color: '#316FFF'
        }
      },
    ]

    const options = {
      //events: [],   
      responsive: true,
      maintainAspectRatio: false,
      hover: {
        animationDuration: 0
      },
      plugins: {
        datalabels: {
          align: 'center',
          anchor: 'center',
          font: {
            size: '25',
            weight: '700'
          },
          rotation: 270,
          formatter: function (value) {
            if (value === 0) {
              return null;
            } else if (value > 1000000) {
              return Math.floor(value / 1000000) + 'KK';
            } else if (value > 1000) {
              return Math.floor(value / 1000) + 'K';
            }
            return value;
          }
        }
      },
      legend: {
        onClick: (e) => e.stopPropagation(),
        display: true,
        position: 'top',
        labels: {
          fontFamily: '\'Montserrat\', sans-serif',
          fontSize: 16,
          fontColor: '#000'
        }
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return tooltipItem.yLabel.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
          }
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontSize: 16,
            fontStyle: 'bold',
            //fontColor: '#000'                  
          }
        }],
        xAxes: [{
          ticks: {
            fontSize: 16,
            fontStyle: 'bold',
            //fontColor: '#000' 
          }
        },
        {
          type: 'category',
          offset: true,
          position: 'top',
          ticks: {
            fontColor: "#000",
            fontSize: 18,
            fontStyle: 'bold',
            callback: function (value, index, values) {
              // let total = 0;
              // for (let i = 0; i < dataArray.length; i++)
              //   total += dataArray[i].data[index];
              // if (total != 0)
              return "";
            }
          }
        }
        ]
      },
      animation: {
        duration: 1,
        onComplete: function () {
          var chartInstance = this.chart,
            ctx = chartInstance.ctx;
          var fontSize = 16;
          var fontStyle = 'bold';
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'center';

          this.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
              if (dataset.data[index] > 0) {
                var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                ctx.save();
                ctx.translate(bar._model.x, bar._model.y);
                ctx.rotate(-0.5 * Math.PI);
                ctx.fillText(data, 35, 0);
                ctx.restore();
                //var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                //ctx.fillText(data, bar._model.x, bar._model.y - 10);
              }
            });
          });
        }
      },
      onResize: function (chart, size) {
        chart.options.scales.xAxes[0].ticks.display = size.width > 0;
        //chart.options.scales.yAxes[0].ticks.display = size.width > 300;       
        //chart.options.legend.display = size.width > 300; 
        if (size.width <= 300) {         
          chart.options.animation.onComplete =  function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            var fontSize = 8;
            var fontStyle = 'normal';
            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'center';
  
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                if (dataset.data[index] > 0) {
                  var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  ctx.save();
                  ctx.translate(bar._model.x, bar._model.y);
                  ctx.rotate(-0.5 * Math.PI);
                  ctx.fillText(data, 35, 0);
                  ctx.restore();                  
                }
              });
            });
          };       

          chart.options.scales.yAxes[0].ticks.fontSize = 11;

          chart.options.scales.xAxes[0].ticks.fontSize = 9;
          chart.options.scales.xAxes[0].ticks.maxRotation = 90;
          chart.options.scales.xAxes[0].ticks.minRotation = 90;
          chart.options.scales.xAxes[0].ticks.autoSkip = false;
          chart.options.scales.xAxes[0].ticks.padding = 0;

          chart.options.legend.labels.fontSize = 9;
          chart.options.legend.labels.boxWidth = 10;         
        }
        chart.update();
      }
    }

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: MONTHS,
        datasets: dataArray
      },
      options: options
    });
  }

  public static drawDashboard4Chart(data: Dashboard4Data[], canvas: ElementRef) {
    const planProfit = data.map(dataUnit => dataUnit.p_profit);
    const planExpenses = data.map(dataUnit => dataUnit.p_expenses);
    const planSalary = data.map(dataUnit => dataUnit.p_salary);
    const factProfit = data.map(dataUnit => dataUnit.f_profit);
    const factExpenses = data.map(dataUnit => dataUnit.f_expenses);
    const factSalary = data.map(dataUnit => dataUnit.f_salary);

    const ctx = canvas.nativeElement.getContext('2d');

    const dataArray = [
      {
        label: 'REVENUES PLAN',
        backgroundColor: '#316FFF',
        hoverBackgroundColor: '#316FFF',
        stack: '0',
        data: planProfit,
        datalabels: {
          color: '#316FFF',
        }
      },
      {
        label: 'SALARY PLAN',
        backgroundColor: 'crimson',
        hoverBackgroundColor: 'crimson',
        stack: '1',
        data: planSalary,
        datalabels: {
          color: 'crimson',
        }
      },
      {
        label: 'EXPENSES PLAN',
        backgroundColor: '#71c016',
        hoverBackgroundColor: '#71c016',
        stack: '1',
        data: planExpenses,
        datalabels: {
          color: '#71c016',
        }
      },
      {
        label: 'ACTUAL REVENUES',
        backgroundColor: '#8EB0FF',
        hoverBackgroundColor: '#8EB0FF',
        stack: '2',
        data: factProfit,
        datalabels: {
          color: '#8EB0FF',
        }
      },
      {
        label: 'ACTUAL SALARY',
        backgroundColor: '#f1617e',
        hoverBackgroundColor: '#f1617e',
        stack: '3',
        data: factSalary,
        datalabels: {
          color: '#f1617e',
        }
      },
      {
        label: 'ACTUAL EXPENSES',
        backgroundColor: '#A9D973',
        hoverBackgroundColor: '#A9D973',
        stack: '3',
        data: factExpenses,
        datalabels: {
          color: '#A9D973',
        }
      }
    ]

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      hover: {
        animationDuration: 0
      },
      plugins: {
        datalabels: {
          align: 'center',
          anchor: 'center',
          font: {
            size: '18',
            weight: '700'
          },
          rotation: 270,
          formatter: function (value, context) {
            return value !== 0 ? value : null;
          }
        }
      },
      legend: {
        onClick: (e) => e.stopPropagation(),
        display: true,
        position: 'top',
        labels: {
          fontFamily: '\'Montserrat\', sans-serif',
          fontSize: 14,
          fontColor: '#000'
        }
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return tooltipItem.yLabel.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
          }
        }
      },
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            fontSize: 15,
            fontStyle: 'normal',
            padding: 75
          }
        },
        {
          type: 'category',
          offset: true,
          position: 'top',
          ticks: {
            fontColor: "#000",
            fontSize: 18,
            fontStyle: 'bold',
            callback: function (value, index, values) {
              // let total = 0;
              // for (let i = 0; i < dataArray.length; i++)
              //   total += dataArray[i].data[index];
              // if (total != 0)
              return "";
            }
          }
        }
        ],
        yAxes: [{
          stacked: true,
          ticks: {
            fontSize: 15,
            fontStyle: 'normal',
          },
        }
        ],
      },
      animation: {
        duration: 1,
        onComplete: function () {
          var chartInstance = this.chart,
            ctx = chartInstance.ctx;
          var fontSize = 15;
          var fontStyle = 'normal';
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'center';

          this.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
              if (dataset.data[index] > 0) {
                if (dataset.stack == '0') {
                  var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  ctx.save();
                  ctx.translate(bar._model.x, bar._model.y + bar.height());
                  ctx.rotate(0.5 * Math.PI);
                  ctx.fillText(data, 35, 0);
                  ctx.restore();
                }
                else if (dataset.stack == '1' && dataset.label == 'EXPENSES PLAN') {
                  var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  ctx.save();
                  ctx.translate(bar._model.x, bar._model.y);
                  ctx.rotate(-0.5 * Math.PI);
                  ctx.fillText(data, 35, 0);
                  ctx.restore();
                }
                else if (dataset.stack == '1' && dataset.label == 'SALARY PLAN') {
                  var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  ctx.save();
                  ctx.translate(bar._model.x, bar._model.y + bar.height());
                  ctx.rotate(0.5 * Math.PI);
                  ctx.fillText(data, 35, 0);
                  ctx.restore();
                }
                else if (dataset.stack == '2') {
                  var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  ctx.save();
                  ctx.translate(bar._model.x, bar._model.y + bar.height());
                  ctx.rotate(0.5 * Math.PI);
                  ctx.fillText(data, 35, 0);
                  ctx.restore();
                }
                else if (dataset.stack == '3' && dataset.label == 'ACTUAL EXPENSES') {
                  var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  ctx.save();
                  ctx.translate(bar._model.x, bar._model.y);
                  ctx.rotate(-0.5 * Math.PI);
                  ctx.fillText(data, 35, 0);
                  ctx.restore();
                }
                else if (dataset.stack == '3' && dataset.label == 'ACTUAL SALARY') {
                  var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                  ctx.save();
                  ctx.translate(bar._model.x, bar._model.y + bar.height());
                  ctx.rotate(0.5 * Math.PI);
                  ctx.fillText(data, 35, 0);
                  ctx.restore();
                }
              }
            });
          });
        }
      },
      onResize: function (chart, size) {
        chart.options.scales.xAxes[0].ticks.display = size.width > 0;       
        //chart.options.scales.yAxes[0].ticks.display = size.width > 300;       
        //chart.options.legend.display = size.width > 300; 
        if (size.width <= 300) {
          chart.options.animation.onComplete = function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            var fontSize = 8;
            var fontStyle = 'normal';
            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'center';
  
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                if (dataset.data[index] > 0) {
                  if (dataset.stack == '0') {
                    var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                    ctx.save();
                    ctx.translate(bar._model.x, bar._model.y + bar.height());
                    ctx.rotate(0.5 * Math.PI);
                    ctx.fillText(data, 35, 0);
                    ctx.restore();
                  }
                  else if (dataset.stack == '1' && dataset.label == 'EXPENSES PLAN') {
                    var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                    ctx.save();
                    ctx.translate(bar._model.x, bar._model.y);
                    ctx.rotate(-0.5 * Math.PI);
                    ctx.fillText(data, 35, 0);
                    ctx.restore();
                  }
                  else if (dataset.stack == '1' && dataset.label == 'SALARY PLAN') {
                    var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                    ctx.save();
                    ctx.translate(bar._model.x, bar._model.y + bar.height());
                    ctx.rotate(0.5 * Math.PI);
                    ctx.fillText(data, 35, 0);
                    ctx.restore();
                  }
                  else if (dataset.stack == '2') {
                    var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                    ctx.save();
                    ctx.translate(bar._model.x, bar._model.y + bar.height());
                    ctx.rotate(0.5 * Math.PI);
                    ctx.fillText(data, 35, 0);
                    ctx.restore();
                  }
                  else if (dataset.stack == '3' && dataset.label == 'ACTUAL EXPENSES') {
                    var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                    ctx.save();
                    ctx.translate(bar._model.x, bar._model.y);
                    ctx.rotate(-0.5 * Math.PI);
                    ctx.fillText(data, 35, 0);
                    ctx.restore();
                  }
                  else if (dataset.stack == '3' && dataset.label == 'ACTUAL SALARY') {
                    var data = dataset.data[index].toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
                    ctx.save();
                    ctx.translate(bar._model.x, bar._model.y + bar.height());
                    ctx.rotate(0.5 * Math.PI);
                    ctx.fillText(data, 35, 0);
                    ctx.restore();
                  }
                }
              });
            });
          };

          chart.options.scales.yAxes[0].ticks.fontSize = 11;

          chart.options.scales.xAxes[0].ticks.fontSize = 9;
          chart.options.scales.xAxes[0].ticks.maxRotation = 90;
          chart.options.scales.xAxes[0].ticks.minRotation = 90;
          chart.options.scales.xAxes[0].ticks.autoSkip = false;
          chart.options.scales.xAxes[0].ticks.padding = 60;

          chart.options.legend.labels.fontSize = 9;
          chart.options.legend.labels.boxWidth = 10;
          chart.options.legend.align = 'start';
        }
        chart.update();
      }
    }

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: MONTHS,
        datasets: dataArray
      },
      options: options
    });
  }

  public static drawDashboard6Chart(employeeSells, canvas: ElementRef): Chart {
    const ctx = canvas.nativeElement.getContext('2d');
    const sales = employeeSells.map(dataUnit => dataUnit.SellAmount);
    const employees = employeeSells.map(dataUnit => dataUnit.EmployeeName);

    Chart.defaults.doughnutLabels = Chart.helpers.clone(Chart.defaults.doughnut);

    var helpers = Chart.helpers;
    var defaults = Chart.defaults;

    Chart.controllers.doughnutLabels = Chart.controllers.doughnut.extend({
      updateElement: function (arc, index, reset) {
        var _this = this;
        var chart = _this.chart,
          chartArea = chart.chartArea,
          opts = chart.options,
          animationOpts = opts.animation,
          arcOpts = opts.elements.arc,
          centerX = (chartArea.left + chartArea.right) / 2,
          centerY = (chartArea.top + chartArea.bottom) / 2,
          startAngle = opts.rotation, // non reset case handled later
          endAngle = opts.rotation, // non reset case handled later
          dataset = _this.getDataset(),
          circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : _this.calculateCircumference(dataset.data[index]) * (opts.circumference / (2.0 * Math.PI)),
          innerRadius = reset && animationOpts.animateScale ? 0 : _this.innerRadius,
          outerRadius = reset && animationOpts.animateScale ? 0 : _this.outerRadius,
          custom = arc.custom || {},
          valueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;

        helpers.extend(arc, {
          // Utility
          _datasetIndex: _this.index,
          _index: index,

          // Desired view properties
          _model: {
            x: centerX + chart.offsetX,
            y: centerY + chart.offsetY,
            startAngle: startAngle,
            endAngle: endAngle,
            circumference: circumference,
            outerRadius: outerRadius,
            innerRadius: innerRadius,
            label: valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
          },

          draw: function () {
            var ctx = this._chart.ctx,
              vm = this._view,
              sA = vm.startAngle,
              eA = vm.endAngle,
              opts = this._chart.config.options;

            var labelPos = this.tooltipPosition();
            var segmentLabel = vm.circumference / opts.circumference * 100;

            ctx.beginPath();

            ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
            ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);

            ctx.closePath();
            ctx.strokeStyle = vm.borderColor;
            ctx.lineWidth = vm.borderWidth;

            ctx.fillStyle = vm.backgroundColor;

            ctx.fill();
            ctx.lineJoin = 'bevel';

            if (vm.borderWidth) {
              ctx.stroke();
            }

            if (vm.circumference > 0.35) { // Trying to hide label when it doesn't fit in segment
              ctx.beginPath();
              var fontSize = 14;
              var fontStyle = 'bold';
              ctx.font = helpers.fontString(fontSize, fontStyle, opts.defaultFontFamily);
              ctx.fillStyle = "#000";
              ctx.textBaseline = "center";
              ctx.textAlign = "center";

              // Round percentage in a way that it always adds up to 100%
              ctx.fillText(segmentLabel.toFixed(2) + "%", labelPos.x, labelPos.y);
            }
          }
        });

        var model = arc._model;
        model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueAtIndexOrDefault(dataset.backgroundColor, index, arcOpts.backgroundColor);
        model.hoverBackgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueAtIndexOrDefault(dataset.hoverBackgroundColor, index, arcOpts.hoverBackgroundColor);
        model.borderWidth = custom.borderWidth ? custom.borderWidth : valueAtIndexOrDefault(dataset.borderWidth, index, arcOpts.borderWidth);
        model.borderColor = custom.borderColor ? custom.borderColor : valueAtIndexOrDefault(dataset.borderColor, index, arcOpts.borderColor);

        // Set correct angles if not resetting
        if (!reset || !animationOpts.animateRotate) {
          if (index === 0) {
            model.startAngle = opts.rotation;
          } else {
            model.startAngle = _this.getMeta().data[index - 1]._model.endAngle;
          }

          model.endAngle = model.startAngle + model.circumference;
        }

        arc.pivot();
      }
    });

    var config = {
      type: 'doughnutLabels',
      data: {
        datasets: [{
          data: sales,
          backgroundColor: PIE_COLOR,
          label: 'Dataset 1'
        }],
        labels: employees
      },
      options: {
        events: [],
        responsive: true,
        //responsiveAnimationDuration: 1000,
        maintainAspectRatio: false,
        legend: {
          onClick: (e) => e.stopPropagation(),
          display: true,
          position: 'top',
          align: 'start',
          labels: {
            fontFamily: '\'Montserrat\', sans-serif',
            fontSize: 13,
            fontColor: '#000'
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        onResize: function (chart, size) {          
          if (size.width <= 300) {           
            chart.options.legend.labels.fontSize = 9;
            chart.options.legend.labels.boxWidth = 10;
            chart.options.legend.align = 'start';
          }
          chart.update();
        }
      }
    };

    new Chart(ctx, config);
  } 
}
