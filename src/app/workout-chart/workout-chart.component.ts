import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
declare const Chart: any; // Add this line to declare Chart from the CDN

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css']
})
export class WorkoutChartComponent implements OnChanges {
  @Input() chartData: any;
  @Input() chartType: string = 'bar';

  @ViewChild('chartCanvas') private chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart?: any; // Change type to any

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] || changes['chartType']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (this.chart) {
      this.chart.destroy();
    }
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: this.chartType,
        data: {
          ...this.chartData,
          datasets: this.chartData.datasets.map((dataset: any) => ({
            ...dataset,
            backgroundColor: 'rgba(169,169,169, 0.8)', // Grey with a hint of black
            borderColor: 'rgba(105,105,105, 1)', // Darker grey
            borderWidth: 1
          }))
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem: any) {
                  return `${tooltipItem.label}: ${tooltipItem.raw} minutes`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
