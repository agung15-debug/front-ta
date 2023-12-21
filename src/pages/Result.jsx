import { useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
function Result({res}){
    const options = {
        responsive : true,
        plugins:{
            legend : {
                display : false,
            }
        
        },
        scales: {
            x : {
                title : {
                    display : true,
                    text : 'Time (s)'
                },
                ticks : {
                    autoSkip : true,
                    autoSkipPadding : 10,
                    maxTicksLimit : 20,
                    maxRotation : 0,
                    minRotation : 0,
                }
            },
            y :{
                title : {
                    display : true,
                    text : 'Amplitude'
                },
            }
        }
      };
      const original_data = {
        labels: res.signal_data.labels,
        datasets: [
          {
            label: res.signal_data.datasets[0].label,
            data: res.signal_data.datasets[0].data,
            fill: true,
            backgroundColor: "#07B939",
            borderColor: "#07B939",
            tension : 0.4,
            pointRadius : 0,
            pointHoverRadius : 0,
          },
        ]
      };
      const denoised_data = {
        labels: res.signal_data.labels,
        datasets: [
          {
            label: res.denoised_signal_data.datasets[0].label,
            data: res.denoised_signal_data.datasets[0].data,
            fill: true,
            backgroundColor: "#07B939",
            borderColor: "#07B939",
            tension : 0.4,
            pointRadius : 0,
            pointHoverRadius : 0,
          },
        ]
      };
      const segment_data = {
        labels: res.segment_data.labels,
        datasets: [
          {
            label: res.segment_data.datasets[0].label,
            data: res.segment_data.datasets[0].data[0],
            fill: true,
            backgroundColor: "#07B939",
            borderColor: "#07B939",
            tension : 0.4,
            pointRadius : 0,
            pointHoverRadius : 0,
          },
        ]
      };
    return (
        <div>
            <div className="w-full h-20 p-8 text-bold text-white text-2xl bg-green-999 font-bold">
                <div className="flex justify-center items-center">
                    <p>Diagnosis Result</p>
                </div>
            </div>
            <div className="container mx-auto">
                <div className=" my-8">
                    <p className="font-semibold text-xl">Original PCG Signal</p>
                    <div className="w-full h-96 flex justify-center items-center">
                        <Line data={original_data} options={options}/>
                    </div>
                </div>
                <div className="my-8">
                    <p className="font-semibold text-xl">Denoised PCG Signal</p>
                    <div className="w-full h-96 flex justify-center items-center">
                        <Line data={denoised_data} options={options}/>
                    </div>
                </div>
                <div className="my-8">
                    <p className="font-semibold text-xl">First Segment PCG Signal</p>
                    <div className="w-full h-96 flex justify-center items-center">
                        <Line data={segment_data} options={options}/>
                    </div>
                </div>
                <div>
                    <p className="font-semibold text-2xl mb-8">PCG Diagnosis:</p>
                    <div className="flex flex-row justify-center items-center">
                        <div className="w-[488px] h-auto">
                            <p className="font-semibold text-lg">Segment :</p>
                            <div className="">
                                <div className="mb-4">
                                    <div class="flex justify-between mb-1">
                                        <span class="text-base font-medium text-blue-700 dark:text-black">Aorta Stenosis</span>
                                        <span class="text-sm font-medium text-blue-700 dark:text-black">{(res.predict_segment[0][0].toFixed(4)*100).toFixed(2)}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400">
                                        <div class="bg-green-999 h-2.5 rounded-full" style={{width: `${res.predict_segment[0][0].toFixed(4)*100}%`}}></div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div class="flex justify-between mb-1">
                                        <span class="text-base font-medium text-blue-700 dark:text-black">Mitral Regurgitation</span>
                                        <span class="text-sm font-medium text-blue-700 dark:text-black">{(res.predict_segment[0][1].toFixed(4)*100).toFixed(2)}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400">
                                        <div class="bg-green-999 h-2.5 rounded-full" style={{width: `${res.predict_segment[0][1].toFixed(4)*100}%`}}></div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div class="flex justify-between mb-1">
                                        <span class="text-base font-medium text-blue-700 dark:text-black">Mitral Stenosis</span>
                                        <span class="text-sm font-medium text-blue-700 dark:text-black">{(res.predict_segment[0][2].toFixed(4)*100).toFixed(2)}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400">
                                        <div class="bg-green-999 h-2.5 rounded-full" style={{width: `${res.predict_segment[0][2].toFixed(4)*100}%`}}></div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div class="flex justify-between mb-1">
                                        <span class="text-base font-medium text-blue-700 dark:text-black">Mitral Valve Prolapse</span>
                                        <span class="text-sm font-medium text-blue-700 dark:text-black">{(res.predict_segment[0][3].toFixed(4)*100).toFixed(2)}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400">
                                        <div class="bg-green-999 h-2.5 rounded-full" style={{width: `${res.predict_segment[0][3].toFixed(4)*100}%`}}></div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div class="flex justify-between mb-1">
                                        <span class="text-base font-medium text-blue-700 dark:text-black">Normal</span>
                                        <span class="text-sm font-medium text-blue-700 dark:text-black">{(res.predict_segment[0][4].toFixed(4)*100).toFixed(2)}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400">
                                        <div class="bg-green-999 h-2.5 rounded-full" style={{width: `${res.predict_segment[0][4].toFixed(4)*100}%`}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-8 h-auto"></div>
                        <div className="w-[488px] h-auto">
                            <p className="font-semibold text-lg">Subject :</p>
                            <div>
                                <div className="mb-4">
                                    <div class="flex justify-between mb-1">
                                        <span class="text-base font-medium text-blue-700 dark:text-black">Aorta Stenosis</span>
                                        <span class="text-sm font-medium text-blue-700 dark:text-black">{(res.predict_subject[0][0][0].toFixed(4)*100).toFixed(2)}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400">
                                        <div class="bg-green-999 h-2.5 rounded-full" style={{width: `${res.predict_subject[0][0][0].toFixed(4)*100}%`}}></div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div class="flex justify-between mb-1">
                                        <span class="text-base font-medium text-blue-700 dark:text-black">Mitral Regurgitation</span>
                                        <span class="text-sm font-medium text-blue-700 dark:text-black">{(res.predict_subject[0][0][1].toFixed(4)*100).toFixed(2)}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400">
                                        <div class="bg-green-999 h-2.5 rounded-full" style={{width: `${res.predict_subject[0][0][1].toFixed(4)*100}%`}}></div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div class="flex justify-between mb-1">
                                        <span class="text-base font-medium text-blue-700 dark:text-black">Mitral Stenosis</span>
                                        <span class="text-sm font-medium text-blue-700 dark:text-black">{(res.predict_subject[0][0][2].toFixed(4)*100).toFixed(2)}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400">
                                        <div class="bg-green-999 h-2.5 rounded-full" style={{width: `${res.predict_subject[0][0][2].toFixed(4)*100}%`}}></div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div class="flex justify-between mb-1">
                                        <span class="text-base font-medium text-blue-700 dark:text-black">Mitral Valve Prolapse</span>
                                        <span class="text-sm font-medium text-blue-700 dark:text-black">{(res.predict_subject[0][0][3].toFixed(4)*100).toFixed(2)}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400">
                                        <div class="bg-green-999 h-2.5 rounded-full" style={{width: `${res.predict_subject[0][0][3].toFixed(4)*100}%`}}></div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div class="flex justify-between mb-1">
                                        <span class="text-base font-medium text-blue-700 dark:text-black">Normal</span>
                                        <span class="text-sm font-medium text-blue-700 dark:text-black">{(res.predict_subject[0][0][4].toFixed(4)*100).toFixed(2)}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400">
                                        <div class="bg-green-999 h-2.5 rounded-full" style={{width: `${res.predict_subject[0][0][4].toFixed(4)*100}%`}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-10 text-white text-sm bg-green-999 mt-8">
                <div className="h-full flex justify-center items-center">
                    <p>Copyright © 2023 by Agung Prayogi. All right Reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Result;